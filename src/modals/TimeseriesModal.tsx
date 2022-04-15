import { FC } from "react"
import TextField from "@mui/material/TextField";
import { TwoEndedSlider } from "../components/TwoEndedSlider";
import { useStoreActions, useStoreState } from "../states/store";
import { TimeseriesChart } from "../components/TimeSeries";


export const TimeseriesModal: FC = () => {

  const [ticker, tickerValidity, timeseries] = useStoreState((state) => [
    state.ticker, state.tickerValidity, state.timeseries
  ])
  const [setTicker, setStartEndYears] = useStoreActions((actions) => [
    actions.setTicker, actions.setStartEndYears
  ])

  return (
    <div className="flex flex-col my-auto w-full p-5 rounded-md bg-gray-200 shadow-xl">
      <TextField
        error={!tickerValidity}
        id="outlined-error-helper-text"
        label="Enter your ticker"
        value={ticker}
        inputProps={{ maxLength: 7, style: { textTransform: "uppercase" } }
        }
        onChange={e => setTicker(e.target.value)}
        helperText={tickerValidity ? "⠀" : "not a valid ticker"}
      />

      <TwoEndedSlider
        setValues={setStartEndYears}
        minValueDistance={10}
        minValue={1950}
        maxValue={2021}
      />

      {timeseries && <TimeseriesChart timeseries={timeseries} />}
    </div >
  )
}