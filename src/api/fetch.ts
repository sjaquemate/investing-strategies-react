import { APIResult } from "../states/store" 
import { ActionCreator } from 'easy-peasy'

export const fetchAPIResult = async (
  ticker: string,
  startYear: number,
  endYear: number,
  investingYears: number,
  setAPIResult: ActionCreator<APIResult>,
  setTickerValidity: ActionCreator<boolean>,
  ) => {

  const url = new URL("https://1dxx96zrl9.execute-api.eu-central-1.amazonaws.com/v1/investing-strategies-function")

  const params = {
    'ticker': ticker,
    'start_year': startYear,
    'end_year': endYear,
    'investing_years': investingYears,
  }
  url.search = new URLSearchParams(params as any).toString();

  fetch(url.toString(), { 'method': 'GET' })
    .then(response => response.json())
    .then(data => {
      setAPIResult(data)
      setTickerValidity(true)
    })
    .catch(error => {
      console.log(error)
      setTickerValidity(false)
    })
}