import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddEditProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'products-managment-app';
}
