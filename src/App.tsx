import React, { useEffect } from "react";
import { TimeseriesModal } from "./modals/TimeseriesModal";
import { DistributionsModal } from "./modals/DistributionsModal";

import { useStoreActions, useStoreState } from "./states/store";
import { fetchAPIResult } from "./api/fetch";
import { parseGains, parseTimeseries } from "./api/parse";
import ComparisonModal from "./modals/ComparisonModal";



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
    <div className="bg-[#F4F6FA] grid grid-cols-3 gap-3 p-5 h-screen">
      <TimeseriesModal/>
      <DistributionsModal/>
      <ComparisonModal/>
    </div>
  );
}

export default App;
