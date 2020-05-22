import React from 'react'

interface CCharts {
  innerRef?: any;
  datasets?: Array<any>;
  labels?: string | Array<any>;
  options?: any;
  plugins?: Array<any>;
  type?: string;
}

export declare const CCharts: (props: CCharts) => React.SFC<CCharts>;
