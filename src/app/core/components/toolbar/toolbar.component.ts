import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzPageHeaderComponent, NzPageHeaderExtraDirective, NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzSpaceComponent, NzSpaceItemDirective, NzSpaceModule} from 'ng-zorro-antd/space';
import {NzButtonComponent, NzButtonModule} from 'ng-zorro-antd/button';
import {NzDescriptionsComponent, NzDescriptionsItemComponent, NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzStatisticModule} from 'ng-zorro-antd/statistic';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Note} from '../../../models/note.module';
import {NoteService} from '../../../services/note.service';
import {RouterLink} from '@angular/router';
import {NoteSearchComponent} from '../../../note/note-search/note-search.component';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-toolbar',
  imports: [
    NzPageHeaderExtraDirective,
    NzSpaceComponent,
    NzPageHeaderComponent,
    NzSpaceItemDirective,
    NzButtonComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzButtonModule,
    NzDescriptionsModule,
    NzGridModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzStatisticModule,
    NzTagModule,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    NoteSearchComponent
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private userSub: Subscription | undefined;
  isAuthenticated = false;

  constructor(private authService: AuthService) {
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe({
        next: user => {
          console.log(user)
          this.isAuthenticated = !!user;
        }
      }
    )
  }

  logout(): void {
    this.authService.logout();
  }

}
