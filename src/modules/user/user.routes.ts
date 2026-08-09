import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { User, UserRole } from "./user.model.js";
import { validate } from "../../middleware/validate.js";
import { createUserSchema } from "./dto/create-user.dto.js";
import { createUserController, deleteUserController, getAllUserController, getUserByIdController, updateSelfController, updateUserController } from "./user.controller.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import { updateSelfSchema, updateUserSchema } from "./user.validation.js";

const router = Router();

router.patch("/me", authenticate, validate(updateSelfSchema), updateSelfController);
router.post("/create", authenticate, authorize(UserRole.ADMIN), validate(createUserSchema), createUserController);
router.get("/getAll", authenticate, authorize(UserRole.ADMIN), getAllUserController);
router.get("/:id", authenticate, authorize(UserRole.ADMIN), getUserByIdController);
router.patch("/:id",authenticate, authorize(UserRole.ADMIN), validate(updateUserSchema), updateUserController);
router.delete("/:id",authenticate, authorize(UserRole.ADMIN), deleteUserController);

export default router;