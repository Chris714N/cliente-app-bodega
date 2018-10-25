import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';
declare var $: any;


@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css'],
    providers: [UserService, UploadService]
})
export class EditUserComponent implements OnInit {
    public title: string;
    public status: boolean;
    public identity;
    public token;
    public statusMessage;
    public value;
    public filesToUpload: Array<File>;
    public url: string;
    @Input() user: User;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService
    ) {
        this.title = 'Actualizar mis datos';
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.value = '';
        this.statusMessage = '';
        this.status = true;
    }

    ngOnInit() {
        console.log('user-edit.component se ha cargado');
    }

    onSubmit(form) {
        // console.log(this.user);
        this._userService.updateUser(this.user).subscribe(
            response => {
                if (!response.user._id) {
                    this.status = false;
                    if (response.message !== '') {
                        this.statusMessage = response.message;
                    }
                } else {
                    this.status = true;
                    // console.log(this.user);
                    // Subir Imagen de Usuario
                    // tslint:disable-next-line:max-line-length
                    if (this.filesToUpload.length >= 1) {
                        // tslint:disable-next-line:max-line-length
                        this._uploadService.makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload, this.token, 'image')
                            .then((result: any) => {
                                this.user.image = result.user.image;
                                console.log(this.user);
                                this.filesToUpload = [];
                                this.value = '';
                            })
                            .catch((error: any) => {
                                this.statusMessage = error.message;
                                this.status = false;
                                console.log(error);
                                this.filesToUpload = [];
                                this.value = '';
                            });
                    }
                }
            },
            error => {
                const errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    console.log(errorMessage);
                    this.status = false;
                    this.statusMessage = error.message;
                    this.filesToUpload = [];
                }
            }
        );
    }



    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    uploadDesing() {
        this.value = document.getElementById('uploadBtn');
        this.value = this.value.files[0].name;
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
}
