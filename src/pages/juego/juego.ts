import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the JuegoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-juego',
  templateUrl: 'juego.html',
})
export class JuegoPage {
  dificultad: number;
  tablero: number[][] = [[0,0,0],
                         [0,0,0],
                         [0,0,0]];
  /*
  [8,3,4],
  [1,5,9],
  [6,7,2]*/
  cuadradoMagico: number[][] = [[0,0,0],
                                [0,0,0],
                                [0,0,0]];
  salida: string[][] = [[' ',' ', ' '],
                        [' ',' ', ' '],
                        [' ',' ', ' ']];
  // PERSONA JUEGA CON EL 5
  // COMPUTADORA JUEGA CON EL 1
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JuegoPage');
  }

  jugarPersona(posicion: number) {
    switch (posicion) {
      case 1:
        if (this.tablero[1][0] != 0) {
          return;
        }
        this.tablero[1][0] = 5
        this.cuadradoMagico[1][0] = 1;
        this.salida[1][0] = "o";
        break;
      case 2:
        if (this.tablero[2][2] != 0) {
          return;
        }
        this.tablero[2][2] = 5
        this.cuadradoMagico[2][2] = 2;
        this.salida[2][2] = "o";
        break;
      case 3:
        if (this.tablero[0][1] != 0) {
          return;
        }
        this.tablero[0][1] = 5;
        this.cuadradoMagico[0][1] = 3;
        this.salida[0][1] = "o";
        break;
      case 4:
        if (this.tablero[0][2] != 0) {
          return;
        }
        this.tablero[0][2] = 5;
        this.cuadradoMagico[0][2] = 4;
        this.salida[0][2] = "o";
        break;
      case 5:
        if (this.tablero[1][1] != 0) {
          return;
        }
        this.tablero[1][1] = 5;
        this.cuadradoMagico[1][1] = 5;
        this.salida[1][1] = "o";
        break;
      case 6:
        if (this.tablero[2][0] != 0) {
          return;
        }
        this.tablero[2][0] = 5;
        this.cuadradoMagico[2][0] = 6;
        this.salida[2][0] = "o";
        break;
      case 7:
        if (this.tablero[2][1] != 0) {
          return;
        }
        this.tablero[2][1] = 5;
        this.cuadradoMagico[2][1] = 7;
        this.salida[2][1] = "o";
        break;
      case 8:
        if (this.tablero[0][0] != 0) {
          return;
        }
        this.tablero[0][0] = 5;
        this.cuadradoMagico[0][0] = 8;
        this.salida[0][0] = "o";
        break;
      case 9:
        if (this.tablero[1][2] != 0) {
          return;
        }
        this.tablero[1][2] = 5;
        this.cuadradoMagico[1][2] = 9;
        this.salida[1][2] = "o";
        break;
    }
  }

  jugar(posicion: number) {
    if( posicion == 0 ){
      return false;
    }
    switch (posicion) {
      case 1:
        this.tablero[1][0] = 1;
        this.cuadradoMagico[1][0] = 1;
        this.salida[1][0] = "x";
        break;
      case 2:
        this.tablero[2][2] = 1;
        this.cuadradoMagico[2][2] = 2;
        this.salida[2][2] = "x";
        break;
      case 3:
        this.tablero[0][1] = 1;
        this.cuadradoMagico[0][1] = 3;
        this.salida[0][1] = "x";
        break;
      case 4:
        this.tablero[0][2] = 1;
        this.cuadradoMagico[0][2] = 4;
        this.salida[0][2] = "x";
        break;
      case 5:
        this.tablero[1][1] = 1;
        this.cuadradoMagico[1][1] = 5;
        this.salida[1][1] = "x";
        break;
      case 6:
        this.tablero[2][0] = 1;
        this.cuadradoMagico[2][0] = 6;
        this.salida[2][0] = "x";
        break;
      case 7:
        this.tablero[2][1] = 1;
        this.cuadradoMagico[2][1] = 7;
        this.salida[2][1] = "x";
        break;
      case 8:
        this.tablero[0][0] = 1;
        this.cuadradoMagico[0][0] = 8;
        this.salida[0][0] = "x";
        break;
      case 9:
        this.tablero[1][2] = 1;
        this.cuadradoMagico[1][2] = 9;
        this.salida[1][2] = "x";
        break;
    }
    return true;
  }

  GanaSiPuedes() {
    this.jugar(this.siguienteJugadaGanaONoPierdas(1));
  }

  NoPerderSiPuedes() {
    this.jugar(this.siguienteJugadaGanaONoPierdas(5));
  }

  siguienteJugadaGanaONoPierdas(fichaPorValidar:number) {
    let siguienteJugada = 0;
    siguienteJugada = this.validarFilas(fichaPorValidar);
    if( siguienteJugada != 0) {
      return siguienteJugada;
    }
    siguienteJugada = this.validarColumnas(fichaPorValidar);
    if( siguienteJugada != 0) {
      return siguienteJugada;
    }
    siguienteJugada = this.validarDiagonales(fichaPorValidar);
    return siguienteJugada;
  }

  validarFilas(fichaPorValidar:number) {
    for( let i = 0 ; i<3 ; i++ ) {
      let sumaTablero = 0;
      let sumaCuadradoMagico = 0;
      for( let j = 0 ; j<3 ; j++) {
        sumaTablero += this.tablero[i][j];
        sumaCuadradoMagico += this.cuadradoMagico[i][j];
      }
      if ( sumaTablero == fichaPorValidar*2 ) {
        return 15 - sumaCuadradoMagico;
      }
    }
    return 0;
  }

  validarColumnas(fichaPorValidar:number) {
    for( let j = 0 ; j<3 ; j++ ) {
      let sumaTablero = 0;
      let sumaCuadradoMagico = 0;
      for( let i = 0 ; i<3 ; i++) {
        sumaTablero += this.tablero[i][j];
        sumaCuadradoMagico += this.cuadradoMagico[i][j];
      }
      if ( sumaTablero == fichaPorValidar*2 ) {
        return 15 - sumaCuadradoMagico;
      }
    }
    return 0;
  }

  validarDiagonales(fichaPorValidar:number) {
    let sumaTablero = 0;
    let sumaCuadradoMagico = 0;
    for( let i = 0 ; i<3 ; i++ ) {
      sumaTablero += this.tablero[i][i];
      sumaCuadradoMagico += this.cuadradoMagico[i][i];
      if ( sumaTablero == fichaPorValidar*2 ) {
        return 15 - sumaCuadradoMagico;
      }
    }
    sumaTablero = 0;
    sumaCuadradoMagico = 0;
    for( let i = 0 ; i<3 ; i++ ) {
      sumaTablero += this.tablero[2-i][i];
      sumaCuadradoMagico += this.cuadradoMagico[2-i][i];
      if ( sumaTablero == fichaPorValidar*2 ) {
        return 15 - sumaCuadradoMagico;
      }
    }
    return 0;
  }

  jugarAzar() {
    let libres = [];
    let jugadas = [[8,3,4],
                   [1,5,9],
                   [6,7,2]];
    for( let i = 0 ; i<3 ; i++ ) {
      for( let j = 0 ; j<3 ; j++ ) {
        if( this.tablero[i][j]==0 ) {
          libres.push(jugadas[i][j]);
        }
      }
    }
    return this.jugar(libres[Math.floor(Math.random() * (libres.length - 1))]);
  }
}
