### [@coreui/react-chartjs](https://coreui.io/) changelog

##### `1.0.0-alpha.0`
- initial version

install:
```bash
npm install @coreui/react
npm install @coreui/react-chartjs 
```

import: 
```jsx
import { CCharts } from '@coreui/react-chartjs';
```

usage:
```jsx
...
class CoreUICharts extends Component {
...
render() {
    return (
      <CCharts
        type="radar"
        datasets={[
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
        ]}
        options={{
          aspectRatio: 1.5,
          tooltips: {
            enabled: true
          }
        }}
        labels={[
          'Eating', 'Drinking', 'Sleeping', 'Designing',
          'Coding', 'Cycling', 'Running'
        ]}
      />
    )
}
...
```
