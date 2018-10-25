import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock';

declare var $: any;


@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.css'],
    providers: [UserService, StockService]
})
export class InventoryComponent implements OnInit {
    public title: String;
    public products: Stock;
    public page;
    public statusGet;
    public identity;
    public token;
    public url: string;
    public order: string;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _stockService: StockService

    ) {
        this.title = 'Inventory';
        this.page = 1;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.order = 'code';
     }

    ngOnInit(): void {
        console.log('Componente inventory cargado correctamente!!!');
        this.status({send: true});
        this.getProducts(1);
     }

     getProducts(page) {
        this._stockService.getStock(this.token, page, '' ).subscribe(
            response => {
                if (response) {
                    console.log(response);
                    this.products = response.products;
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


     status(event) {
        // console.log(event.send);
       const widthBody = parseInt($('body').width(), 10);
        if (widthBody >= 768) {
            // console.log('mayor a 768');
            if (event.send === true) {
                // console.log('aplicando contenido.small');
                $('#contenido-inventory').removeClass('contenido-inventory-full');
                $('#contenido-inventory').addClass('contenido-inventory-small');
            } else if (event.send === false) {
                console.log('aplicando contenido.full');
                $('#contenido-inventory').removeClass('contenido-inventory-small');
                $('#contenido-inventory').addClass('contenido-inventory-full');
            }
        } else {
            // console.log('menos a 768');
            if (event.send === true) {
                // console.log('aplicando contenido.small');
                $('#contenido-inventory').removeClass('contenido-inventory-full');
                $('#contenido-inventory').addClass('contenido-inventory-small');
            } else if (event.send === false) {
                // console.log('aplicando contenido.full');
                $('#contenido-inventory').removeClass('contenido-inventory-small');
                $('#contenido-inventory').addClass('contenido-inventory-full');
            }
        }
    }
}
