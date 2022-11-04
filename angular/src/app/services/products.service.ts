import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../models/products-model';
import { firstValueFrom } from 'rxjs';
import store from '../redux/store';
import { addProductAction, deleteProductAction, fetchProductsAction, updateProductAction } from '../redux/products.state';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {



  constructor(private http: HttpClient) { }



  public async getAllProducts(): Promise<ProductModel[]> {
    // let params = new HttpParams();
    // if (selectedCategory) {
    //   params = params.append("category", selectedCategory);
    //   console.log(params);
    // }
    let products = store.getState().productsState.products;

    //check if the products are in the redux store
    if (products.length === 0) {
      products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsUrl));
      //update in redux
      store.dispatch(fetchProductsAction(products))
    }
    return products
  }
  public async getOneProduct(id: string): Promise<ProductModel> {
    let products = await this.getAllProducts();
    const product = products.find(p => p._id === id);
    return product;
  }
  //products by category
  public async getProductsByCategory(categoryId: string): Promise<ProductModel[]> {
    let productsByCategory = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsUrl + "category/" + categoryId));
    // store.dispatch(fetchProductsAction(productsByCategory));//we don't need to update the redux store because when we go to admin products we wont get all the products
    return productsByCategory
  }
  public async addProduct(product: ProductModel): Promise<ProductModel> {
    //convert product to form data and send it to the server
    //we need to convert the number  to string
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("categoryId", product.categoryId.toString());
    // formData.append("imageUrl", product.imageUrl);
    formData.append("image", product.image);

    const addedProduct = await firstValueFrom(this.http.post<ProductModel>(environment.productsUrl, formData));
    //update in redux
    store.dispatch(addProductAction(addedProduct));
    //update the server
    return addedProduct
  }
  public async updateProduct(product: ProductModel): Promise<ProductModel> {
    //convert product to form data and send it to the server
    const formData = new FormData();
    formData.append("id", product._id);
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("categoryId", product.categoryId.toString());
    formData.append("image", product.image);
    const updatedProduct = await firstValueFrom(this.http.put<ProductModel>(environment.productsUrl + product._id, formData));

    store.dispatch(updateProductAction(updatedProduct));

    return updatedProduct
  }
  //delete product
  public async deleteProduct(id: string): Promise<void> {
    await firstValueFrom(this.http.delete<void>(environment.productsUrl + id))
    store.dispatch(deleteProductAction(id));
  }
  public async countProducts(): Promise<number> {
    return await firstValueFrom(this.http.get<number>(environment.productsUrl + "count"))
  }

}





