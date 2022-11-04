import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/products-model';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  public product = new ProductModel();
  // public categories: CategoryModel[];
  public categories: CategoryModel[];
  public id = this.route.snapshot.paramMap.get("id");
  //bind the file input to a variable(fileInput)
  public imageDisplay: string | ArrayBuffer;
  @ViewChild("imageBox")
  public imageBoxWrapper: ElementRef<HTMLInputElement>;

  constructor(private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private notifyService: NotifyService) {
    // let id = this.route.snapshot.paramMap.get("id");
    if (this.id) this.productsService.getOneProduct(this.id).then(p => this.product = p);
  }



  async ngOnInit() {

    try {
      this.categories = await this.categoriesService.getAllCategories()


    }
    catch (err: any) {
      alert(err.message);
    }

  }
  async onImageUpload(event: any) {
    const file = event.target.files[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
    else {
      this.imageDisplay = null;
    }

  }
  async add() {
    try {
      this.product.image = this.imageBoxWrapper.nativeElement.files[0];
      if (this.id) {
        await this.productsService.updateProduct(this.product);
        this.notifyService.success("Product updated successfully");

      }
      else {
        await this.productsService.addProduct(this.product);
        // c
        this.notifyService.success("product added successfully")
        await (await this.categoriesService.getAllCategories()).toString();
        // return addedProduct

      }
      this.router.navigateByUrl("/admin/products");
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
      this.router.navigateByUrl("/admin/products")
    }
    catch (err: any) {
      this.notifyService.error(err)
    }
  }

}




//
//
//

//
//
//       this.notifyService.success("product added successfully")

//       const categories = await (await this.categoriesService.getAllCategories( )).toString();
//       console.log(this.categories)



//       // console.log(this.product);

//       //redirect to products list
//       // window.location.href = "/store"--->bad practice
//       this.router.navigateByUrl("/store")

//     }
//     catch (err: any) {
//       this.notifyService.error(err)

//     }

//   }
// }




//   ngOnInit(): void {
//   }

// }
