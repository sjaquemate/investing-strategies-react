import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts"
import { bin, range } from "d3";

export type Histogram = { count: number, tick: number }[]

export const calculateHistogram = (
  values: number[],
  minValue: number,
  maxValue: number,
  numBins: number): Histogram => {

  console.log(minValue, maxValue)
  const histGenerator = bin().domain([minValue, maxValue]).thresholds((data) =>
    range(numBins).map(x => minValue + (x / numBins) * (maxValue - minValue))
  )

  const binnedValues = histGenerator(values)
  console.log('binned', binnedValues)

  const histogram = binnedValues.map((binnedValue, i) => {
    const center = (binnedValue.x0! + binnedValue.x1!) / 2
    console.log('center', center)
    console.log('keys', binnedValue.length)
    console.log(binnedValue)

    return {
      count: binnedValue.length,
      tick: center
    }
  })

  return histogram
}

interface Props {
  histogram: Histogram
  color: string
}
export function HistogramChart(props: Props) {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={props.histogram} barCategoryGap={1}>
        <XAxis
          dataKey="tick"
          type="number"
        // ticks={[0, 0.5, 1, 1.5, 2]}
        />
        <Bar dataKey="count" fill={props.color} />
      </BarChart>
    </ResponsiveContainer>
  )
}