import { HTMLProps } from 'react'
import { ChartDataSets, ChartOptions } from 'chart.js'

interface Charts extends HTMLProps<any> {
  innerRef?: any
  datasets?: ChartDataSets[]
  labels?: string | Array<any>
  options?: ChartOptions
  plugins?: Array<any>
}

interface CChart extends Charts {
  type?: string
}

interface CChartBar extends Charts {}
interface CChartHorizontalBar extends Charts {}
interface CChartLine extends Charts {}
interface CChartDoughnut extends Charts {}
interface CChartRadar extends Charts {}
interface CChartPie extends Charts {}
interface CChartPolarArea extends Charts {}

export declare const CChart: (props: CChart) => any
export declare const CChartBar: (props: CChartBar) => any
export declare const CChartHorizontalBar: (props: CChartHorizontalBar) => any
export declare const CChartLine: (props: CChartLine) => any
export declare const CChartDoughnut: (props: CChartDoughnut) => any
export declare const CChartRadar: (props: CChartRadar) => any
export declare const CChartPie: (props: CChartPie) => any
export declare const CChartPolarArea: (props: CChartPolarArea) => any
