const express = require("express");
const OrderItemsRouter = express.Router();
const OrderItemsService = require("./OrderItemsService");

OrderItemsRouter
    .route("/orderitems")
    .get((req, res)=>{

        return res.status(200).json({
            working: "Success"
        })
    })
    .post((req, res)=>{
        const {
            category,
            title,
            description,
            specialRequests,
            sizeReg,
            sizeSmall,
            priceReg,
            priceSmall,
            ingredients,
            quantity,
            orderId
        } = req.body;

        const newItem = {
            category,
            title,
            description,
            specialrequests: specialRequests === undefined ? "No requests" : specialRequests,
            sizereg: sizeReg,
            sizesmall: sizeSmall,
            pricereg: priceReg,
            pricesmall: priceSmall,
            ingredients,
            quantity,
            orderid: orderId
        };

        for( const [key, value] of Object.entries(newItem)){
            if(value === undefined){

                return res.status(400).json({
                    error: `Missing ${key} from body request`
                });
            };
        };

        OrderItemsService.createItem( req.app.get("db"), newItem)
            .then( createdItem => {

                return res.status(200).json({
                    createdItem: {
                        category: createdItem.category,
                        title: createdItem.title,
                        description: createdItem.description,
                        sizeReg: createdItem.sizereg,
                        sizeSmall: createdItem.sizesmall,
                        priceReg: createdItem.pricereg,
                        priceSmall: createdItem.pricesmall,
                        ingredients: createdItem.ingredients,
                        quantity: createdItem.quantity,
                        orderId: createdItem.orderid
                    }
                });
            });
    });

OrderItemsRouter
    .route("/orderitems/:id")
    .patch((req, res)=> {

        const {
            category,
            title,
            description,
            specialRequests,
            sizeReg,
            sizeSmall,
            priceReg,
            priceSmall,
            ingredients,
            quantity,
            orderId
        } = req.body;

        const updateItem = {
            category,
            title,
            description,
            specialrequests: specialRequests === undefined ? "No requests" : specialRequests,
            sizereg: sizeReg,
            sizesmall: sizeSmall,
            pricereg: priceReg,
            pricesmall: priceSmall,
            ingredients,
            quantity,
            orderid: orderId
        };

        OrderItemsService.getItem( req.app.get("db"), req.params.id)
            .then( item => {
                
                if(!item){

                    return res.status(404).json({
                        error: "Menu item does not exist"
                    });
                };

                OrderItemsService.updateItem( req.app.get("db"), updateItem, req.params.id)
                    .then( updatedItem => {

                        return res.status(200).json({
                            updatedItem
                        });
                    });
            });
    })
    .delete((req, res)=>{
        OrderItemsService.getItem(req.app.get("db"), req.params.id)
            .then( orderItem => {
                if(!orderItem){

                    return res.ststaus(404).json({
                        error: `Order item: ${req.params.id} was not found`
                    });
                };

                OrderItemsService.deleteItem(req.app.get("db"), req.params.id)
                    .then( deletedItem => {

                        return res.status(200).json({
                            success: `Order item: ${req.params.id} has been deleted.`
                        });
                    });
            });
    });

OrderItemsRouter
    .route("/orderitems/order/:orderId")
    .get((req, res)=>{
        
        OrderItemsService.getOrderItems(req.app.get("db"), req.params.orderId)
            .then( orders => {

                if(!orders){

                    return res.status(404).json({
                        error: `No order items found for order: ${req.params.orderId}`
                    });
                };

                return res.status(200).json({
                    orders: OrderItemsService.formatItems(orders)
                });
            });
    });

module.exports= OrderItemsRouter;