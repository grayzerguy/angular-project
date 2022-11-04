import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/products-model';
import { environment } from 'src/environments/environment';
import { __values } from 'tslib';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public productImage = environment.productsUrl
  public product: ProductModel;

  constructor(private activatedRout: ActivatedRoute,
    private productsService: ProductsService,
    private notifyService: NotifyService,
    private router: Router) { }

  //default category is "all"


  async ngOnInit() {

    try {
      const id  = this.activatedRout.snapshot.params["id"];
      this.product = await this.productsService.getOneProduct(id);

    }
    catch (err: any) {
      this.notifyService.error(err)
    }
  }
  async deleteProduct() {

    try {

      const ok = window.confirm("Are you sure you want to delete this product?");
      if (!ok) return;

      await this.productsService.deleteProduct(this.product._id);

      this.notifyService.success("product deleted successfully")
      this.router.navigateByUrl("/store")

    }
    catch (err: any) {
      this.notifyService.error(err)
    }
  }

}
