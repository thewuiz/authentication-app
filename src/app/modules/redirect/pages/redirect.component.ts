import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/http/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
})
export class RedirectComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getParams();
  }

  loginGithud(code: string) {
    this.subscription.add(
      this.authService.loginGithud(code).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          this.authService.saveUserId(response.user.uid);
          this.router.navigate(['/home/user', response.user.uid]);
        },
        error: () => {},
        complete: () => {},
      })
    );
  }

  getParams() {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe({
        next: (params) => {
          const { code } = params;
          if (code) {
            this.loginGithud(code);
          }
        },
        error: (err) => {
          Swal.fire('Ups!', 'Error loading params', 'error');
        },
        complete: () => {},
      })
    );
  }
}
