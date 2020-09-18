import {Component, OnInit, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NetWorthService} from '../net-worth.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  cashAccounts = new Array();
  investments = new Array();
  netWorth = 0;
  totalCash: number;
  totalInvestment: number;
  today: number = Date.now();

  constructor(private httpClient: HttpClient, public dialog: MatDialog, private netWorthService: NetWorthService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // 后台数据的请求地址，如果变量定义后不再重新赋值，则应该使用const来定义
    this.getCash();
    this.getInvestment();
    this.netWorthService.netWorthOb.subscribe(netWorth => {
      this.netWorth = netWorth;
    });
    this.netWorthService.investmentOb.subscribe(investment => {
      this.totalInvestment = investment;
    });
  }

  getCash(): void {
    const url = 'http://localhost:8080/cashFlow/test';
    // 使用get方法请求url，请求一旦成功后，将调用传入的第一个方法；如果请求失败，将调用传入的第二个方法
    this.httpClient.get(url)
      .subscribe((response: any) => {
        console.log(response);
        this.cashAccounts = response;
        this.totalCash = 0;
        this.cashAccounts.forEach(val => {
          this.totalCash += val.value;
        });
        this.netWorth += this.totalCash;
      }, (response) => {
        console.log(response);
        console.error('请求出错');
      });
  }

  getInvestment(): void {
    const url = 'http://localhost:8080/investmentinfo';
    // 使用get方法请求url，请求一旦成功后，将调用传入的第一个方法；如果请求失败，将调用传入的第二个方法
    this.httpClient.get(url)
      .subscribe((response: any) => {
        console.log(response);
        this.investments = response;
        this.totalInvestment = 0;
        this.investments.forEach(val => {
          this.totalInvestment += val.currentValue;
        });
        this.netWorth += this.totalInvestment;
      }, (response) => {
        console.log(response);
        console.error('请求出错');
      });
  }

  showDetails(investment): void {
    const dialogRef = this.dialog.open(DetailsDialog, {
      width: '500px',
      data: investment
    });
  }


}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'details-dialog',
  templateUrl: './details-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class DetailsDialog {

  constructor(
    public dialogRef: MatDialogRef<DetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public investment) {
  }

  onOKClick(): void {
    this.dialogRef.close();
  }

}
