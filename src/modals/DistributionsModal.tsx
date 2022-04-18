import { useState } from "react"
import { calculateHistogram, HistogramChart } from "../components/Histogram"
import { Gains, GainsNormalization, useStoreActions, useStoreState } from "../states/store"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import { Strategy } from "../utils/strategies";

interface HistogramElementProps {
  strategy: Strategy
  gains: Gains
  minValue: number
  maxValue: number
  numBins: number
}
const HistogramElement = (props: HistogramElementProps) => {

  const values = props.gains.map(x => x.value)
  const histogram = calculateHistogram(values, props.minValue, props.maxValue, props.numBins)
  console.log(props.minValue, props.maxValue)
  console.log(histogram)
  return (
    <div>
      {props.strategy.name}
      <HistogramChart histogram={histogram} color={props.strategy.color}/>
    </div>
  )
}

export const DistributionsModal = () => {
  const [strategyGains, gainsNormalization, investingYears] = useStoreState((state) => [
    state.strategyGains, state.gainsNormalization, state.investingYears
  ])

  const [setGainsNormalization, setInvestingYears] = useStoreActions((actions) => [
    actions.setGainsNormalization, actions.setInvestingYears
  ])

  const [validInvestingYears, setValidInvestingYears] = useState(false)

  const numBins = 20
  const allValues = strategyGains?.map(({ strategy, gains }) => gains.map(x => x.value)).flat()
  console.log(allValues)
  const minValue = Math.min(...(allValues || [0]))
  const maxValue = Math.max(...(allValues || [0])) 

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

      <div className='w-full'>
        {
          strategyGains && 
          strategyGains.map(({ strategy, gains }) => (
            <HistogramElement strategy={strategy}
              gains={gains}
              minValue={minValue}
              maxValue={maxValue}
              numBins={numBins}
              key={strategy.name} />
          ))
        }
      </div>

    </div>
  )
}

