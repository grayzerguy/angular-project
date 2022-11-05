import express, { NextFunction, Request, Response } from "express";
import { UserModel } from "../03-models/user-model";
import logic from "../05-logic/user-logic";
import authLogic from "../05-logic/auth-logic";
import verifyLoggedIn from '../02-middleware/verify-logged-in';
import verifyAdmin from '../02-middleware/verify-admin';
import { token } from "morgan";


//להוסיף ולידציות


const router = express.Router();


//get all users

router.get("/",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {

        const userList = await logic.getAllUsers();
        response.json(userList);
    }
    catch (err: any) {
        next(err);
    }
});

//get one user
router.get("/:_id",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const user = await logic.getOneUser(_id);
        response.json(user);
    }
    catch (err: any) {
        next(err);
    }
}
);

// add user
router.post("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await authLogic.register(user);
        response.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    }
})

router.put("/:_id", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {

    try {
        request.body._id = request.params._id;
        const user = new UserModel(request.body);
        const updatedUser = await logic.updateUser(user);
        response.json(updatedUser);
    }
    catch (err: any) {
        next(err);
    }
});


//Login user
router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const loggedUser = await authLogic.login(user);
        response.json(loggedUser);
    }
    catch (err: any) {
        next(err);
    }
}
);

router.get("/get/count", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await logic.countUsers();
        response.json(users);
    }
    catch (err: any) {
        next(err);
    }
});




export default router
