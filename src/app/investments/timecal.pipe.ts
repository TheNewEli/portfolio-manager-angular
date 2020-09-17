import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timeCal'})
export class TimecalPipe implements PipeTransform {
  second: number;
  min: number;
  hour: number;
  day: number;
  result: string;
  transform(value: number): string {
    this.second = value / 1000;
    if (this.second > 60) {
      this.min = this.second / 60;
      if (this.min > 60) {
        this.hour = this.min / 60;
        if (this.hour > 24) {
          this.day = this.hour / 24;
          this.result = this.day.toFixed() + ' days ago';
        } else {
          this.result = this.hour.toFixed() + ' hours ago';
        }
      } else {
        this.result = this.min.toFixed() + ' mins ago';
      }
    } else {
      this.result = this.second.toFixed() + ' seconds ago';
    }
    return this.result;
  }
}
