### [@coreui/react-chartjs](https://coreui.io/) for [CoreUI for React](https://coreui.io/react/)

[![npm package][npm-badge]][npm]
[![NPM downloads][npm-download]][npm]
![react](https://img.shields.io/badge/react-^17.0.1-lightgrey.svg?style=flat-square&logo=react)

[npm-badge]: https://img.shields.io/npm/v/@coreui/react-chartjs/latest?style=flat-square
[npm]: https://www.npmjs.com/package/@coreui/react-chartjs
[npm-download]: https://img.shields.io/npm/dm/@coreui/react-chartjs.svg?style=flat-square

##### install:

```bash
npm install @coreui/react-chartjs@next

# or

yarn add @coreui/react-chartjs@next
```

##### import:

```jsx
import { CChart } from '@coreui/react-chartjs'
```

or

```js
import {
  CChart,
  CChartBar,
  CChartHorizontalBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea,
} from '@coreui/react-chartjs'
```

##### props:

```js

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
data: ChartData | ((canvas: HTMLCanvasElement) => ChartData)
/**
 * A fallback for when the canvas cannot be rendered. Can be used for accessible chart descriptions.
 *
 * {@link https://www.chartjs.org/docs/latest/general/accessibility.html More Info}
 */
fallbackContent?: React.ReactNode
/**
 * Proxy for Chart.js getDatasetAtEvent. Calls with dataset and triggering event.
 */
getDatasetAtEvent?: (
  dataset: InteractionItem[],
  event: React.MouseEvent<HTMLCanvasElement>,
) => void
/**
 * Proxy for Chart.js getElementAtEvent. Calls with single element array and triggering event.
 */
getElementAtEvent?: (
  element: InteractionItem[],
  event: React.MouseEvent<HTMLCanvasElement>,
) => void
/**
 * Proxy for Chart.js getElementsAtEvent. Calls with element array and triggering event.
 */
getElementsAtEvent?: (
  elements: InteractionItem[],
  event: React.MouseEvent<HTMLCanvasElement>,
) => void
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
options?: ChartOptions
/**
 * The plugins array that is passed into the Chart.js chart (more info)
 *
 * {@link https://www.chartjs.org/docs/latest/developers/plugins.html More Info}
 */
plugins?: Plugin[]
/**
 * If true, will tear down and redraw chart on all updates.
 *
 * @default false
 */
redraw?: boolean
/**
 * Chart.js chart type.
 *
 * @type {'line' | 'bar' | 'radar' | 'doughnut' | 'polarArea' | 'bubble' | 'pie' | 'scatter'}
 */
type: ChartType
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
```

##### usage:

```jsx
...
class CoreUICharts extends Component {
...
render() {
    return (
      <CChart
        type='line'
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: '2019',
              backgroundColor: 'rgba(179,181,198,0.2)',
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              tooltipLabelColor: 'rgba(179,181,198,1)',
              data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
              label: '2020',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              pointBackgroundColor: 'rgba(255,99,132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,132,1)',
              tooltipLabelColor: 'rgba(255,99,132,1)',
              data: [28, 48, 40, 19, 96, 27, 100]
            }
          ],
        }}  
        options={{
          aspectRatio: 1.5,
          tooltips: {
            enabled: true
          }
        }}
      />
    )
}
...
```

##### `npm run` scripts

`package.json` is configured with `"scripts"` we can use with `npm run` or `yarn` while developing the project.

| Command                         | Description                    |
| ------------------------------- | ------------------------------ |
| `npm run build` or `yarn build` | build production ready version |
| `npm run lint` or `yarn lint`   | run eslint                     |

