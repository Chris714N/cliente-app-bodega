import { Component, OnInit, HostListener, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';



declare var $: any;


@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.css'],
    providers: [UserService]
})
export class ListUserComponent implements OnInit, DoCheck {
    public title: String;
    public users: User[];
    public statsUser: Array<{ user: User, totalStock: number, deliveredTotal: number, returned: number }> = [];
    public user: User;
    public editUser: User;
    public editUserState: boolean;
    public page;
    public pages;
    public widthDisplay;
    public total;
    public statusGet;
    public identity;
    public token;
    public url: string;
    public order: string;
    public showStats: boolean;
    public noMore = false;
    constructor(
        private _userService: UserService,

    ) {
        this.title = 'Gestion de usuarios';
        this.page = 1;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.order = '_id';
        this.user = new User('', '', '', '', '', '', '', '');
        this.editUserState = false;
        this.url = GLOBAL.url;
        this.showStats = false;
    }

    ngOnInit(): void {
        console.log('Componente list-user cargado correctamente!!!');
        this.widthDisplay = parseInt($('body').width(), 10);

        $('.ul-menu').on('click', function () {
            $('.ul-menu').toggleClass('active');
        });

        $('#button-edit').on('click', function () {
            $($(this).data('target')).modal('show');
        });

        // $('.botonF1').hover(function () {
        //     $('.btn-a').addClass('animacionVer');
        // });
        // $('.contenedor').mouseleave(function () {
        //     $('.btn-a').removeClass('animacionVer');
        // });

        this.status({ send: true });
        this.getUsers(1);
    }

    @HostListener('window:scroll', ['$event'])
    doSomethingOnInternalScroll($event) {
        const scrollY = $event.pageY;
        const heightContent = $('#contenido-user').height();
        const heightWindow = $(window).height();
        // console.log('ejeY: ' + scrollY);
        // console.log('heightContent: ' + heightContent);
        // console.log('heightWindow: ' + heightWindow);
        if ((heightContent - scrollY) === heightWindow) {
            this.viewMore();
        }

        if (this.page > 1 && scrollY > 100) {
            $('.btn-a').addClass('animacionVer');
        } else {
            $('.btn-a.btn-refresh').removeClass('animacionVer');
        }
    }

    ngDoCheck() {
        this.widthDisplay = parseInt($('body').width(), 10);
    }

    orderList(filter: string) {
        this.order = filter;
    }

    getUsers(page, adding = false) {
        this._userService.getUsers(page).subscribe(
            response => {
                if (response) {
                    this.pages = response.pages;
                    this.total = response.total;
                    if (!adding) {
                        this.users = response.users;
                        this.getStats(this.users);
                    } else {
                        const arrayA = this.users;
                        const arrayB = response.users;
                        this.users = arrayA.concat(arrayB);
                        const alt = $('#contenido-user').height();
                        // console.log(this.users);
                        this.getStats(this.users);
                    }
                } else {
                    this.statusGet = 'error';
                }
            },
            error => {
                const errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.statusGet = 'error';
                }
            }
        );
    }

    editUserForm(user) {
        this.editUser = user;
    }

    refresh() {
        this.page = 1;
        this.getUsers(1);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }


    deleteUser(_id) {
        // console.log(_id);
        this._userService.deleteUser(_id).subscribe(
            response => {
                if (response) {
                    // console.log(response);
                    this.refresh();
                    this.statusGet = 'success';
                } else {
                    this.statusGet = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    getStat(id, index) {

        this._userService.getCounters(id).subscribe(
            response => {
                const userStatArray = {user: this.users[index],
                    totalStock: response.stats.totalStock,
                    deliveredTotal: response.stats.deliveredTotal,
                    returned: response.stats.returned };
                this.statsUser[index] = userStatArray;
                console.log(this.statsUser[index]);
            }
        );
    }

    getStats(usersStats) {
        const nUsers = usersStats.length;

        let index = 0;
        const myTimeStats = setInterval(() => {

            const idUser = usersStats[index]._id;

            this.getStat(idUser, index);

            if (index === usersStats.length - 1) {
                clearInterval(myTimeStats);
            }
            index = index + 1;
        }, 80);

    }
    viewMore() {
        if (this.page === this.pages) {
            this.noMore = true;
        } else {
            this.page += 1;
            // console.log(this.page);
            this.getUsers(this.page, true);
        }
    }

    topFunction() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        // document.body.scrollTop = 0; // For Safari
        // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    status(event) {
        // console.log(event.send);
        // console.log($('body').width());
        const widthBody = parseInt($('body').width(), 10);
        if (widthBody >= 768) {
            // console.log('mayor a 768');
            if (event.send === true) {
                // console.log('aplicando contenido.small');
                $('#contenido-user').removeClass('contenido-user-full');
                $('#contenido-user').addClass('contenido-user-small');
            } else if (event.send === false) {
                console.log('aplicando contenido.full');
                $('#contenido-user').removeClass('contenido-user-small');
                $('#contenido-user').addClass('contenido-user-full');
            }
        } else {
            // console.log('menos a 768');
            if (event.send === true) {
                // console.log('aplicando contenido.small');
                $('#contenido-user').removeClass('contenido-user-full');
                $('#contenido-user').addClass('contenido-user-small');
            } else if (event.send === false) {
                // console.log('aplicando contenido.full');
                $('#contenido-user').removeClass('contenido-user-small');
                $('#contenido-user').addClass('contenido-user-full');
            }
        }
    }
}
