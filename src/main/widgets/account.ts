/// <reference path="../../../node_modules/@types/google.visualization/index.d.ts" />

import { Widget } from "../prest/jsonml/jsonml-widget";
import { JsonMLs } from "../prest/jsonml/jsonml";
import { Signal } from "../prest/signal";
import { user } from "../data/user";

export class AccountWidget extends Widget {

    private _title: string = "Form";

    readonly sigData = new Signal<FormData>();

    constructor() {
        super("AccountWidget");
        google.charts.load("current", {packages: ["corechart", "line"]});
    }

    private _drawCharts = () => {
        this._drawLineChart();
        this._drawPieChart();
    }

    private _drawLineChart = () => {
        const data = new google.visualization.DataTable();
        data.addColumn("number", "X");
        data.addColumn("number", "Dogs");

        data.addRows([
          [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
          [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
          [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
          [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
          [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
          [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
          [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
          [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
          [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
          [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
          [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
          [66, 70], [67, 72], [68, 75], [69, 80]
        ]);

        const options = {
          hAxis: {
            title: "This month"
          },
          vAxis: {
            title: "Balance"
          }
        };

        const chart = new google.visualization.LineChart(document.getElementById("linechart"));

        chart.draw(data, options);
    }

    private _drawPieChart = () => {
      // Define the chart to be drawn.
      const data = new google.visualization.DataTable();
      data.addColumn("string", "Element");
      data.addColumn("number", "Percentage");
      data.addRows([
        ["Credit", 0.78],
        ["Debit", 0.22],
      ]);

      // Instantiate and draw the chart.
      const chart = new google.visualization.PieChart(document.getElementById("piechart"));
      chart.draw(data, null);
    }

    getTitle(): string {
        return this._title;
    }

    setTitle(title: string): this {
        this._title = title;
        this.update();
        return this;
    }

    onMount() {
        google.charts.setOnLoadCallback(this._drawCharts );
        console.log("onMount", this.type, this.id);
    }

    onUmount() {
        console.log("onUmount", this.type, this.id);
    }

    render(): JsonMLs {
        return [
            ["h2", this._title],
            ["div.w3-card-12",
                ["header.w3-container w3-light-grey",
                    ["h3", "Account: ", user.alias]
                ],
                ["div.w3-container.w3-light-grey",
                    ["p", "Balance: 4 DCT"],
                    ["br"]
                ],
                ["h4", "Your account spending"],
                ["div#piechart"],
                ["h4", "Your account balance"],
                ["div#linechart"],
                ["button.w3-button.w3-block.w3-dark-grey", "Refresh"],
            ],
            ["br"]
        ];
    }

}
