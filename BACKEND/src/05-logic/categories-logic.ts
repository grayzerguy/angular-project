import { CategoryModel, ICategoryModel } from "../03-models/category-model";
import ErrorModel from "../03-models/error-model";



// SELECT * FROM Category
async function getAllCategories(): Promise<ICategoryModel[]> {
    
    return CategoryModel.find().exec();

}
// Get one category without virtual fields:
async function getOneCategory(_id: string): Promise<ICategoryModel> {

    const category = await CategoryModel.findById(_id).exec();
    if (!category) throw new ErrorModel(404, `_id ${_id} not found`);
    return category
}
//INSERT INTO categories..
async function addCategory(category: ICategoryModel): Promise<ICategoryModel> {
    const errors = category.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    return category.save();
}
async function deleteCategory(_id: string): Promise<void> {
    const deletedCategory = await CategoryModel.findByIdAndDelete(_id).exec();
    if (!deletedCategory) throw new ErrorModel(404, `_id ${_id} not found`);
}
//#update category
async function updateCategory(category: ICategoryModel): Promise<ICategoryModel> {
    const errors = category.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    const updatedCategory = await CategoryModel.findByIdAndUpdate(category._id, category, { returnOriginal: false }).exec(); // returnOriginal: false --> return back the db Category and not the Category sent to the function.
    if (!updateCategory) throw new ErrorModel(404, `_id ${category._id} not found`);

    return updatedCategory;
}


export default {

    getAllCategories,
    addCategory,
    deleteCategory,
    getOneCategory,
    updateCategory
}


