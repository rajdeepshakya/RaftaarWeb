import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables} from 'chart.js';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CreditDebitComponent } from 'src/app/shared/dialogs/credit-debit/credit-debit.component';
@Component({
  selector: 'app-view-statics',
  templateUrl: './view-statics.component.html',
  styleUrls: ['./view-statics.component.scss']
})
export class ViewStaticsComponent implements OnInit {
ctx:any;
duration:any = ['Last Day','Last Week','Last Month','Last 3 Months','Last 6 Months','Last Year'];
billstats:any=[
  {
    img:"assets/images/truck.svg",
    billdata:'Total billing',
    billquantity:233
  },
  {
    img:"assets/images/truck.svg",
    billdata:'Total Purchase Order Value',
    billquantity:233
  },
  {
    img:"assets/images/totalpaid.svg",
    billdata:'Total Paid',
    billquantity:233
  },
  {
    img:"assets/images/payable.svg",
    billdata:'Total Payable',
    billquantity:233
  },
  {
    img:"assets/images/received.svg",
    billdata:'Total Received',
    billquantity:233
  },
  {
    img:"assets/images/recevible.svg",
    billdata:'Total Receivable',
    billquantity:233
  }
]
  data: any;

  constructor(private dialog:MatDialog,private service:ApiServicesService) { 
    Chart.register(...registerables);  
  }
  ngOnInit(): void {
    this.drawGraph();
    this.statsData();
  }

  drawGraph(){
    const statsGraph = new Chart("transactionStats", {
      type: 'bar',
      data: {
        labels: ['Jan'],
        datasets: [{
            barPercentage: 1,
            categoryPercentage: 1,
            barThickness: 14,
            borderRadius:10,
            data: [14],
            backgroundColor: ['#23C99A',],
          },
          {
            barPercentage: 1,
            categoryPercentage: 1,
            barThickness: 14,
            borderRadius:10,
            data: [12],
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
              callback: function(value) {
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

  statsData(){
    this.service.get({}, API_ROUTES.Transactions.stats).pipe().subscribe((res) => {
      console.log(res);
      this.data = res.result
    });
  }

  creditDebit(){
    const dialogRef=this.dialog.open(CreditDebitComponent,{
      maxHeight: '100vh',
      width:'465px',
      panelClass:'credit'
    })
  }

}
