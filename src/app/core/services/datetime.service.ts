import { Injectable } from '@angular/core';

@Injectable()
export class DatetimeService {

  getTomorrow() {
    const oneDay = 1;
    const today = new Date();
    const miliseconds = today.setDate(today.getDate() + oneDay);
    const tomorrow = new Date(miliseconds);
    return tomorrow;
  }

  dateToYearhMonthDay(date: Date): string {
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = this._getMonth(date.getMonth());
      const day = this._getDay(date.getDate());
      const fullDate = `${year}/${month}/${day}`;
      return fullDate;
    }
    return '';
  }

  dateToDayMonthYearh(date: Date): string {
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = this._getMonth(date.getMonth());
      const day = this._getDay(date.getDate());
      const fullDate = `${day}/${month}/${year}`;
      return fullDate;
    }
    return '';
  }

  private _getMonth(month: number): string {
    let result = '';
    switch(month) {
      case 0: result='01'; break;
      case 1: result='02'; break;
      case 2: result='03'; break;
      case 3: result='04'; break;
      case 4: result='05'; break;
      case 5: result='06'; break;
      case 6: result='07'; break;
      case 7: result='08'; break;
      case 8: result='09'; break;
      case 9: result='10'; break;
      case 10: result='11'; break;
      case 11: result='12'; break;
    }
    return result;
  }

  private _getDay(day: number): string {
    let result = '';
    switch(day) {
      case 1: result='01'; break;
      case 2: result='02'; break;
      case 3: result='03'; break;
      case 4: result='04'; break;
      case 5: result='05'; break;
      case 6: result='06'; break;
      case 7: result='07'; break;
      case 8: result='08'; break;
      case 9: result='09'; break;
      default: result=day.toString(); break;
    }
    return result;
  }
  
}
