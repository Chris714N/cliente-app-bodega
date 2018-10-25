import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
declare var $: any;


@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css'],
    providers: [UserService]
})
export class AddUserComponent implements OnInit {
    public title: String;
    public user: User;
    public identity;
    public token;
    public url: string;
    public status: boolean;
    public statusMessage: String;
    public loading: boolean;
    constructor(
        private _userService: UserService,

    ) {
        this.title = 'Gestion de usuarios';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = new User('', '', '', '', '', '', '', '');
        this.url = GLOBAL.url;
        this.status = true;
        this.loading = false;
    }

    ngOnInit(): void {
        console.log('Componente add-user cargado correctamente!!!');
    }

    focus(name: string) {
        if (name === 'name') {
            $('#name-alert').slideDown();
        }
        if (name === 'surname') {
            $('#surname-alert').slideDown();
        }
        if (name === 'nick') {
            $('#nick-alert').slideDown();
        }
        if (name === 'email') {
            $('#email-alert').slideDown();
        }
        if (name === 'password') {
            $('#password-alert').slideDown();
        }
    }

    focusOut(name: string) {
        if (name === 'name') {
            $('#name-alert').slideUp();
        }
        if (name === 'surname') {
            $('#surname-alert').slideUp();
        }
        if (name === 'nick') {
            $('#nick-alert').slideUp();
        }
        if (name === 'email') {
            $('#email-alert').slideUp();
        }
        if (name === 'password') {
            $('#password-alert').slideUp();
        }
    }



    onSubmit(form) {
        this.loading = true;
        $('#btn-add-user').prop('disabled', true);
        this._userService.register(this.user).subscribe(
            response => {
                if (response.user && response.user._id) {
                    // console.log(response.user);
                    form.reset();
                    this.status = true;
                    this.loading = false;
                    this.topFunction();
                } else {
                    this.status = false;
                    if (response.message !== '') {
                        this.statusMessage = response.message;
                    }
                    $('#btn-add-user').prop('disabled', false);
                    this.loading = false;
                    this.topFunction();
                }
            },
            error => {
                console.log(<any>error);
                this.status = false;
                this.statusMessage = error;
                $('#btn-add-user').prop('disabled', false);
                this.loading = false;
                this.topFunction();
            }
        );
    }

    topFunction() {
        $('.modal').animate({
            scrollTop: 0
        }, 500);
    }
}
