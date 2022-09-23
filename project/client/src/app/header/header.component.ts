import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { autoSignout } from '../store/auth/auth.action';
import { isAuthticated } from '../store/auth/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: Observable<boolean> | undefined
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthticated)
  }
  onSignout(event: Event) {
    event.preventDefault()
    this.store.dispatch(autoSignout())
  }
}
