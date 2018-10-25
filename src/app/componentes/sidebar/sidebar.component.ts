import { Component, OnInit, DoCheck, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
declare var $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    providers: [UserService]
})
export class SidebarComponent implements OnInit, DoCheck {
    public identity: string;
    public url: string;
    @Output() sended = new EventEmitter();
    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.url = GLOBAL.url;
    }

    ngOnInit(): void {
        console.log('Sidebar Cargado correctamente');
        this.identity = this._userService.getIdentity();
        console.log(this.identity);
        $(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
        });
    }

    sendPublication(event) {
        const estado = $('#sidebar').hasClass('active');
        console.log(estado);
        this.sended.emit({ send: estado });
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
