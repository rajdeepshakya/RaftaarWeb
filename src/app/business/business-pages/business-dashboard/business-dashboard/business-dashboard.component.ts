import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.scss']
})
export class BusinessDashboardComponent implements OnInit {
  payableGraph:any;
  receivableGraph:any;
  graphData: any;
  isFirstGraph=false;
  monthName: any = [];
  transactionPaidCount: any = [];
  transactionPendingCount: any = [];
  monthName1: any = [];
  transactionPaidCount1: any = [];
  transactionPendingCount1: any = [];
  billstats: any = [
    {
      img: "assets/images/billing.svg",
      billdata: 'Total billing',
      billquantity: 233
    },
    {
      img: "assets/images/billing.svg",
      billdata: 'Total Purchase Order Value',
      billquantity: 233
    },
    {
      img: "assets/images/total-paid.svg",
      billdata: 'Total Paid',
      billquantity: 233
    },
    {
      img: "assets/images/paid.svg",
      billdata: 'Total Payable',
      billquantity: 233
    },
    {
      img: "assets/images/received.svg",
      billdata: 'Total Received',
      billquantity: 233
    },
    {
      img: "assets/images/recevible.svg",
      billdata: 'Total Receivable',
      billquantity: 233
    }
  ]

 
  constructor(private service: ApiServicesService,
    private toastr: ToastrService,) {
    Chart.register(...registerables);

  }


  ngOnInit(): void {
    this.getTransactionGraphPaidData("last6Month");
    //this.graph();

  }

  graph(data: any) {
    debugger

    data.forEach((element: any) => {
      let date = new Date(element.month);
      let da = date.toLocaleString('en-us', { month: 'long' });
      this.monthName.push(da);
      this.transactionPaidCount.push(element.total_paid);
      this.transactionPendingCount.push(element.total_payable);
    });
     this.payableGraph = new Chart("payable-graph", {
      type: 'bar',
      data: {
        // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        labels: this.monthName,
        datasets: [{
          barPercentage: 1,
          categoryPercentage: 1,
          barThickness: 14,
          borderRadius: 10,
          data: [14],
          backgroundColor: ['#23C99A',],
        },
        {
          barPercentage: 1,
          categoryPercentage: 1,
          barThickness: 14,
          borderRadius: 10,
          data: [14],
          backgroundColor: ['#FF4746'],
        }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
          yAxis: {
            beginAtZero: true,
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              callback: function (value) {
                return `${value}K`;
              }
            }
          },
          xAxis: {
            beginAtZero: true,
            grid: {
              display: false,
              drawBorder: false
            }
          },
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }

    });

  }
  secondGraph(secondGraphData: any) {
    secondGraphData.forEach((element: any) => {
      let date = new Date(element.month);
      let da = date.toLocaleString('en-us', { month: 'long' });
      this.monthName1.push(da);
      this.transactionPaidCount1.push(element.total_received);
      this.transactionPendingCount1.push(element.total_receivable);
    });
     this.receivableGraph = new Chart("receivable-graph", {
      type: 'bar',
      data: {
        labels: this.monthName1,
        datasets: [{
          barPercentage: 1,
          categoryPercentage: 1,
          barThickness: 14,
          borderRadius: 10,
          data: [14],
          backgroundColor: ['#23C99A',],
        },
        {
          barPercentage: 1,
          categoryPercentage: 1,
          barThickness: 14,
          borderRadius: 10,
          data:[14],
          backgroundColor: ['#FF4746'],
        }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
          yAxis: {
            beginAtZero: true,
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              callback: function (value) {
                return `${value}K`;
              }
            }
          },
          xAxis: {
            beginAtZero: true,
            grid: {
              display: false,
              drawBorder: false
            }
          },
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }

    });
  }
  getTransactionGraphPaidData(data: any) {
    this.service.get({}, `${API_ROUTES.Dashboard.logs + "?duration=" + data}`).pipe().subscribe((res) => {
      if (res.success) {
        console.log("getTransactionGraphData==================================>" + JSON.stringify(res.result));
        this.graphData = res.result.graphCoordinates;
        this.graph(this.graphData);
        if(!this.isFirstGraph){
          this.secondGraph(this.graphData);
        }
       
      } else {

      }
    }
    )
  }
  getTransactionGraphPendingData(data: any) {
    this.service.get({}, `${API_ROUTES.Dashboard.logs + "?duration=" + data}`).pipe().subscribe((res) => {
      if (res.success) {
        console.log("getTransactionGraphData==================================>" + JSON.stringify(res.result));
        this.graphData = res.result.graphCoordinates;
      //  this.graph(this.graphData);
        this.secondGraph(this.graphData);
      } else {

      }
    }
    )
  }
  selectionChangePaid(event: any) {
    var data = event;
    this.isFirstGraph=true;
    this.payableGraph.destroy();
    this.getTransactionGraphPaidData(event.value);
  }
  selectionChangePending(event: any) {
    var data = event;
    this.receivableGraph.destroy();
    this.getTransactionGraphPendingData(event.value);
  }
}
