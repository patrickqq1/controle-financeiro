import express from 'express';
import { createFinancs, deleteFinancs, editFinancs, financsSoma, insertSaldoDiario, minusSoma, renderBalance, renderFinancs } from '../controllers/financController.js';
import { createGoal, deleteGoal, removeGoal, renderGoal, updateGoal } from '../controllers/goalController.js';
import { createUser, getUserData } from '../controllers/usersController.js';
import { userValidation } from '../middlewares/valdidateToken.js';

const router = express.Router();
router.post("/post/user", createUser);
router.post("/post/login", getUserData);
router.use(userValidation);
router.post("/registerfinanc", createFinancs);
router.post("/post/goals", createGoal);
router.get("/get/balance", renderBalance);
router.get("/get/diarybalance", insertSaldoDiario);
router.get("/get/goals", renderGoal);
router.put("/put/goals/add/:id", updateGoal);
router.put("/put/editfinancs/:id", editFinancs);
router.put("/put/goals/remove/:id", removeGoal);
router.get("/get/renderFinancs", renderFinancs);
router.delete("/delete/financs/:id", deleteFinancs);
router.delete("/delete/goals/:id", deleteGoal);
router.get("/financssoma", financsSoma);
router.get("/minussoma", minusSoma);

export default router;
