import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NzContentComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {ToolbarComponent} from './core/components/toolbar/toolbar.component';
import {AuthService} from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzLayoutComponent, ToolbarComponent, NzContentComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'notes-final-project';
  private readonly authService = inject(AuthService);

  ngOnInit() {
    this.authService.autoLogin()
  }
}
