import React from 'react'
import { CartesianGrid, Line, ScatterChart, ResponsiveContainer, Scatter, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { Gains } from '../states/store'

interface Props {
  gainsA: Gains
  gainsB: Gains
}
export const ScatterComparisonChart = ({gainsA, gainsB}: Props) => {

  const allValues = [...gainsA.map( x => x.value), ...gainsB.map( x => x.value)]
  const minVal = Math.min( ...allValues ) 
  const maxVal = Math.max( ...allValues )
  const domain=[minVal, maxVal]

  const data = gainsA.map( (_, index) => {
    return {
      interval: gainsA[index].startDate,
      x: gainsA[index].value,
      y: gainsB[index].value,
    }
  })

  return (
    <ResponsiveContainer width="100%" height={200}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="x" />
        <YAxis dataKey="y" /> */}
        <XAxis type="number" dataKey="x" name="A" domain={domain}/>
        <YAxis type="number" dataKey="y" name="B" domain={domain}/>
        <Tooltip />

        <Scatter fill="#8884d8" data={data.filter( d => d.x < d.y )}/>
        <Scatter fill="#555kk0" data={data.filter( d => d.x > d.y )}/>

      </ScatterChart>
    </ResponsiveContainer>

  )
}