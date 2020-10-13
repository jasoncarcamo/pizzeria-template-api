const OrderItemsService = {
    formatForDb(obj){
        let newObj = {};

        for( const key of Object.keys(obj)){
            newObj[key.toLowerCase()] = obj[key];
        };

        return newObj;
    },
    formatItems(items){
        let newItems = [];

        for( let i = 0; i < items.length; i++){
            newItems[i] = {};

            newItems[i].id = items[i].id;
            newItems[i].category = items[i].category;
            newItems[i].title = items[i].title;
            newItems[i].description = items[i].description;
            newItems[i].sizeReg = items[i].sizereg
            newItems[i].sizeSmall = items[i].sizesmall;
            newItems[i].priceReg = items[i].pricereg;
            newItems[i].priceSmall = items[i].pricesmall;
            newItems[i].ingredients = items[i].ingredients;
            newItems[i].specialRequests = items[i].specialrequests;
            newItems[i].quantity = items[i].quantity;
            newItems[i].orderId = items[i].orderid;
        };

        return newItems;
    },
    getOrderItems(db, orderid){

        return db.select("*").from("orderitems").where({ orderid });
    },
    getItems(db){

        return db.select("*").from("orderitems");
    },
    getItem(db, id){

        return db.select("*").from("orderitems").where({ id }).first();
    },
    createItem(db, newItem){

        return db.insert(newItem).from("orderitems").returning("*").then( ([item]) => item );
    },
    updateItem(db, updatedItem, id){
        updatedItem = OrderItemsService.formatForDb(updatedItem);
        console.log(updatedItem)

        return db.update(updatedItem).from("orderitems").where({ id })
    },
    deleteItem(db, id){

        return db.delete().from("orderitems").where({ id });
    }
};

module.exports = OrderItemsService;