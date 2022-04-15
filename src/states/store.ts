import { createStore, action, Action, createTypedHooks } from 'easy-peasy'
import { strategies, Strategy, StrategyName } from '../utils/strategies';

const typedHooks = createTypedHooks<Model>()

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export interface APIResult {
  gains: { strategyName: StrategyName, dates: string[], values: number[] }[]
  timeseries: { dates: string[], values: number[] }
}

export type GainsNormalization = "yearly" | "total"

export type Gains = { interval: string, value: number}[]
export type Timeseries = { date: string, value: number }[]

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

  strategyA: Strategy
  setStrategyA: Action<Model, Strategy>
  strategyB: Strategy
  setStrategyB: Action<Model, Strategy>

  timeseries: Timeseries | undefined
  setTimeseries: Action<Model, Timeseries>

  gainsA: Gains | undefined 
  setGainsA: Action<Model, Gains>
  gainsB: Gains | undefined 
  setGainsB: Action<Model, Gains>
}

export default createStore<Model>({
  apiResult: undefined,
  setAPIResult: action((state, payload) => { state.apiResult = payload }),

  ticker: "AAPL",
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

  gainsNormalization: "yearly",
  setGainsNormalization: action((state, payload) => {state.gainsNormalization = payload}),

  strategyA: strategies[0],
  setStrategyA: action((state,payload) => {state.strategyA = payload}),
  strategyB: strategies[1],
  setStrategyB: action((state,payload) => {state.strategyB = payload}),

  timeseries: undefined,
  setTimeseries: action((state, payload) => {state.timeseries = payload}),

  gainsA: undefined,
  setGainsA:  action((state, payload) => {state.gainsA = payload}),
  gainsB: undefined,
  setGainsB:  action((state, payload) => {state.gainsB = payload}),
})