import { Router } from "express";
import { UniversityController } from "./controllers/UniversityController";

const router = Router();

const universityController = new UniversityController();

router.get("/universities/:id", universityController.findOne);
router.get("/universities", universityController.findAll);
router.post("/universities", universityController.create);
router.put("/universities/:id", universityController.update);
router.delete("/universities/:id", universityController.delete);

export { router };
