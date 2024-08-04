const express=require('express');
const admincontroler = require('../controllers/admin-controller');
const authMiddleware=require("../middleware/auth-middleware");
const adminMiddleware = require('../middleware/admin-middleware');
const router =express.Router();

router.route("/users").get(authMiddleware,adminMiddleware, admincontroler.getallusers)
router.route("/users/:id").get(authMiddleware,adminMiddleware, admincontroler.getuserbyid)
router.route("users/update/:id").patch(authMiddleware,adminMiddleware, admincontroler.updateuserbyid)
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware, admincontroler.deleteuserbyid)
router.route("/contact").get(authMiddleware,adminMiddleware,admincontroler.getallcontacts);
router.route("/contact/delete/:id").delete(authMiddleware,adminMiddleware, admincontroler.deletecontactbyid)



module.exports=router;