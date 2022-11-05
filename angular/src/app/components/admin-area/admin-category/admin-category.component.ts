import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent {

  public category = new CategoryModel();

  constructor(private categoriesService : CategoriesService ,private notifyService: NotifyService ) { }

  async add() {
    try {
  
      await this.categoriesService.addCategory(this.category);
      return this.notifyService.success("Category added successfully");

      }
  
    catch (err: any) {
      this.notifyService.error(err)
    }
  }
}
  


