import React from 'react'
import { ScatterComparisonChart } from '../components/Scatter'
import { useStoreState } from '../states/store'

function ComparisonModal() {
  const [gainsA, gainsB] = useStoreState((state) => [state.gainsA, state.gainsB])
  
  return (
    <div className="panel-primary">
      <div> x choice y choice</div>
      {gainsA && gainsB && <ScatterComparisonChart gainsA={gainsA} gainsB={gainsB} />}
    </div>
  )
}

export default ComparisonModal