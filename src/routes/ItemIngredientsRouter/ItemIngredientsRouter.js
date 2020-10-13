const express = require('express');
const ItemIngredientsRouter = express.Router();
const ItemIngredientsService = require("../../Services/ItemIngredientsService/ItemIngredientsService");
const {requireAuth} = require("../../middleware/jwtAuth");
const { createItemIngredient, deleteItemIngredient } = require('../../Services/ItemIngredientsService/ItemIngredientsService');

ItemIngredientsRouter
    .route("/item_ingredients")
    .get((req, res)=>{
        ItemIngredientsService.getItemIngredients(req.app.get("db"))
            .then( itemIngredients => {
                return res.status(200).json({
                    itemIngredients
                });
            });
    })
    .post(requireAuth, (req, res)=>{
        const {
            category,
            name,
            price_add,
            price_half,
            price_double,
            price_extra
        } = req.body;

        const newItemIngredient = {
            category,
            name,
            price_add,
            price_half,
            price_double,
            price_extra
        };

        for(const [key, value] of Object.entries(newItemIngredient)){
            if(value === undefined){
                return res.status(400).json({
                    error: `Missing ${key} in body request`
                });
            };
        };

        ItemIngredientsService.createItemIngredient(req.app.get("db"), newItemIngredient)
            .then( createdItemIngredient => {
                return res.status(200).json({
                    createdItemIngredient
                });
            });
    })

ItemIngredientsRouter
    .route("/item_ingredients/:id")
    .patch(requireAuth, (req, res)=>{
        const {
            category,
            name,
            price_add,
            price_half,
            price_double,
            price_extra
        } = req.body;

        const updateItemIngredient = {
            category,
            name,
            price_add,
            price_half,
            price_double,
            price_extra
        };

        for(const [key, value] of Object.entries(updateItemIngredient)){
            if(value === undefined){
                return res.status(400).json({
                    error: `Missing ${key} in body request`
                });
            };
        };

        ItemIngredientsService.getItemIngredientById(req.app.get("db"), req.params.id)
            .then( dbItemngredient => {
                if(!dbItemngredient){
                    return res.status(404).json({
                        error: `Item ingredient with id ${req.params.id} was not found`
                    });
                };

                ItemIngredientsService.updateItemIngredient(req.app.get("db"), updateItemIngredient, req.params.id)
                    .then( updatedItemIngredient => {
                        return res.status(200).json({
                            updatedItemIngredient
                        });
                    })
            })
    })
    .delete(requireAuth, (req, res)=>{
        ItemIngredientsService.getItemIngredientById(req.app.get("db"), req.params.id)
            .then( dbItemngredient => {
                if(!dbItemngredient){
                    return res.status(404).json({
                        error: `Item ingredient with id ${req.params.id} was not found`
                    });
                };

                ItemIngredientsService.deleteItemIngredient(req.app.get("db"), req.params.id)
                    .then( deletedItemIngredient => {
                        return res.status(200).json({
                            deletedItemIngredient
                        });
                    });
            });
    });

module.exports = ItemIngredientsRouter;