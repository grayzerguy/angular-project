import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/products-model';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: ProductModel[] = [];
  public categories: CategoryModel[] = [];
  public category: string;
  

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService,
    private notifyService: NotifyService, private route: ActivatedRoute ,private cartService : CartService
  ) { }

  async ngOnInit() {
    try {
      this.categories = await this.categoriesService.getAllCategories();
      this.products = await this.productsService.getAllProducts();     
    }
    catch (err: any) {
      this.notifyService.error(err)
    }
  }
  async onCategoryChange(category: string) {
    this.category = category;
    this.products = await this.productsService.getProductsByCategory(category);
    

  }
  async showAllProducts() {
    //get all products
    this.products = await this.productsService.getAllProducts();
    // console.log(this.products)
    this.category = null;
  }

  async filter(query: string) {
    // console.log(query);
    if (query) {
      this.products = this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
 

          }
    else {
      this.products = await this.productsService.getAllProducts();
    }


  }
}




