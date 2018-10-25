import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-navbar',
  templateUrl: '../navbar/navbar.component.html',
  providers: [UserService]
})
export class NavbarComponent implements OnInit, DoCheck {
  public title: string;
  public identity: string;
  public url: string;
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'App-Bodega-v1';
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }
}
