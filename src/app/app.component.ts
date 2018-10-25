import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './services/global';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
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

  status(event) {
    // console.log(event.send);
    console.log($('body').width());
    const widthBody = parseInt($('body').width(), 10);
    if (widthBody >= 768) {
      console.log('mayor a 768');
      if (event.send === true) {
        console.log('aplicando contenido.small');
        $('#contenido-app').removeClass('contenido-app-full');
        $('#contenido-app').addClass('contenido-app-small');
      } else if (event.send === false) {
        console.log('aplicando contenido.full');
        $('#contenido-app').removeClass('contenido-app-small');
        $('#contenido-app').addClass('contenido-app-full');
      }
    } else {
      console.log('menos a 768');
      if (event.send === true) {
        console.log('aplicando contenido.small');
        $('#contenido-app').removeClass('contenido-app-full');
        $('#contenido-app').addClass('contenido-app-small');
      } else if (event.send === false) {
        console.log('aplicando contenido.full');
        $('#contenido-app').removeClass('contenido-app-small');
        $('#contenido-app').addClass('contenido-app-full');
      }
    }
  }
}
