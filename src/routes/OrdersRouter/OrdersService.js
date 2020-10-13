function lowerCaseKeys(obj){
    let newObj = {};

    for(const [key, value] of Object.entries(obj)){
        newObj[key.toLowerCase()] = obj[key];
    };
    
    return newObj;
}

const OrdersSevice = {

    getUserOrder(db, userId){

        return db.select("*").from("orders").where({
            userid: userId,
            ordercomplete: false
        }).first();
    },
    getOrders(db){

        return db.select("*").from("orders");
    },
    getOrder(db, id){

        return db.select("*").from("orders").where({ id }).first();
    },
    createOrder(db, newOrder){

        return db.insert(newOrder).into("orders").returning("*").then( ([order]) => order );
    },
    updateOrder(db, updatedOrder, id){
        updatedOrder = lowerCaseKeys(updatedOrder);
        console.log(updatedOrder)
        return db.update(updatedOrder).from("orders").where({ id });
    },
    deleteOrder(db, id){

        return db.delete().from("orders").where({ id });
    }
};

module.exports = OrdersSevice;