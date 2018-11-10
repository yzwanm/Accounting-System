import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {
  //@ViewChild{ Slides } Slides;
  @ViewChild(Slides) slides: Slides;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;

  lineChart: any;
  doughnutChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ["10/1", "10/2", "10/3", "10/4", "10/5", "10/6", "10/7"],
        datasets: [
          {
            label: "Weekly Expenditure",  //The label for the dataset which appears in the legend and tooltips.
            fill: false,  //How to fill the area under the line
            lineTension: 0.1, //Bezier curve tension of the line
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt', //Cap style of the line
            borderDash: [], //Length and spacing of dashes
            borderDashOffset: 0.0,  //Offset for line dashes
            borderJoinStyle: 'miter', //Line joint style.
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,  //The width of the point border in pixels.
            pointHoverRadius: 5,  //The radius of the point when hovered.
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1, //The radius of the point shape. If set to 0, the point is not rendered.
            pointHitRadius: 10, //The pixel size of the non-displayed point that reacts to mouse events.
            data: [65, 59, 80, 81, 56, 55, 40], //input
            spanGaps: false,
          }
        ]
      }

    });


    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["food", "shopping", "book", "movie"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            //'rgba(153, 102, 255, 0.2)',
            //'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            //"#36A2EB",
            //"#FFCE56"
          ]
        }]
      }

    });


    console.log('ionViewDidLoad ChartPage');
  }



  apps = 'week'
}
