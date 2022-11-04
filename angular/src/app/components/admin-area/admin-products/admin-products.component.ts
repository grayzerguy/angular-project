import { Component,  OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/products-model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {


  public products: ProductModel[]=[];
  // subscription: Subscription;

  constructor(private productsService: ProductsService,
    private notifyService: NotifyService) { }


  async filter(query: string) {
    // console.log(query);
    if (query) {
      this.products = this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    }
    else {
      this.products = await this.productsService.getAllProducts();
    }


  }

  async ngOnInit() {
    try {
      this.products = await this.productsService.getAllProducts();

    }
    catch (err: any) {
      this.notifyService.error(err)
    }
  }

}
