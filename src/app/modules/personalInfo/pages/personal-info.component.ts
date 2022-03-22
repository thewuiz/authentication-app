import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/http/api.service';
import { User } from 'src/app/shared/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
})
export class PersonalInfoComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public user: User = new User();

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getParams();
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
}
