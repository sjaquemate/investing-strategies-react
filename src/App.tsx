import React, { useEffect } from "react";
import { TimeseriesModal } from "./modals/TimeseriesModal";
import { DistributionsModal } from "./modals/DistributionsModal";

import { useStoreActions, useStoreState } from "./states/store";
import { fetchAPIResult } from "./api/fetch";
import { parseStrategyGains, parseTimeseries } from "./api/parse";
import ComparisonModal from "./modals/ComparisonModal";



function App() {

  const [ticker, startYear, endYear, investingYears, apiResult, gainsNormalization] = useStoreState( (state) => [
    state.ticker, state.startYear, state.endYear, state.investingYears, state.apiResult, state.gainsNormalization
  ])
  const [setAPIResult, setTickerValidity, setTimeseries, setStrategyGains] = useStoreActions((actions) => [
    actions.setAPIResult, actions.setTickerValidity, actions.setTimeseries, actions.setStrategyGains
  ])

  useEffect(() => {
    fetchAPIResult(ticker, startYear, endYear, investingYears, setAPIResult, setTickerValidity)
  }, [ticker, startYear, endYear, investingYears])

  useEffect(() => {
    apiResult && parseTimeseries( apiResult, setTimeseries )
  }, [apiResult])
  
  useEffect(() => {
    apiResult && parseStrategyGains( apiResult, setStrategyGains, gainsNormalization, investingYears )
  }, [apiResult, gainsNormalization])

  
  
  return (
    <div className="bg-[#F4F6FA] grid grid-cols-3 gap-3 p-5 h-screen">
      <TimeseriesModal/>
      <DistributionsModal/>
      <ComparisonModal/>
    </div>
  );
}

export default App;
