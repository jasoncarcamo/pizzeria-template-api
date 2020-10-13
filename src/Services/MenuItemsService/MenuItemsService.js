const MenuItemsService = {
    getItems(db){
        return db.select("*").from("menu_items");
    },
    getItemById(db, id){
        return db.select("*").from("menu_items").where({ id }).first();
    },
    createItem(db, newItem){
        return db.insert(newItem).into("menu_items").returning("*").then( ([item]) => item);
    },
    updateItem(db, updateItem, id){
        return db.update(updateItem).from("menu_items").where({ id }).returning("*").then(([updatedItem]) => updatedItem);
    },
    deleteItem(db, id){
        return db.delete().from("menu_items").where({ id }).returning("*").then(([deletedMenuItem]) => deletedMenuItem);
    }
};

module.exports = MenuItemsService;