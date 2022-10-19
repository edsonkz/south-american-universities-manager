import { Router } from "express";
import { UniversityController } from "./controller/UniversityController";

const router = Router();

const universityController = new UniversityController();

router.get("/universities/:id", universityController.findOne);
router.get("/universities", universityController.findAll);
//router.post("/articles", articleController.create);
//router.put("/articles/:id", articleController.update);
//router.delete("/articles/:id", articleController.delete);

export { router };
