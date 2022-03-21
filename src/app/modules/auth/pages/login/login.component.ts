import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public user: User = new User();
  public errors: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const userId = this.authService.userId;
      this.router.navigate(['/home/user', userId]);
    }
  }

  login(user: User) {
    this.subscription.add(
      this.authService.signIn(user).subscribe({
        next: (response) => {
          this.authService.saveUserId(response.user.uid);
          this.authService.saveToken(response.token);
          this.router.navigate(['/home/user', response.user.uid]);
        },
        error: (err) => {
          this.errors = err.error.errors;
        },
      })
    );
  }

  GetAuthPageLogin() {
    this.subscription.add(
      this.authService.getAuthPageGithud().subscribe({
        next: (response) => {
          this.router.navigate(['/redirect']).then((result) => {
            this.document.location.href = response.authUrl;
          });
        },
        error: () => {
          Swal.fire('Ups!', 'Failed to login', 'error');
        },
      })
    );
  }
}
