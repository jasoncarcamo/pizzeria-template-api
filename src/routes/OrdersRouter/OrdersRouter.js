const express = require("express");
const OrdersRouter = express.Router();
const OrdersService = require("./OrdersService");

OrdersRouter
    .route("/orders")
    .get((req,res)=>{
        OrdersService.getUserOrder(req.app.get("db"), req.user.id)
            .then( order => {
                if(!order){

                    return res.status(404).json({
                        error: `No order found for user: ${req.user.id}`
                    });
                };

                return res.status(200).json({
                    order: {
                        id: order.id,
                        orderType: order.ordertype,
                        address: order.address,
                        mobilenumber: order.mobilenumber,
                        orderComplete: order.ordercomplete,
                        time: order.time,
                        dateCreated: order.datecreated,
                        userid: order.userid
                    }
                });
            });
    })
    .post((req, res)=>{
        const {
            orderType,
            address,
            mobileNumber,
            orderComplete,
            time
        } = req.body;

        const newOrder = {
            ordertype: orderType,
            address,
            mobilenumber: mobileNumber,
            ordercomplete: orderComplete,
            time,
            userid: req.user.id
        };

        for( const [key, value] of Object.entries( newOrder)){
            if( value === undefined){

                return res.status(400).json({
                    error: `Missing ${key} in body request`
                });
            };
        };

        OrdersService.createOrder( req.app.get("db"), newOrder)
            .then( createdOrder => {

                return res.status(200).json({
                    createdOrder: {
                        id: createdOrder.id,
                        orderType: createdOrder.ordertype,
                        address: createdOrder.address,
                        mobileNumber: createdOrder.mobilenumber,
                        orderComplete: createdOrder.ordercomplete,
                        time: createdOrder.time,
                        dateCreated: createdOrder.datecreated,
                        userId: createdOrder.userid
                    }
                });
            })
    })

OrdersRouter
    .route("/orders/:id")
    .patch((req, res)=> {
        console.log(req.params.id);
        OrdersService.getOrder( req.app.get("db"), req.params.id)
            .then( order => {

                if(!order){

                    return res.status(404).json({
                        error: "Order does not exist."
                    });
                };

                OrdersService.updateOrder( req.app.get("db"), req.body, req.params.id)
                    .then( updatedOrder => {

                        return res.status(200).json({
                            updatedOrder
                        });
                    });
            });
    })
    .delete((req,res)=>{
        OrdersService.getOrder(req.app.get("db"), req.params.id)
            .then( order => {
                if(!order){

                    return res.status(404).json({
                        error: `Order: ${req.params.id} was not found`
                    });
                };

                OrdersService.deleteOrder(req.app.get("db"), req.params.id)
                    .then( deletedOrder => {

                        return res.status(200).json({
                            success: `Order: ${req.params.id} has been deleted.`
                        });
                    });
            });
    });

module.exports = OrdersRouter;