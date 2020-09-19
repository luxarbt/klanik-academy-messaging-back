const router = require("express").Router();
const EmailController = require("../controllers/emailController");

/* Get requests */
router.get("/:email/:token", EmailController.confirmEmail);

module.exports = router;
