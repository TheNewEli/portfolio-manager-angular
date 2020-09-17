import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-net-worth',
  templateUrl: './net-worth.component.html',
  styleUrls: ['./net-worth.component.css']
})
export class NetWorthComponent implements OnInit {
  isLoading = false;
  echartsInstance;
  period: any;

  dateList = [];
  cashHistoryList = [];
  investmentList = [];

  options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Cash', 'Investment']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: []
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Cash',
        type: 'line',
        stack: 'counts',
        areaStyle: {normal: {}},
        data: []
      },
      {
        name: 'Investment',
        type: 'line',
        stack: 'counts',
        areaStyle: {normal: {}},
        data: []
      }
    ]
  };

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.setChartForPeriod(50);
  }

  onChartInit(echarts: any): void {
    this.echartsInstance = echarts;
  }

  setChartForPeriod(period: number): void {
    this.isLoading = true;
    this.getCash(period);
  }

  resetChart(): void {
    this.options.xAxis[0].data = this.dateList;
    this.options.series[1].data = this.investmentList;

    this.echartsInstance.clear();
    this.echartsInstance.setOption(this.options, true);
  }

  getCash(period): void {
    const url = 'http://localhost:8080/netWorth/cash/' + period;
    // 使用get方法请求url，请求一旦成功后，将调用传入的第一个方法；如果请求失败，将调用传入的第二个方法
    this.httpClient.get(url)
      .subscribe((response: any) => {
        this.dateList = response[0];
        this.cashHistoryList = response[1];
        this.options.xAxis[0].data = this.dateList;
        this.options.series[0].data = this.cashHistoryList;
        this.getInvestment(period);
      }, (response) => {
        console.log(response);
        console.error('请求出错');
      });
    // this.cashAccount.forEach(val => {this.totalCash += val.value; });
  }


  getInvestment(period): void {
    const url = 'http://localhost:8080/netWorth/stock/' + period;
    // 使用get方法请求url，请求一旦成功后，将调用传入的第一个方法；如果请求失败，将调用传入的第二个方法
    this.httpClient.get(url)
      .subscribe((response: any) => {
        this.investmentList = response[1];
        this.options.series[1].data = this.investmentList;
        this.resetChart();
        this.isLoading = false;
      }, (response) => {
        console.log(response);
        console.error('请求出错');
      });
    // this.cashAccount.forEach(val => {this.totalCash += val.value; });
  }
}
