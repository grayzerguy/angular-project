
import { IProductModel, ProductModel } from '../03-models/product-model';
import ErrorModel from "../03-models/error-model";
import multer from 'multer';
import { request } from 'express';
import fs from 'fs';


// getAllProducts
async function getAllProducts(): Promise<IProductModel[]> {
    // Get all products with virtual fields:
    return ProductModel.find().populate("categoryId").exec();
}
//get products by category 
async function getProductsByCategory(categoryId: string): Promise<IProductModel[]> {
    // Get all products with virtual fields:
    return ProductModel.find({ categoryId }).exec();
}

// getOneProduct
async function getOneProduct(_id: string): Promise<IProductModel> {
    // Get one products with virtual fields: 
    const product = await ProductModel.findById(_id).populate("categoryId").exec();
    if (!product) throw new ErrorModel(404, `_id ${_id} not found`);
    return product
}
// add  Products.
async function addProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    return product.save();
}
// UPDATE Products SET...
async function updateProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { new: true }).exec(); // returnOriginal: false --> return back the db product and not the product sent to the function.
    if (!updateProduct) throw new ErrorModel(404, `_id ${product._id} not found`);
    return updatedProduct;
}
//update partial product
// async function updatePartialProduct(product: IProductModel): Promise<IProductModel> {
//     const errors = product.validateSync();
//     if (errors) throw new ErrorModel(400, errors.message);
//     const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { new: true }).exec(); 
//     if (!updateProduct) throw new ErrorModel(404, `_id ${product._id} not found`);
//     return updatedProduct;

// }
// DELETE FROM Products...
async function deleteProduct(_id: string): Promise<void> {
    const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec();
    if (!deletedProduct) throw new ErrorModel(404, `_id ${_id} not found`);
}
// count all products
async function countProducts(): Promise<number> {
    return ProductModel.countDocuments().exec();
}
//get featured products only 
async function getFeaturedProducts(count: string): Promise<IProductModel[]> {
    if (!count) {
        return ProductModel.find({ isFeatured: true }).exec();
    }
    return ProductModel.find({ isFeatured: true }).populate("category").limit(+count).exec();
}
//get products by category when query string is sent
// select("name categoryId")>>>>????
async function getAllProductsByCategory(filter: {}): Promise<IProductModel[]> {
    const products = await ProductModel.find({ categoryId: filter }).populate("categoryId").select("name categoryId").exec();
    return products;
}






export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    countProducts,
    getFeaturedProducts,
    getAllProductsByCategory,
    getProductsByCategory

};
