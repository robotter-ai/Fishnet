declare module 'react-apexcharts' {
    import { Component } from 'react';
    import { ApexOptions } from 'apexcharts';
  
    interface Props {
      options: ApexOptions;
      series: ApexAxisChartSeries | ApexNonAxisChartSeries;
      type: 'line' | 'area' | 'bar' | 'histogram' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'treemap' | 'candlestick' | 'boxPlot' | 'radar' | 'polarArea' | 'rangeBar';
      width?: string | number;
      height?: string | number;
    }
  
    class ReactApexChart extends Component<Props> {}
    export default ReactApexChart;
  }
  