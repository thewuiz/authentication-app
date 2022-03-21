import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/http/api.service';
import Swal from 'sweetalert2';
import { User } from '../models/user';
import { ModalImageService } from '../services/modal-image.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public user: User = new User();
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private modalImageService: ModalImageService
  ) {}

  ngOnInit(): void {
    const id = this.authService.userId;
    this.apiService.getUserById(id).subscribe({
      next: (user) => {
        this.user = user;
      },
    });

    this.apiService.userUpdate.subscribe({
      next: (response: User) => {
        this.user = response;
      },
    });
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/login']);
        Swal.fire('', 'Bye', 'success');
      }
    });
  }
}
