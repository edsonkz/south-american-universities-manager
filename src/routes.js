import { Router } from "express";
import { UniversityController } from "./controllers/UniversityController";

const router = Router();

const universityController = new UniversityController();

router.get("/universities/:id", universityController.findOne);
router.get("/universities", universityController.findAll);
router.post("/universities", universityController.create);
//router.put("/articles/:id", articleController.update);
//router.delete("/articles/:id", articleController.delete);

export { router };
