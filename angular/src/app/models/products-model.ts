
import { CategoryModel } from "./category.model";

export class ProductModel {
  public _id: string;
  public name: string;
  public price: number;
  public categoryId?: CategoryModel
  public image: File;
  public imageUrl: string;
  public cloudinary_id: string;
  // public categoryId?: string;
  // public category?: CategoryModel;


}
