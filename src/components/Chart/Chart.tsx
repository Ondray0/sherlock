import React from "react"
import { AreaChart, YAxis, XAxis, Tooltip, TooltipProps, Area, XAxisProps, AreaProps } from "recharts"

import { shortenNumber } from "../../utils/units"

const STROKES = ["#8716e8", "#fe6e99"]

type Props = {
  width?: number
  height?: number
  data?: any[]
  dataKeys?: string[]
  yTickFormatter?: (v: number) => string
  type?: AreaProps["type"]
  xAxisProps?: XAxisProps
  tooltipProps?: TooltipProps<any, any>
}

export const Chart: React.FC<Props> = ({
  width,
  height,
  data = [],
  dataKeys = ["value"],
  yTickFormatter = (v) => (v > 0 ? `$ ${shortenNumber(v)}` : ""),
  type = "monotone",
  xAxisProps,
  tooltipProps,
}) => {
  return (
    <AreaChart width={width} height={height} data={data} key={Math.random()}>
      <defs>
        <linearGradient id="1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8716e8" stopOpacity={1} />
          <stop offset="100%" stopColor="#8716e8" stopOpacity={0.1} />
        </linearGradient>
        <linearGradient id="2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fe6e99" stopOpacity={1} />
          <stop offset="100%" stopColor="#fe6e99" stopOpacity={0.1} />
        </linearGradient>
      </defs>
      <YAxis
        orientation="right"
        tick={{ fill: "white", fontSize: "12px" }}
        tickMargin={5}
        width={80}
        tickFormatter={yTickFormatter}
      />
      <XAxis
        dataKey="name"
        tick={{ fill: "white", fontSize: "12px" }}
        tickMargin={5}
        allowDuplicatedCategory={false}
        {...xAxisProps}
      />
      <Tooltip itemStyle={{ color: "#19032d" }} labelStyle={{ color: "gray" }} {...tooltipProps} />
      {dataKeys.map((k, index) => (
        <Area key={index} type={type} dataKey={k} stroke={STROKES[index]} fill={`url(#${index + 1})`} fillOpacity={1} />
      ))}
    </AreaChart>
  )
}
