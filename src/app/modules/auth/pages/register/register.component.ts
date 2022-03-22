import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/http/api.service';
import { User } from 'src/app/shared/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user: User = new User();
  public errors: string[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  GetAuthPageLogin() {
    this.subscription.add(
      this.authService.getAuthPageGithud().subscribe({
        next: (response) => {
          this.router.navigate(['/redirect']).then((result) => {
            this.document.location.href = response.authUrl;
          });
        },
        error: () => {
          Swal.fire('Ups!', 'Error registering with github', 'error');
        },
      })
    );
  }

  register(user: User) {
    this.authService.signUp(user).subscribe({
      next: (response) => {
        this.authService.saveUserId(response.user.uid);
        this.authService.saveToken(response.token);
        this.router.navigate(['/home/user', response.user.uid]);
      },
      error: (err) => {
        this.errors = err.error.errors;
      },
      complete: () => {},
    });
  }
}
