const router = require("express").Router();
const orderController = require("../controller/order");

/* order crud */
router.post("/createOrder", orderController.createOrder);
router.post("/update/:id", orderController.updateOrder);
router.get("/list", orderController.list);
router.get("/search", orderController.search); 
router.delete("/delete/:id", orderController.deleteOrder); 

module.exports = router;