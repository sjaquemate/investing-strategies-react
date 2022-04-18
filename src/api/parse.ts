import { APIResult, GainsNormalization, StrategyGains, Timeseries } from "../states/store";
import { ActionCreator } from 'easy-peasy'
import { strategies } from "../utils/strategies";

export const parseTimeseries = async (
  apiResult: APIResult,
  setTimeseries: ActionCreator<Timeseries>) => {
  const timeseries = apiResult.timeseries.map(({ date, value }) => ({
    date: new Date(date * 1000),
    value: value
  }))
  setTimeseries(timeseries)
}

export const parseStrategyGains = async (
  apiResult: APIResult,
  setStrategyGains: ActionCreator<StrategyGains>,
  gainsNormalization: GainsNormalization,
  investingYears: number) => {

  const strategyGains: StrategyGains = apiResult.gains.map(({ strategyName, data }) => ({
    strategy: strategies.find( strategy => strategy.name === strategyName )!,
    gains: data.map(x => ({
      startDate: new Date(x.begin_date * 1000),
      endDate: new Date(x.end_date * 1000),
      value: gainsNormalization === 'yearly' ? x.value ** (1/investingYears) : x.value,
    }))
  }))
  
  setStrategyGains(strategyGains)
}