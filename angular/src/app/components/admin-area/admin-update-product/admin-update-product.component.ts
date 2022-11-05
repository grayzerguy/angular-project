import { CategoriesService } from './../../../services/categories.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/products-model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-update-product',
  templateUrl: './admin-update-product.component.html',
  styleUrls: ['./admin-update-product.component.css']
})
export class AdminUpdateProductComponent implements OnInit {
  public product: ProductModel;
  public categories: CategoryModel[];
  public imageDisplay: string | ArrayBuffer



  public productForm: FormGroup;
  public nameInput: FormControl;
  public priceInput: FormControl;
  public categoryInput: FormControl;
  public categoryInputName: FormControl;
  public imageInput: FormControl;

  @ViewChild("imageBox")
  public imageBoxWrapper: ElementRef<HTMLInputElement>;


  constructor(private activateRoute: ActivatedRoute,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private notifyService: NotifyService,

    private router: Router) { }

  async ngOnInit() {
    try {

      this.categories = await this.categoriesService.getAllCategories()
      const id = this.activateRoute.snapshot.params["id"];
      this.product = await this.productsService.getOneProduct(id);
      // const categoriesId: CategoryModel = this.activateRoute.snapshot.params["_id"];
      // this.category = await this.categoriesService.getOneCategory("categoriesId");


      this.nameInput = new FormControl(this.product.name, [Validators.required, Validators.minLength(3)]);//this.product.name validation
      this.priceInput = new FormControl(this.product.price);
      this.imageInput = new FormControl();
      this.categoryInput = new FormControl(this.product.categoryId._id);
      this.categoryInputName = new FormControl(this.product.categoryId.name);

      // console.log(this.product.categoryId)
      this.productForm = new FormGroup({
        nameInput: this.nameInput,
        priceInput: this.priceInput,
        categoryInput: this.categoryInput,
        imageInput: this.imageInput
      }

      );

    }
    catch (err: any) {
      this.notifyService.error(err)
    }

  }
  async update() {
    try {

      this.product._id,
        this.product.name = this.nameInput.value;
      this.product.price = this.priceInput.value;
      this.product.categoryId = this.categoryInput["value"];
      this.product.image = this.imageBoxWrapper.nativeElement.files[0];
      // this.product = this.productForm.value;
      // console.log(this.product.categoryId)
      await this.productsService.updateProduct(this.product);

      this.notifyService.success("product updated successfully")

      this.router.navigateByUrl("/store")
      
    }
    catch (err: any) {
      this.notifyService.error(err)
    }

  }
}
