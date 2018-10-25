import { Component, OnInit } from '@angular/core';
import { ENETDOWN } from 'constants';
import { withBody } from '@angular/core/testing';
declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public title: string;
    constructor() {
        this.title = 'App Gestión Inventario!';
     }

    ngOnInit() {
        console.log('El componente Home cargo correctamente');
     }
}
