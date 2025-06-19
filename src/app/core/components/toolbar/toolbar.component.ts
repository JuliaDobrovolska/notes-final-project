import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NzPageHeaderComponent, NzPageHeaderExtraDirective, NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzSpaceComponent, NzSpaceItemDirective, NzSpaceModule} from 'ng-zorro-antd/space';
import {NzButtonComponent, NzButtonModule} from 'ng-zorro-antd/button';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzStatisticModule} from 'ng-zorro-antd/statistic';
import {NzTagModule} from 'ng-zorro-antd/tag';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NoteSearchComponent} from '../../../note/note-search/note-search.component';
import {Subscription} from 'rxjs';
import {AuthService, User} from '../../../auth/services/auth.service';
import {NgIf} from "@angular/common";
import {NoteSearchService} from '../../../note/note-search/note-search.service';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzPopoverDirective} from 'ng-zorro-antd/popover';

@Component({
  selector: 'app-toolbar',
  imports: [
    NzAvatarModule,
    NzPageHeaderExtraDirective,
    NzSpaceComponent,
    NzPageHeaderComponent,
    NzSpaceItemDirective,
    NzButtonComponent,
    NzButtonModule,
    NzDescriptionsModule,
    NzGridModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzStatisticModule,
    NzTagModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    NoteSearchComponent,
    NgIf,
    NzPopoverDirective
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit, OnDestroy {

  protected readonly noteSearchService = inject(NoteSearchService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  private userSub: Subscription | undefined;
  isAuthenticated = false;
  user: User | null | undefined;


  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe({
        next: user => {
          console.log("user", user);
          this.isAuthenticated = !!user?.token;
          this.user = user;
        }
      }
    )
  }

  logout(): void {
    this.authService.logout();
  }

  navigateToMainMenu() {
    this.noteSearchService.clearSearchTerm();
    this.router.navigate(['/notes']);
  }
}
