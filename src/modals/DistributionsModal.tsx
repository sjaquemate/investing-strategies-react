import { FC, useEffect, useState } from "react"
import { calculateHistogram, Histogram, HistogramChart } from "../components/Histogram"
import { Gains, GainsNormalization, useStoreActions, useStoreState } from "../states/store"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

export const DistributionsModal = () => {
  const [strategyA, strategyB, gainsA, gainsB, gainsNormalization] = useStoreState((state) => [
    state.strategyA, state.strategyB, state.gainsA, state.gainsB, state.gainsNormalization
  ])

  const setGainsNormalization = useStoreActions((actions) => actions.setGainsNormalization)

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
    //      
    const numBins = 10
    console.log(valuesA)
    // console.log(calculateHistogram(valuesA, minValue, maxValue, numBins))
    setHistogramA(calculateHistogram(valuesA, minValue, maxValue, numBins))
    setHistogramB(calculateHistogram(valuesB, minValue, maxValue, numBins))
  }, [gainsA, gainsB, gainsNormalization])

  return (
    <div className="my-auto rounded-md bg-gray-200 shadow-xl p-5">
      <div className="mt-5">
        <div className="flex justify-center">
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
        </div>


        {histogramA && <HistogramChart histogram={histogramA} />}
        {histogramB && <HistogramChart histogram={histogramB} />}
        {/* {distributionTop && <HistogramChart distribution={distributionTop} />} */}
      </div>
    </div>
  )
}

