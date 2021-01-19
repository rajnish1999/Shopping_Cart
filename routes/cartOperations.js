
    
module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        // console.log("id inside add function is"+id);
        // console.log("item inside add function is"+item);
        
        var storedItem = this.items[id];   //inside items we have id as key (id is like i: ,2: .....)
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };
    
    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            // console.log("item[id]"+this.items[id]);
            
            arr.push(this.items[id]);
        }
        // console.log("array is "+" ::"+arr);
        
        return arr;
    };

    this.reduceByOne = function(id) {
        console.log("inside reduce ");
        
        var tempItem = this.items[id];

        tempItem.qty--;
        tempItem.price-=tempItem.item.price;
        this.totalQty--;
        this.totalPrice-=tempItem.item.price;
        if(tempItem.qty==0){
            delete this.items[id];
        }
    }

    this.removeAll = function(id) {
        console.log("inside  remove");
        
        var tempItem = this.items[id];

        this.totalQty-=tempItem.qty;
        this.totalPrice-=tempItem.qty*tempItem.item.price;
        
        delete this.items[id];
    }
};