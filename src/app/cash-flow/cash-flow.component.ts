import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {
  period: any;
  incomePieOptions = {
    title: {
      text: 'Income Pie Chart',
      left: 'center',
      top: 20
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : ${c} ({d}%)',
    },
    series: [
      {
        name: 'Income',
        type: 'pie',
        radius: '55%',
        data: [
          {value: 235, name: '视频广告'},
          {value: 274, name: '联盟广告'},
          {value: 310, name: '邮件营销'},
          {value: 335, name: '直接访问'},
          {value: 400, name: '搜索引擎'}
        ]
      }
    ],
    label: {
      normal: {
        textStyle: {
          color: 'rgba(255, 255, 255, 0.3)',
        },
      },
    }
  };

  spendingPieOptions = {
    title: {
      text: 'Spending Pie Chart',
      left: 'center',
      top: 20
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : ${c} ({d}%)',
    },
    series: [
      {
        name: 'Spending',
        type: 'pie',
        radius: '55%',
        data: [
          {value: 235, name: '视频广告'},
          {value: 274, name: '联盟广告'},
          {value: 310, name: '邮件营销'},
          {value: 335, name: '直接访问'},
          {value: 400, name: '搜索引擎'}
        ]
      }
    ],
    label: {
      normal: {
        textStyle: {
          color: 'rgba(255, 255, 255, 0.3)',
        },
      },
    }
  };
  private symbolList: any;
  private spendingList: any;
  private incomeList: any;
  private incomeChartRef: any;
  private spendingChartRef: any;
  isLoading = false;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.period = 'month';
    this.setDataForCharts(10);
  }

  setChartForPeriod(period: number): void {
    this.setDataForCharts(period);
  }

  onChartInit(ec: any): void {

  }

  setDataForCharts(period): void {
    this.isLoading = true;
    const url = 'http://localhost:8080/cashFlow/' + period;
    // 使用get方法请求url，请求一旦成功后，将调用传入的第一个方法；如果请求失败，将调用传入的第二个方法
    this.httpClient.get(url)
      .subscribe((response: any) => {
        this.symbolList = response[0];
        this.incomeList = response[1];
        this.spendingList = response[2];
        console.log('res' + response);
        this.resetCharts();
      }, (response) => {
        console.log(response);
        console.error('请求出错');
      });
    // this.cashAccount.forEach(val => {this.totalCash += val.value; });
  }

  resetCharts(): void {
    console.log('symbollist:' + this.symbolList);
    this.incomePieOptions.series[0].data = this.buildSeriesData(this.symbolList, this.incomeList);
    this.spendingPieOptions.series[0].data = this.buildSeriesData(this.symbolList, this.spendingList);

    this.incomeChartRef.clear();
    this.incomeChartRef.setOption(this.incomePieOptions, true);
    this.spendingChartRef.clear();
    this.spendingChartRef.setOption(this.spendingPieOptions, true);
    this.isLoading = false;
  }

  buildSeriesData(symbolList: string[], cashList: number[]): any[] {
    const dataList = [];
    this.symbolList.forEach((symbol, index) => {
      dataList.push({value: cashList[index], name: symbol});
    });
    return dataList;
  }

  incomeChartInit(ec: any): void {
    this.incomeChartRef = ec;
  }

  spendingChartInit(ec: any): void {
    this.spendingChartRef = ec;
  }
}
