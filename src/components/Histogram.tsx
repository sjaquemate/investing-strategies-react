import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts"
import { bin, range } from "d3";

export type Histogram = { count: number, tick: number }[]

export const calculateHistogram = (
  values: number[],
  minValue: number,
  maxValue: number,
  numBins: number): Histogram => {

  const histGenerator = bin().domain([minValue, maxValue]).thresholds((data) =>
    range(numBins).map(x => minValue + (x / numBins) * (maxValue - minValue))
  )

  const binnedValues = histGenerator(values)

  const histogram = binnedValues.map((binnedValue, i) => ({
    count: binnedValue.length,
    tick: minValue + (maxValue - minValue) * i
  }))
  return histogram
}

interface Props {
  histogram: Histogram
}
export function HistogramChart({histogram}: Props) {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={histogram} barCategoryGap={1}>
        <XAxis
          dataKey="tick"
          type="number"
        // ticks={[0, 0.5, 1, 1.5, 2]}
        />
        <Bar dataKey="count" fill="#8884d8"/>
      </BarChart>
    </ResponsiveContainer>
  )
}