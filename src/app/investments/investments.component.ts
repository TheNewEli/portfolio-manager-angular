import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  investments = [];

  constructor(private httpClient: HttpClient) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // 后台数据的请求地址，如果变量定义后不再重新赋值，则应该使用const来定义
    const url = 'http://localhost:8080/investmentinfo/test';

    // 使用get方法请求url，请求一旦成功后，将调用传入的第一个方法；如果请求失败，将调用传入的第二个方法
    this.httpClient.get(url)
      .subscribe((response: any) => {
        console.log(response);
        this.investments = response;
      }, (response) => {
        console.log(response);
        console.error('请求出错');
      });
  }

}
