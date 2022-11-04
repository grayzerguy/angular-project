import express, { NextFunction, Request, Response } from "express";
import verifyAdmin from "../02-middleware/verify-admin";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import { CategoryModel } from "../03-models/category-model";
import logic from "../05-logic/categories-logic";

//להוסיף ולידציות

const router = express.Router();


router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        const categoryList = await logic.getAllCategories();
        response.json(categoryList);
    }
    
    catch (err: any) {
        next(err);
    }
});

router.get("/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const category = await logic.getOneCategory(_id);
        response.json(category);
    }
    catch (err: any) {
        next(err);
    }
});



router.post("/",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const category = new CategoryModel(request.body);
        const addedCategory = await logic.addCategory(category);
        response.status(201).json(addedCategory);
    }
    catch (err: any) {
        next(err);
    }


})

router.delete("/:_id",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await logic.deleteCategory(_id);
        response.json({ success: true, massage: "the category deleted" }).sendStatus(204);
    }
    catch (err: any) {

        next(err);

    }
});

router.put("/:_id", verifyAdmin ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = request.params._id;
        const category = new CategoryModel(request.body);
        const updatedCategory = await logic.updateCategory(category);
        response.json(updatedCategory);
    }
    catch (err: any) {
        next(err);
    }
});

export default router
