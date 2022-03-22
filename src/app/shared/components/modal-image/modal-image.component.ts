import { Component, OnInit } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css'],
})
export class ModalImageComponent implements OnInit {
  public image_url: string = '';
  constructor(public modalImageService: ModalImageService) {}

  ngOnInit(): void {}

  cerrarModal() {
    this.modalImageService.cerrarModal();
  }

  changeImage() {
    this.modalImageService.newImage.emit(this.image_url);
    this.cerrarModal();
  }
}
