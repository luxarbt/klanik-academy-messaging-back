const router = require("express").Router();
const auth = require("../middleware/auth");
const UserController = require("../controllers/userController");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/tokenIsValid", UserController.tokenIsValid);

/* Get requests */
router.get("/", auth, UserController.getUser);
router.get("/user", UserController.getUserData);
router.get("/all", UserController.getAllUsers);

module.exports = router;
