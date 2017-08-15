import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Observable} from 'rxjs/Rx';

@Injectable()
export class Weather {
  apiKey = 'eef5f55a061a93ca';
  url;

  constructor(public http: Http) {
    console.log('Hello Weather Provider');
    this.url = 'http://api.wunderground.com/api/'+this.apiKey+'/conditions/q/';
  }

  getWeather(city, state) {
    return this.http.get(this.url+'/'+state+'/'+city+'.json')
      .map(res => res.json())
      //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

}
