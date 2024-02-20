const express = require('express');
require('../db')
const router = express.Router()   
const User = require('../models/userModel')
router.use(express.json())
const {registerController,loginController} =require('../controllers/authController')
const {requireSignIn,isAdmin} = require('../middleware/authMiddleware')

router.get('/about',requireSignIn,isAdmin,(req,res)=>{
    res.send('i am protected')
})
// router.get('/admin',requireSignIn,isAdmin,(req,res)=>{
//     res.status(200).send({ok:true})
// })

// router.put("/profile", requireSignIn, updateProfileController);

// //orders

// router.get("/braintree/token",braintreeTokenController)

// router.post("/braintree/payment", requireSignIn, braintreePaymentController);

// router.get("/orders", requireSignIn, getOrdersController);

// //all orders
// router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// // order status update
// router.put(
//   "/order-status/:orderId",
//   requireSignIn,
//   isAdmin,
//   orderStatusController
// );

router.post('/register',registerController)

router.post('/login',loginController)

router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

module.exports = router