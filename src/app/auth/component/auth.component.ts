import {Component, DestroyRef, inject, OnDestroy} from '@angular/core';
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
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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

  private readonly userSub: Subscription | undefined;
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);


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
      this.authService.login(email, password).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          this.loading = false;
          this.authService.autoLogout(3600)
          this.router.navigate(["/notes"])
        }, error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.error = error?.error?.message || "Error Occurred";
        }
      })
    } else {
      this.authService.signup(email, password).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
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
