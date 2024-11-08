import { Component } from "@angular/core";
import { AgCharts } from "ag-charts-angular";
import { AgChartOptions, AgCandlestickSeriesOptions } from "ag-charts-community";
import { getData } from "./data";

@Component({
  selector: "app-graph",
  standalone: true,
  imports: [AgCharts],
  template: `<ag-charts [options]="options"></ag-charts>`,
})
export class GraphComponent {
  public options: AgChartOptions;

  constructor() {
    this.options = {
      data: getData(),
      title: {
        text: "S&P 500 Index",
      },
      subtitle: {
        text: "Daily High and Low Prices",
      },
      footnote: {
        text: "1 Aug 2023 - 1 Nov 2023",
      },
      series: [
        {
          type: "candlestick",
          xKey: "date",
          xName: "Date",
          lowKey: "low",
          highKey: "high",
          openKey: "open",
          closeKey: "close",
        } as AgCandlestickSeriesOptions,
      ],
    };
  }
}
