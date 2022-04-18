import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { Timeseries, useStoreState } from "../states/store"

interface Props {
  timeseries: Timeseries
}
export function TimeseriesChart(props: Props) {

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={props.timeseries}>
        <XAxis dataKey="date" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="value" stroke="#ff7300" yAxisId={0} />
      </LineChart>
    </ResponsiveContainer>
  )
}