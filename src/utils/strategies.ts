
export type StrategyName = "dca" | "lumpsum" | "equalshare"

export type Strategy = { name: StrategyName, color: string, explanation: string }

export const strategies: Strategy[] = [
  { name: "dca", color: 'blue', explanation: "" },
  { name: "lumpsum", color: 'red', explanation: "" },
  { name: "equalshare", color: 'yellow', explanation: "" },
]