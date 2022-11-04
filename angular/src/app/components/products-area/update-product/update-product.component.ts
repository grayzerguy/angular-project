
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/models/products-model';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  public product: ProductModel;

  public productForm: FormGroup;
  public nameInput: FormControl;
  public priceInput: FormControl;
  public imageInput: FormControl;

  @ViewChild("imageBox")
  public imageBoxWrapper: ElementRef<HTMLInputElement>;

  constructor(private activateRoute: ActivatedRoute,
    private productsService: ProductsService,
    private notifyService: NotifyService,

    private router: Router) { }

  async ngOnInit() {
    try {
      const id = this.activateRoute.snapshot.params["id"];
      this.product = await this.productsService.getOneProduct(id);

      this.nameInput = new FormControl(this.product.name, [Validators.required, Validators.minLength(3)]);//this.product.name validation
      this.priceInput = new FormControl(this.product.price);
      this.imageInput = new FormControl(this.product.image);
      this.productForm = new FormGroup({
        nameInput: this.nameInput,
        priceInput: this.priceInput,
        imageInput: this.imageInput
      });
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
      this.product.image = this.imageBoxWrapper.nativeElement.files[0];
      // this.product = this.productForm.value;

      await this.productsService.updateProduct(this.product);

      console.log(this.product);
      this.notifyService.success("product updated successfully")

      this.router.navigateByUrl("/store")



    }
    catch (err: any) {
      this.notifyService.error(err)
    }

  }
}
