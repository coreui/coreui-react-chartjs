import PropTypes from 'prop-types'
import React, {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  useRef,
} from 'react'

import Chart from 'chart.js/auto'
import * as chartjs from 'chart.js'
import { customTooltips as cuiCustomTooltips } from '@coreui/chartjs'

import merge from 'lodash/merge'
import assign from 'lodash/assign'
import find from 'lodash/find'

export interface CChartProps extends HTMLAttributes<HTMLCanvasElement | HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Enables custom html based tooltips instead of standard tooltips.
   *
   * @default true
   */
  customTooltips?: boolean
  /**
   * The data object that is passed into the Chart.js chart (more info).
   */
  data: Chart.ChartData | ((canvas: HTMLCanvasElement) => Chart.ChartData)
  /**
   * A fallback for when the canvas cannot be rendered. Can be used for accessible chart descriptions.
   *
   * {@link https://www.chartjs.org/docs/latest/general/accessibility.html More Info}
   */
  fallbackContent?: React.ReactNode
  /**
   * Proxy for Chart.js getDatasetAtEvent. Calls with dataset and triggering event.
   */
  getDatasetAtEvent?: (dataset: Array<{}>, event: React.MouseEvent<HTMLCanvasElement>) => void
  /**
   * Proxy for Chart.js getElementAtEvent. Calls with single element array and triggering event.
   */
  getElementAtEvent?: (element: [{}], event: React.MouseEvent<HTMLCanvasElement>) => void
  /**
   * Proxy for Chart.js getElementsAtEvent. Calls with element array and triggering event.
   */
  getElementsAtEvent?: (elements: Array<{}>, event: React.MouseEvent<HTMLCanvasElement>) => void
  /**
   * Height attribute applied to the rendered canvas.
   *
   * @default 150
   */
  height?: number
  /**
   * ID attribute applied to the rendered canvas.
   */
  id?: string
  /**
   * The options object that is passed into the Chart.js chart.
   *
   * {@link https://www.chartjs.org/docs/latest/general/options.html More Info}
   */
  options?: Chart.ChartOptions
  /**
   * The plugins array that is passed into the Chart.js chart (more info)
   *
   * {@link https://www.chartjs.org/docs/latest/developers/plugins.html More Info}
   */
  plugins?: Chart.PluginServiceRegistrationOptions[]
  /**
   * If true, will tear down and redraw chart on all updates.
   *
   * @default false
   */
  redraw?: boolean
  /**
   * Chart.js chart type.
   *
   * @type {'line' | 'bar' | 'horizontalBar' | 'radar' | 'doughnut' | 'polarArea' | 'bubble' | 'pie' | 'scatter'}
   */
  type: Chart.ChartType
  /**
   * Width attribute applied to the rendered canvas.
   *
   * @default 300
   */
  width?: number
  /**
   * Put the chart into the wrapper div element.
   *
   * @default true
   */
  wrapper?: boolean
}

export const CChart = forwardRef<Chart | undefined, CChartProps>((props, ref) => {
  const {
    className,
    customTooltips = true,
    data,
    id,
    fallbackContent,
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,
    height = 150,
    options,
    plugins = [],
    redraw = false,
    type,
    width = 300,
    wrapper = true,
    ...rest
  } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const computedData = useMemo<Chart.ChartData>(() => {
    if (typeof data === 'function') {
      return canvasRef.current ? data(canvasRef.current) : {}
    } else return merge({}, data)
  }, [data, canvasRef.current])

  const [chart, setChart] = useState<Chart>()

  useImperativeHandle<Chart | undefined, Chart | undefined>(ref, () => chart, [chart])

  const renderChart = () => {
    if (!canvasRef.current) return

    if (customTooltips) {
      chartjs.defaults.plugins.tooltip.enabled = false
      chartjs.defaults.plugins.tooltip.mode = 'index'
      chartjs.defaults.plugins.tooltip.position = 'nearest'
      chartjs.defaults.plugins.tooltip.external = cuiCustomTooltips
    }

    setChart(
      new Chart(canvasRef.current, {
        type,
        data: computedData,
        options,
        plugins,
      }),
    )
  }

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!chart) return

    getDatasetAtEvent &&
      getDatasetAtEvent(
        chart.getElementsAtEventForMode(e, 'dataset', { intersect: true }, false),
        e,
      )
    getElementAtEvent &&
      getElementAtEvent(
        chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false),
        e,
      )
    getElementsAtEvent &&
      getElementsAtEvent(chart.getElementsAtEventForMode(e, 'index', { intersect: true }, false), e)
  }

  const updateChart = () => {
    if (!chart) return

    if (options) {
      chart.options = { ...options }
    }

    if (!chart.config.data) {
      chart.config.data = computedData
      chart.update()
      return
    }

    const { datasets: newDataSets = [], ...newChartData } = computedData
    const { datasets: currentDataSets = [] } = chart.config.data

    // copy values
    assign(chart.config.data, newChartData)
    chart.config.data.datasets = newDataSets.map((newDataSet: any) => {
      // given the new set, find it's current match
      const currentDataSet = find(
        currentDataSets,
        (d) => d.label === newDataSet.label && d.type === newDataSet.type,
      )

      // There is no original to update, so simply add new one
      if (!currentDataSet || !newDataSet.data) return newDataSet

      if (!currentDataSet.data) {
        currentDataSet.data = []
      } else {
        currentDataSet.data.length = newDataSet.data.length
      }

      // copy in values
      assign(currentDataSet.data, newDataSet.data)

      // apply dataset changes, but keep copied data
      return {
        ...currentDataSet,
        ...newDataSet,
        data: currentDataSet.data,
      }
    })

    chart.update()
  }

  const destroyChart = () => {
    if (chart) chart.destroy()
  }

  useEffect(() => {
    renderChart()

    return () => destroyChart()
  }, [])

  useEffect(() => {
    if (redraw) {
      destroyChart()
      setTimeout(() => {
        renderChart()
      }, 0)
    } else {
      updateChart()
    }
  }, [props, computedData])

  const canvas = (ref: React.Ref<HTMLCanvasElement>) => {
    return (
      <canvas
        height={height}
        width={width}
        ref={ref}
        id={id}
        onClick={onClick}
        data-testid="canvas"
        role="img"
      >
        {fallbackContent}
      </canvas>
    )
  }

  return wrapper ? (
    <div className={`chart-wrapper ${className}`} {...rest}>
      {canvas(canvasRef)}
    </div>
  ) : (
    canvas(canvasRef)
  )

  // return (
  //   <div className={`chart-wrapper ${className}`} {...rest}>
  //     <canvas
  //       height={height}
  //       width={width}
  //       ref={canvasRef}
  //       id={id}
  //       onClick={onClick}
  //       data-testid="canvas"
  //       role="img"
  //     >
  //       {fallbackContent}
  //     </canvas>
  //   </div>
  // )
})

CChart.propTypes = {
  className: PropTypes.string,
  customTooltips: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.func]), // TODO: check
  fallbackContent: PropTypes.node,
  getDatasetAtEvent: PropTypes.func, // TODO: check
  getElementAtEvent: PropTypes.func, // TODO: check
  getElementsAtEvent: PropTypes.func, // TODO: check
  height: PropTypes.number,
  id: PropTypes.string,
  options: PropTypes.object, // TODO: check
  plugins: PropTypes.array, // TODO: check
  redraw: PropTypes.bool,
  type: PropTypes.oneOf([
    'line',
    'bar',
    'horizontalBar',
    'radar',
    'doughnut',
    'polarArea',
    'bubble',
    'pie',
    'scatter',
  ]),
  width: PropTypes.number,
  wrapper: PropTypes.bool
}

CChart.displayName = 'CChart'
