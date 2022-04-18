import { createStore, action, Action, createTypedHooks } from 'easy-peasy'
import { Strategy, StrategyName } from '../utils/strategies';

const typedHooks = createTypedHooks<Model>()

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export interface APIResult {
  gains: { strategyName: StrategyName, 
                   data: {
                     begin_date: number,
                     end_date: number,
                     value: number,
                   }[] }[]
  timeseries: { date: number, value: number }[]
}

export type GainsNormalization = "yearly" | "total"

export type StrategyGains = {strategy: Strategy, gains: Gains}[]
export type Gains = { startDate: Date, endDate: Date, value: number}[]
export type Timeseries = { date: Date, value: number }[]

interface Model {
  apiResult: APIResult | undefined
  setAPIResult: Action<Model, APIResult>

  ticker: string 
  setTicker: Action<Model, string> 
  tickerValidity: boolean 
  setTickerValidity: Action<Model, boolean>

  startYear: number 
  endYear: number 
  setStartEndYears: Action<Model, number[]>

  investingYears: number 
  setInvestingYears: Action<Model, number>

  gainsNormalization: GainsNormalization
  setGainsNormalization: Action<Model, GainsNormalization>

  timeseries: Timeseries | undefined
  setTimeseries: Action<Model, Timeseries>

  strategyGains: StrategyGains | undefined
  setStrategyGains: Action<Model, StrategyGains>
}

export default createStore<Model>({
  apiResult: undefined,
  setAPIResult: action((state, payload) => { state.apiResult = payload }),

  ticker: "GE",
  setTicker: action((state, payload) => {state.ticker = payload }),

  tickerValidity: false,
  setTickerValidity: action((state, payload) => {state.tickerValidity = payload}),

  startYear: 2000,
  endYear: 2010,
  setStartEndYears: action((state, payload) => {
    [state.startYear, state.endYear] = payload
  }),

  investingYears: 5,
  setInvestingYears: action((state, payload) => {state.investingYears = payload}),

  gainsNormalization: "total",
  setGainsNormalization: action((state, payload) => {state.gainsNormalization = payload}),

  strategyGains: undefined,
  setStrategyGains: action((state, payload) => {state.strategyGains = payload}),

  timeseries: undefined,
  setTimeseries: action((state, payload) => {state.timeseries = payload}),
})