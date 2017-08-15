import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Weather } from '../../providers/weather';



@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {

  city: string;
  state: string;
  weather: any;
  error: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private weatherProvider: Weather,
    public loadingCtrl: LoadingController
    ) {

    this.storage.get('loc').then((val) => {
      if (val != null) {
        let loc = JSON.parse(val);
        this.city = loc.city;
        this.state = loc.state;
      } else {
        this.city = 'Miami';
        this.state = 'FL';
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }

  saveForm() {
    let location = {
      city: this.city,
      state: this.state
    }
    
    this.storage.set('loc', JSON.stringify(location));
    
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 100
    });
    loader.present();
    
    this.navCtrl.push(HomePage);
  
    }
  }
