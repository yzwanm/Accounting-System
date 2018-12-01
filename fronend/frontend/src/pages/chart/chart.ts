import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Slides } from 'ionic-angular';
import { DatePickerProvider } from "ionic2-date-picker";
import { HttpHeaders, HttpClient } from "@angular/common/http";

/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface ChartItem {
  datechoose1: string;
};

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
  dailytotal: any[];
  dates1: string;
  dates2: string;
  dates3: string;
  dates4: string;
  dates5: string;
  dates6: string;
  dates7: string;
  dailytotal1: string;
  dailytotal2: string;
  dailytotal3: string;
  dailytotal4: string;
  dailytotal5: string;
  dailytotal6: string;
  dailytotal7: string;
  total: number;
  average: number;

  chartItem: ChartItem = {
    //datechoose1: (new Date().toLocaleDateString()).toString(),
    datechoose1: (new Date().toISOString().slice(0,10)),  //putting date in YYYY-MM-DD format

  };


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private datePickerProvider: DatePickerProvider,
              public http: HttpClient) {
  }
  showCalendar() {
    const dateSelected =
    this.datePickerProvider.showCalendar(this.modalCtrl);

    dateSelected.subscribe(date =>
      this.chartItem.datechoose1 = (date.toLocaleDateString()).toString()
    );

  }

  ngOnInit(){
    let currentdate = this.chartItem.datechoose1;
    console.log(this.chartItem.datechoose1);
    let myheader = new HttpHeaders();
    var i = 0;
    var sum = 0;
    //can get to the backend from /chartData rather than /viewChartData
    this.http.get("http://localhost:3000/chartData/" + currentdate,{withCredentials:true}).subscribe((data:any[])=>{
      for (var k in data) {
        i ++;
        sum = sum + data[k];
        if (i == 1) {
          this.dates1 = k;
          this.dailytotal1 = data[k];
        } else if (i == 2) {
          this.dates2 = k;
          this.dailytotal2 = data[k];
        } else if (i == 3) {
          this.dates3 = k;
          this.dailytotal3 = data[k]
        } else if (i == 4) {
          this.dates4 = k;
          this.dailytotal4 = data[k]
        } else if (i == 5) {
          this.dates5 = k;
          this.dailytotal5 = data[k]
        } else if (i == 6) {
          this.dates6 = k;
          this.dailytotal6 = data[k]
        } else if (i == 7) {
          this.dates7 = k;
          this.dailytotal7 = data[k]
        }
      }
      this.total = sum;
      this.average = sum/7;
      this.ionViewDidLoad();
    //   for (var k in data) (var i=0; i< data.length, i++){
    //     this.dailytotal[k] = k;
    //     console.log(k);
    //     this.datechoose[k] = data[k];
    //   }
    });

  }

  ionViewDidLoad() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [this.dates1, this.dates2, this.dates3, this.dates4, this.dates5, this.dates6, this.dates7],
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
            data: [this.dailytotal1, this.dailytotal2, this.dailytotal3, this.dailytotal4, this.dailytotal5, this.dailytotal6, this.dailytotal7], //input
            spanGaps: false,
          }
        ]
      }

    });


    // this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    //   type: 'doughnut',
    //   data: {
    //     labels: ["food", "shopping", "book", "movie"],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         //'rgba(153, 102, 255, 0.2)',
    //         //'rgba(255, 159, 64, 0.2)'
    //       ],
    //       hoverBackgroundColor: [
    //         "#FF6384",
    //         "#36A2EB",
    //         "#FFCE56",
    //         "#FF6384",
    //         //"#36A2EB",
    //         //"#FFCE56"
    //       ]
    //     }]
    //   }
    //
    // });


    console.log('ionViewDidLoad ChartPage');
  }



  apps = 'week'
}
