import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category.model';
import { addCategoryAction, deleteCategoryAction, fetchCategoriesAction, updateCategoryAction } from '../redux/categories.state';
import store from '../redux/store';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  public async getAllCategories(): Promise<CategoryModel[]> {
    let categories = store.getState().CategoriesState.categories;
    if (categories.length === 0) {
      categories = await firstValueFrom(this.http.get<CategoryModel[]>(environment.categoriesUrl))
      store.dispatch(fetchCategoriesAction(categories))
    }
    return categories
  }

  public async getOneCategory(_id: string): Promise<CategoryModel> {
    let categories = await this.getAllCategories();
    const category = categories.find(c => c._id === _id);
    return category;
  }
  public async addCategory(category: CategoryModel): Promise<CategoryModel> {
    const formDate = new FormData();
    formDate.append("name", category.name);
    const addedCategory = await firstValueFrom(this.http.post<CategoryModel>(environment.categoriesUrl, formDate));
    //update in redux
    store.dispatch(addCategoryAction(addedCategory));
    return addedCategory
  }
  public async updateCategory(category: CategoryModel): Promise<CategoryModel> {
    const formDate = new FormData();
    formDate.append("name", category.name);
    const updatedCategory = await firstValueFrom(this.http.put<CategoryModel>(environment.categoriesUrl + category._id, formDate));
    //update in redux
    store.dispatch(updateCategoryAction(updatedCategory));
    return updatedCategory
  }
  public async deleteCategory(id: string): Promise<void> {
    await firstValueFrom(this.http.delete<void>(environment.categoriesUrl + id));
    //update in redux
    store.dispatch(deleteCategoryAction(id));
  }
}

