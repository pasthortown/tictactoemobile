import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JuegoPage } from '../juego/juego';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  splash = true;
  webServiceURL = 'http://localhost/sae/server/genero/leer';

  constructor(public navCtrl: NavController, public http: Http) {
  }

  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4000);
  }

  getAll() {
    this.http.get(this.webServiceURL)
    .subscribe(respuesta => {
      alert(JSON.stringify(respuesta.json()));
    }, error => {
      alert(JSON.stringify(error));
    });
  }

  login() {
    //EJECUTA COSAS DE LOGIN
    this.getAll();
    this.navCtrl.push(JuegoPage);
  }
}
