const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const rbac = require("../middleware/rbacMiddleware");
const product = require("../controllers/productController");

router.get("/", auth, rbac("read"), product.list);
router.get("/create", auth, rbac("create"), product.createForm);
router.post("/create", auth, rbac("create"), product.create);
router.get("/edit/:id", auth, rbac("update"), product.editForm);
router.post("/edit/:id", auth, rbac("update"), product.update);
router.get("/delete/:id", auth, rbac("delete"), product.delete);

module.exports = router;
