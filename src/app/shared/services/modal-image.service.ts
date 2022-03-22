import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  public showModal: boolean = false;
  public newImage: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  abrirModal() {
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
  }
}
