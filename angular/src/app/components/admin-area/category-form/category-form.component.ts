import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent {
  public category = new CategoryModel();

  constructor(
    private categoriesService: CategoriesService,
    private notifyService: NotifyService,
    private router: Router
  ) {}

  async add() {
    try {
      await this.categoriesService.addCategory(this.category);
      this.notifyService.success('Category added successfully');
      //go back to the categories list
    } catch (err: any) {
      this.notifyService.error(err);
    }
    this.router.navigateByUrl('/admin/category');
  }
}
