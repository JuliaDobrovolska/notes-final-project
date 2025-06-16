import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NzContentComponent, NzFooterComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {ToolbarComponent} from './components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzLayoutComponent, ToolbarComponent, NzContentComponent, NzFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'notes-final-project';
}
