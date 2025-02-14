const express = require("express");

const {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  addWorker,
  deleteWorker,
  getDepartmentByUser,
  deleteDepartmentCorse,
  addDepartmentCorse,
  addDepartmentMultipleCourses,
} = require("../Controllers/departmentController");
const { authenticateUser } = require("../Middlewares/Auth");

const router = express.Router();

router.get("/list", getAllDepartments);
router.get("/userDepartment", authenticateUser, getDepartmentByUser);
router.get("/:id", getDepartmentById);
router.post("/addWorker/:id", addWorker);
router.delete("/deleteWorker/:id", deleteWorker);
router.post("/addCorse/:id", addDepartmentCorse);
router.post("/addMultipleCourses/:id", addDepartmentMultipleCourses);
router.delete("/deleteCorse/:id", deleteDepartmentCorse);
router.post("/create", createDepartment);
router.put("/update/:id", updateDepartment);
router.delete("/delete/:id", deleteDepartment);

module.exports = router;
