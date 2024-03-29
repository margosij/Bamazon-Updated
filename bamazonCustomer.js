var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require("./keys.js");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: keys.mysql.user,

  // Your password
  password: keys.mysql.password,
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    queryInventory();
  });

function queryInventory() {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res){
        if (err) throw err;
        console.table(res)
        console.log(questions(res));
    })
}

function questions (res) {

    inquirer.prompt([
        {
        name: "ID",
        type: "list",
        message: "What's the ID of the product you'd like to buy?",
        choices: function(){
            var choiceArray = [];
            for (var i=0; i < res.length; i++){
                choiceArray.push(res[i].item_id);
            }
                return choiceArray;
        }},

        {
        name: "Many",
        type: "input",
        message: "How many would you like of this product?",
        }
    ])
    .then 

    (function(answers){
        connection.query("SELECT * FROM products WHERE item_id=?", answers.ID, (err, res) => {
        if (answers.Many > res[0].stock_quantity){
            console.log("We don't have enough stock!")
            queryInventory()
        }
        else {updatedQuantity = res[0].stock_quantity - answers.Many
        updateInventory = connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updatedQuantity},{item_ID: answers.ID}])
        console.log("Stock has been updated!")
        
        }})
    }

    )
}
