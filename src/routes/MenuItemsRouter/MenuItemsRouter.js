const express = require("express");
const MenuItemsRouter = express.Router();
const MenuItemsService = require("../../Services/MenuItemsService/MenuItemsService");
const {requireAuth} = require("../../middleware/jwtAuth");

MenuItemsRouter
    .route("/menu_items")
    .get((req, res)=> {
        MenuItemsService.getItems(req.app.get("db"))
            .then( menuItems => {
                
                return res.status(200).json({
                    menuItems
                });
            });
    })
    .post(requireAuth, (req, res)=>{
        const {
            category,
            name,
            description,
            size_small,
            size_medium,
            size_large,
            price_small,
            price_medium,
            price_large,
            ingredients
        } = req.body;

        const newMenuItem = {
            category,
            name,
            description,
            size_small,
            size_medium,
            size_large,
            price_small,
            price_medium,
            price_large,
            ingredients
        };

        for( const [key, value] of Object.entries(newMenuItem)){
            if(value === undefined){

                return res.status(400).json({
                    error: `Missing ${key} from body request`
                });
            };
        };

        MenuItemsService.createItem( req.app.get("db"), newMenuItem)
            .then( createdMenuItem => {

                return res.status(200).json({
                    createdMenuItem
                });
            })
    })

MenuItemsRouter
    .route("/menu_item/:id")
    .patch(requireAuth, (req, res)=>{
        const {
            category,
            name,
            description,
            size_small,
            size_medium,
            size_large,
            price_small,
            price_medium,
            price_large,
            ingredients
        } = req.body;

        const updateMenuItem = {
            category,
            name,
            description,
            size_small,
            size_medium,
            size_large,
            price_small,
            price_medium,
            price_large,
            ingredients
        };

        for(const [key, value] of Object.entries(updateMenuItem)){
            if(!value === undefined){
                return res.status(400).json({
                    error: `Missing ${key} in body request`
                });
            };
        };

        MenuItemsService.getItemById(req.app.get("db"), req.params.id)
            .then( dbMenuItem => {
                if(!dbMenuItem){
                    return res.status(404).json({
                        error: `Menu item with id ${req.params.id} was not found`
                    });
                };

                MenuItemsService.updateMenuItem(req.app.get("db"), updateMenuItem, req.params.id)
                    .then( updatedMenuItem => {
                        return res.status(200).json({
                            updateMenuItem
                        });
                    });
            });

    })
    .delete(requireAuth, (req, res)=>{
        MenuItemsService.getItemById(req.app.get("db"), req.params.id)
            .then( dbMenuItem => {
                if(!dbMenuItem){
                    return res.status(404).json({
                        error: `Menu item with id ${req.params.id} was not found`
                    });
                };

                MenuItemsService.deleteItem(req.app.get("db"), req.params.id)
                    .then( deletedMenuItem => {
                        return res.status(200).json({
                            deletedMenuItem
                        });
                    });
            });
    })

module.exports = MenuItemsRouter;