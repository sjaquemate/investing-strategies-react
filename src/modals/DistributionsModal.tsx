import { FC, useEffect, useState } from "react"
import { calculateHistogram, Histogram, HistogramChart } from "../components/Histogram"
import { Gains, GainsNormalization, useStoreActions, useStoreState } from "../states/store"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";

export const DistributionsModal = () => {
  const [strategyA, strategyB, gainsA, gainsB, gainsNormalization, investingYears] = useStoreState((state) => [
    state.strategyA, state.strategyB, state.gainsA, state.gainsB, state.gainsNormalization, state.investingYears
  ])

  const [setGainsNormalization, setInvestingYears] = useStoreActions((actions) => [
    actions.setGainsNormalization, actions.setInvestingYears
  ])

  const [validInvestingYears, setValidInvestingYears] = useState(false)
  const [histogramA, setHistogramA] = useState<Histogram | undefined>(undefined)
  const [histogramB, setHistogramB] = useState<Histogram | undefined>(undefined)

  useEffect(() => {
    if (!gainsA || !gainsB) return

    let valuesA = gainsA?.map(x => x.value)
    let valuesB = gainsB?.map(x => x.value)
    if (gainsNormalization === "yearly") {
      valuesA = valuesA.map(value => value ** (1 / 12))
      valuesB = valuesB.map(value => value ** (1 / 12))
    }
    const minValue = Math.min(...[...valuesA, ...valuesB])
    const maxValue = Math.max(...[...valuesA, ...valuesB])

    const numBins = 20

    setHistogramA(calculateHistogram(valuesA, minValue, maxValue, numBins))
    setHistogramB(calculateHistogram(valuesB, minValue, maxValue, numBins))
  }, [gainsA, gainsB, gainsNormalization])


  return (
    <div className="panel-primary">
      <TextField
        error={!validInvestingYears}
        label="Number of investing years"
        type="number"
        value={investingYears}
        onChange={e => {
          const num = Number(e.target.value)
          const isValidNumber = (num >= 1) && (num <= 100)
          setValidInvestingYears(isValidNumber)
          isValidNumber && setInvestingYears(num)
        }}
        helperText={validInvestingYears ? "valid" : "not valid"}
        InputLabelProps={{ shrink: true }}
      />
      < ToggleButtonGroup
        color="primary"
        value={gainsNormalization}
        exclusive
        onChange={
          (event: React.MouseEvent<HTMLElement>, gainsNormalization: GainsNormalization) => { setGainsNormalization(gainsNormalization) }
        }
      >
        <ToggleButton value="yearly" > Yearly </ToggleButton>
        <ToggleButton value="total" > Total </ToggleButton>
      </ToggleButtonGroup>

      {histogramA && <HistogramChart histogram={histogramA} />}
      {histogramB && <HistogramChart histogram={histogramB} />}
      {/* {distributionTop && <HistogramChart distribution={distributionTop} />} */}

    </div>
  )
}

