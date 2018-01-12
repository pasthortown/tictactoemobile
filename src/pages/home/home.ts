import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JuegoPage } from '../juego/juego';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  splash = true;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4000);
  }

  login() {
    //EJECUTA COSAS DE LOGIN
    this.navCtrl.push(JuegoPage);
  }
}
