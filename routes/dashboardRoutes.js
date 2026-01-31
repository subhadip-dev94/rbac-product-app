const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const dashboard = require("../controllers/dashboardController");

router.get("/admin", auth, dashboard.admin);
router.get("/manager", auth, dashboard.manager);
router.get("/employee", auth, dashboard.employee);

module.exports = router;
