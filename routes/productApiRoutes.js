const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const rbac = require("../middleware/rbacMiddleware");
const api = require("../controllers/productApiController");

router.get("/products", auth, rbac("read"), api.getAll);
router.post("/products", auth, rbac("create"), api.create);
router.put("/products/:id", auth, rbac("update"), api.update);
router.delete("/products/:id", auth, rbac("delete"), api.delete);

module.exports = router;
