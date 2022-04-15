import { APIResult, Gains, Timeseries } from "../states/store";
import { ActionCreator } from 'easy-peasy'
import { StrategyName } from "../utils/strategies";

export const parseTimeseries = async (
  apiResult: APIResult,
  setTimeseries: ActionCreator<Timeseries>) => {
  const newTimeseries = apiResult.timeseries.dates.map((_, index) => {
    return {
      date: apiResult.timeseries.dates[index],
      value: apiResult.timeseries.values[index]
    }
  })
  setTimeseries(newTimeseries)
}

export const parseGains = async( 
  apiResult: APIResult,
  setGains: ActionCreator<Gains>,
  strategyName: StrategyName) => {

    const x = apiResult.gains.find(x => x.strategyName === strategyName)
    
    if (!x) return

    const newGains = x.values.map( (_, index) => {
      return {
        interval: x.dates[index],
        value: x.values[index]
      }
    })
    setGains(newGains)
}
  
//     const gainsTop = apiResult.gains.find(x => x.strategyName === strategyTop.name)?.values
//     const gainsBottom = apiResult.gains.find(x => x.strategyName === strategyBottom.name)?.values
//     if (gainsTop && gainsBottom) {

//       const distributionTop = calculateDistribution(gainsTopNormalized, minValue, maxValue, 20)
//       const distributionBottom = calculateDistribution(gainsBottomNormalized, minValue, maxValue, 20)
//       setDistributionTop(distributionTop)
//       setDistributionBottom(distributionBottom)
//     }


// write into function to convert...

//     const normalizeGainsPeriod = (values: number[]) => {
//       if (gainsPeriod == "yearly") {
//         return values.map(value => value ** (1 / 12))
//       }
//       return values
//     }

//     const gainsTop = apiResult.gains.find(x => x.strategyName === strategyTop.name)?.values
//     const gainsBottom = apiResult.gains.find(x => x.strategyName === strategyBottom.name)?.values
//     if (gainsTop && gainsBottom) {

//       const gainsTopNormalized = normalizeGainsPeriod(gainsTop)
//       const gainsBottomNormalized = normalizeGainsPeriod(gainsBottom)
//       const minValue = Math.min(...[...gainsTopNormalized, ...gainsBottomNormalized])
//       const maxValue = Math.max(...[...gainsTopNormalized, ...gainsBottomNormalized])
//       const distributionTop = calculateDistribution(gainsTopNormalized, minValue, maxValue, 20)
//       const distributionBottom = calculateDistribution(gainsBottomNormalized, minValue, maxValue, 20)
//       setDistributionTop(distributionTop)
//       setDistributionBottom(distributionBottom)
//     }
//   }, [apiResult, gainsPeriod])