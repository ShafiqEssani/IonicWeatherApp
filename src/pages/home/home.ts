import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Weather } from '../../providers/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather: any;
  error: any;
  loc: {
    city: string,
    state: string
  }


  constructor(
    public navCtrl: NavController,
    private weatherProvider: Weather,
    private storage: Storage    
    ) {
  }

  ionViewWillEnter() {

    this.storage.get('loc').then((val) => {
      if (val != null) {
        this.loc = JSON.parse(val);
      } else {
        this.loc = {
          city: 'Miami',
          state: 'FL'
        }
      }

      this.weatherProvider.getWeather(this.loc.city, this.loc.state)
        .subscribe(res => {
          //console.log(res);
          this.weather = res.current_observation;
          this.error = res.response.error;
          console.log(this.error);
        });
    });
  }

}
