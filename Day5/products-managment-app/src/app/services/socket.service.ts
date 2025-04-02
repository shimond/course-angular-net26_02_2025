import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { Product } from '../model/product.model';
@Injectable({
    providedIn: 'root'
})
export class SocketService {

    private readonly hubUrl = "https://localhost:7296/products-hub";
    
    #productAdded = new Subject<Product>();
    #productChanged = new Subject<Product>();
    #productDeleted = new Subject<number>();

    productAdded$ = this.#productAdded.asObservable();
    productChanged$ = this.#productChanged.asObservable();
    productDeleted$ = this.#productDeleted.asObservable();


    #connection: signalR.HubConnection | null = null;

    constructor() {
        this.connect();
    }

    async connect() {
        this.#connection = new signalR.HubConnectionBuilder()
            .withUrl(this.hubUrl)
            .withAutomaticReconnect()
            .build();

        await this.#connection.start();
        this.#connection.on("ProductChanged", (product) => {
            console.log(product);
            this.#productChanged.next(product);
        });

        this.#connection.on("ProductAdded", (product) => {
            console.log(product);
            this.#productAdded.next(product);

        });

        this.#connection.on("ProductDeleted", (id) => {
            console.log(id);
            this.#productDeleted.next(id);
        });
    }
}
