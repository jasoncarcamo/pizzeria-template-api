const ItemIngredientsService = {
    getItemIngredients(db){
        return db.select("*").from("item_ingredients");
    },
    getItemIngredientById(db, id){
        return db.select("*").from("item_ingredients").where({id}).first();
    },
    createItemIngredient(db, newItemIngredient){
        return db.insert(newItemIngredient).into("item_ingredients").returning("*").then(([createdItemIngredient]) => createdItemIngredient)
    },
    updateItemIngredient(db, updateItemIngredient, id){
        return db.update(updateItemIngredient).from("item_ingredients").where({id}).returning("*").then(([updatedItemIngredient]) => updatedItemIngredient);
    },
    deleteItemIngredient(db, id){
        return db.delete().from("item_ingredients").where({id}).returing("*").then(([deleetdItemIngredient]) => deleetdItemIngredient);
    }
};

module.exports = ItemIngredientsService;