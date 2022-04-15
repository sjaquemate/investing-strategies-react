import React, { useEffect } from "react";
import { TimeseriesModal } from "./modals/TimeseriesModal";
import { DistributionsModal } from "./modals/DistributionsModal";

import { useStoreActions, useStoreState } from "./states/store";
import { fetchAPIResult } from "./api/fetch";
import { parseGains, parseTimeseries } from "./api/parse";



function App() {

  const [ticker, startYear, endYear, investingYears, apiResult, strategyA, strategyB] = useStoreState( (state) => [
    state.ticker, state.startYear, state.endYear, state.investingYears, state.apiResult, state.strategyA, state.strategyB
  ])
  const [setAPIResult, setTickerValidity, setTimeseries, setGainsA, setGainsB] = useStoreActions((actions) => [
    actions.setAPIResult, actions.setTickerValidity, actions.setTimeseries, actions.setGainsA, actions.setGainsB
  ])

  useEffect(() => {
    fetchAPIResult(ticker, startYear, endYear, investingYears, setAPIResult, setTickerValidity)
  }, [ticker, startYear, endYear, investingYears])

  useEffect(() => {
    apiResult && parseTimeseries( apiResult, setTimeseries)
  }, [apiResult])

  useEffect(() => {
    apiResult && parseGains( apiResult, setGainsA, strategyA.name )
  }, [apiResult, strategyA])

  useEffect(() => {
    apiResult && parseGains( apiResult, setGainsB, strategyB.name )
  }, [apiResult, strategyB])

  const [gainsA, gainsB] = useStoreState( (state) => [state.gainsA, state.gainsB] )
  
  return (
    <div className="grid grid-cols-3 gap-3 p-5 h-screen">

      <TimeseriesModal/>
      <DistributionsModal/>

      {/* <div className="flex flex-col justify-center gap-2 ">
        <div className="rounded-md bg-gray-200 shadow-xl p-5">
          <div className="mt-5">
            {distributionTop && <HistogramChart distribution={distributionTop} />}
          </div>
        </div>

        <div className="rounded-md bg-gray-200 shadow-xl p-5">
          {distributionBottom && <HistogramChart distribution={distributionBottom} />}
        </div>
      </div>

      <div className="flex flex-col justify-center gap-2 rounded-md bg-gray-200 shadow-xl p-5">
        {distributionBottom && <HistogramChart distribution={distributionBottom} />}
      </div> */}

    </div>
  );
}

export default App;
