import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AlertController } from 'ionic-angular';

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
export class JuegoPage implements OnInit {
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
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {

  }

  ngOnInit() {
    this.dificultad = 0;
  }

  showAlert(mensaje: string, titulo: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JuegoPage');
  }

  buscarGanador() {
    if (this.verificarGanador(1) != 0){
      this.showAlert('Gané', 'BUEN INTENTO');
      return true;
    }
    if (this.verificarGanador(5) != 0){
      this.showAlert('Ganaste', 'FELICIDADES');
      return true;
    }

    if (!this.verificarLibres()){
      this.showAlert('EMPATE', 'BUEN INTENTO');
      return true;
    }
    return false;
  }

  verificarLibres() {
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
    if (libres.length == 0){
      return false;
    }
    return true;
  }

  verificarGanador(fichaPorValidar: number) {
    let ganador = this.verificarGanadorColumnas(fichaPorValidar);
    if ( ganador == 0 ) {
      ganador = this.verificarGanadorFilas(fichaPorValidar);
    }
    if ( ganador == 0 ) {
      ganador = this.verificarGanadorDiagonales(fichaPorValidar);
    }
    return ganador;
  }

  verificarGanadorFilas(fichaPorValidar: number) {
    for( let i = 0 ; i<3 ; i++ ) {
      let sumaTablero = 0;
      for( let j = 0 ; j<3 ; j++) {
        sumaTablero += this.tablero[i][j];
      }
      if ( sumaTablero == fichaPorValidar*3 ) {
        return fichaPorValidar;
      }
    }
    return 0;
  }

  verificarGanadorColumnas(fichaPorValidar: number) {
    for( let j = 0 ; j<3 ; j++ ) {
      let sumaTablero = 0;
      for( let i = 0 ; i<3 ; i++) {
        sumaTablero += this.tablero[i][j];
      }
      if ( sumaTablero == fichaPorValidar*3 ) {
        return fichaPorValidar;
      }
    }
    return 0;
  }

  verificarGanadorDiagonales(fichaPorValidar:number) {
    let sumaTablero = 0;
    for( let i = 0 ; i<3 ; i++ ) {
      sumaTablero += this.tablero[i][i];
      if ( sumaTablero == fichaPorValidar*3 ) {
        return fichaPorValidar;
      }
    }
    sumaTablero = 0;
    for( let i = 0 ; i<3 ; i++ ) {
      sumaTablero += this.tablero[2-i][i];
      if ( sumaTablero == fichaPorValidar*3 ) {
        return fichaPorValidar;
      }
    }
    return 0;
  }

  sortearPrimerTurno() {
    let iniciaPC = false;
    if ( Math.floor(Math.random() * 10) % 2 ){
      iniciaPC = true;
    }
    if( iniciaPC ) {
      return this.turnoPC();
    }
    return false;
  }

  reiniciar() {
    this.tablero = [[0,0,0],
                    [0,0,0],
                    [0,0,0]];
    this.cuadradoMagico = [[0,0,0],
                           [0,0,0],
                           [0,0,0]];
    this.salida = [[' ',' ', ' '],
                   [' ',' ', ' '],
                   [' ',' ', ' ']];
    this.sortearPrimerTurno();
  }

  tomarPosicion(posicion: number, fichaJuego: string, valorFichaTablero: number) {
    if( posicion == 0 ){
      return false;
    }
    switch (posicion) {
      case 1:
        if (this.tablero[1][0] != 0) {
          return false;
        }
        this.tablero[1][0] = valorFichaTablero;
        this.cuadradoMagico[1][0] = 1;
        this.salida[1][0] = fichaJuego;
        break;
      case 2:
        if (this.tablero[2][2] != 0) {
          return false;
        }
        this.tablero[2][2] = valorFichaTablero;
        this.cuadradoMagico[2][2] = 2;
        this.salida[2][2] = fichaJuego;
        break;
      case 3:
        if (this.tablero[0][1] != 0) {
          return false;
        }
        this.tablero[0][1] = valorFichaTablero;
        this.cuadradoMagico[0][1] = 3;
        this.salida[0][1] = fichaJuego;
        break;
      case 4:
        if (this.tablero[0][2] != 0) {
          return false;
        }
        this.tablero[0][2] = valorFichaTablero;
        this.cuadradoMagico[0][2] = 4;
        this.salida[0][2] = fichaJuego;
        break;
      case 5:
        if (this.tablero[1][1] != 0) {
          return false;
        }
        this.tablero[1][1] = valorFichaTablero;
        this.cuadradoMagico[1][1] = 5;
        this.salida[1][1] = fichaJuego;
        break;
      case 6:
        if (this.tablero[2][0] != 0) {
          return false;
        }
        this.tablero[2][0] = valorFichaTablero;
        this.cuadradoMagico[2][0] = 6;
        this.salida[2][0] = fichaJuego;
        break;
      case 7:
        if (this.tablero[2][1] != 0) {
          return false;
        }
        this.tablero[2][1] = valorFichaTablero;
        this.cuadradoMagico[2][1] = 7;
        this.salida[2][1] = fichaJuego;
        break;
      case 8:
        if (this.tablero[0][0] != 0) {
          return false;
        }
        this.tablero[0][0] = valorFichaTablero;
        this.cuadradoMagico[0][0] = 8;
        this.salida[0][0] = fichaJuego;
        break;
      case 9:
        if (this.tablero[1][2] != 0) {
          return false;
        }
        this.tablero[1][2] = valorFichaTablero;
        this.cuadradoMagico[1][2] = 9;
        this.salida[1][2] = fichaJuego;
        break;
    }
    if (this.buscarGanador()) {
      this.reiniciar();
    }
    return true;
  }

  jugarPersona(posicion: number) {
    if (this.tomarPosicion(posicion, 'o', 5)){
      this.turnoPC();
    }
  }

  jugarPC(posicion: number) {
    return this.tomarPosicion(posicion, 'x', 1);
  }

  GanaSiPuedes() {
    return this.jugarPC(this.siguienteJugadaGanaONoPierdas(1));
  }

  NoPerderSiPuedes() {
    return this.jugarPC(this.siguienteJugadaGanaONoPierdas(5));
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
    let toReturn = libres[Math.floor(Math.random() * (libres.length - 1))];
    if( toReturn == null) {
      toReturn = 0;
    }
    return this.jugarPC(toReturn);
  }

  verificarPrioridades() {
    if ( this.tomarCentro() ) {
      return true;
    }
    return this.tomarEsquina();
  }

  tomarCentro() {
    return this.tomarPosicion(5, 'x', 1);
  }

  tomarEsquina() {
    let libres = [];
    if ( this.tablero[0][0]==0 ){
      libres.push(8);
    }
    if ( this.tablero[0][2]==0 ){
      libres.push(4);
    }
    if ( this.tablero[2][0]==0 ){
      libres.push(6);
    }
    if ( this.tablero[2][2]==0 ){
      libres.push(2);
    }
    let toReturn = libres[Math.floor(Math.random() * (libres.length - 1))];
    if( toReturn == null) {
      toReturn = 0;
    }
    return this.jugarPC(toReturn);
  }

  tomarMedios() {
    let libres = [];
    if ( this.tablero[0][1]==0 ){
      libres.push(3);
    }
    if ( this.tablero[1][0]==0 ){
      libres.push(1);
    }
    if ( this.tablero[1][2]==0 ){
      libres.push(9);
    }
    if ( this.tablero[2][1]==0 ){
      libres.push(7);
    }
    let toReturn = libres[Math.floor(Math.random() * (libres.length - 1))];
    if( toReturn == null) {
      toReturn = 0;
    }
    return this.jugarPC(toReturn);
  }

  cuidarEsquinas() {
    if ( ( this.tablero[0][0] == 5 && this.tablero[2][2] == 5 ) || ( this.tablero[0][2] == 5 && this.tablero[2][0] == 5 ) ) {
      return this.tomarMedios();
    }
    return false;
  }

  muy_facil() {
    if ( this.GanaSiPuedes() ){
      return true;
    }
    return this.jugarAzar();
  }

  facil() {
    if ( this.GanaSiPuedes() ){
      return true;
    }
    if ( this.NoPerderSiPuedes() ){
      return true;
    }
    return this.jugarAzar();
  }

  media() {
    if ( this.GanaSiPuedes() ){
      return true;
    }
    if ( this.NoPerderSiPuedes() ){
      return true;
    }
    if ( this.verificarPrioridades() ){
      return true;
    }
    return this.jugarAzar();
  }

  dificil() {
    if ( this.GanaSiPuedes() ){
      return true;
    }
    if ( this.NoPerderSiPuedes() ){
      return true;
    }
    if ( this.cuidarEsquinas() ){
      return true;
    }
    if ( this.verificarPrioridades() ){
      return true;
    }
    return this.jugarAzar();
  }

  turnoPC() {
    if (this.dificultad == 0) {
      this.muy_facil();
    }

    if (this.dificultad == 1) {
      this.facil();
    }

    if (this.dificultad == 2) {
      this.media();
    }

    if (this.dificultad == 3) {
      this.dificil();
    }
  }
}
