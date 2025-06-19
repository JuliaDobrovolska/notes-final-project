import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  loading = false;
  error = ''

  private userSub: Subscription | undefined;

  constructor(public authService: AuthService, public router: Router) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.loading = true;
    console.log("isLoginMode", this.isLoginMode);
    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe({
        next: response => {
          this.loading = false;
          this.authService.autoLogout(3600)
          this.router.navigate(["/notes"])
        }, error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.error = error?.error?.message || "Error Occurred";
        }
      })
    } else {
      this.authService.signup(email, password).subscribe({
        next: response => {
          this.loading = false;
          this.authService.autoLogout(3600)
          this.router.navigate(["/notes"])
        }, error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.error = error?.error?.message || "Error Occurred";
        }
      })
    }


  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
