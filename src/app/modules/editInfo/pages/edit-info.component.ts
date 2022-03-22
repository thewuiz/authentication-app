import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';
import { User } from 'src/app/shared/models/user';
import { ModalImageService } from 'src/app/shared/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css'],
})
export class EditInfoComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public user: User = new User();
  public errors: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private modalImageService: ModalImageService
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getParams();
    this.subscription.add(
      this.modalImageService.newImage.subscribe({
        next: (response: any) => {
          this.user.photo = response;
        },
      })
    );
  }

  getParams() {
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const { id } = params;
          if (id) {
            this.getUserById(id);
          }
        },
        error: (err) => {
          Swal.fire('Ups!', 'Error loading params', 'error');
        },
        complete: () => {},
      })
    );
  }

  getUserById(id: string) {
    this.subscription.add(
      this.apiService.getUserById(id).subscribe({
        next: (response) => {
          this.user = response;
        },
      })
    );
  }

  updateUser() {
    this.apiService.updateUser(this.user).subscribe({
      next: (response) => {
        this.user = response;
        this.apiService.userUpdate.emit(this.user);
        Swal.fire(
          'Updated!',
          `User ${this.user.name} updated successfully`,
          'success'
        );
      },
      error: (err) => {
        this.errors = err.error.errors;
      },
      complete: () => {
        this.router.navigate(['/home/user', this.user.uid]);
      },
    });
  }

  openModal() {
    this.modalImageService.abrirModal();
  }
}
