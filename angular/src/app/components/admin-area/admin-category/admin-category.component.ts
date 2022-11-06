import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css'],
})
export class AdminCategoryComponent implements OnInit {
  public categories: CategoryModel[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private notifyService: NotifyService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.categories = await this.categoriesService.getAllCategories();
    } catch (err: any) {
      this.notifyService.error(err);
    }
  }
}
