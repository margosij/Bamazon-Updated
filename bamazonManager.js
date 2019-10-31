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
    console.log("connected as id " + connection.threadId);
    queryInventory();
  });

  function queryInventory() {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res){
        if (err) throw err;
        console.table(res)
        console.log(questions(res));
    })
}

const questions = () => {

    inquirer.prompt([
    {
        name: "choices",
        type: "list",
        message: "Select an option from the following:",
        choices: ["View Products for Sale",
        "View Low Inventory",
        "Add Inventory",
        "Add New Product"]
    },

    ])
    .then (responses => {
        if (responses.choices === "View Products for Sale"){
            connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res){
                if (err) throw err;
                console.table(res)
            })
        }
        if (responses.choices === "View Low Inventory"){
            lowInventory()
        }
        if (responses.choices === "Add Inventory"){
            addInventory()
        }
        if (responses.choices === "Add New Product"){
            addItem()
        }
    })
}

function lowInventory(){ 
    connection.query("SELECT item_id, product_name, stock_quantity FROM products", function(err, res){
    if (err) throw err;
    for (i=0; i<res.length; i++){
        if(res[i].stock_quantity < 5){
            var lowStock = [];
            lowStock.push(res[i])
            console.table(lowStock)
        }
    }

    })
}

function addInventory(res){
    connection.query("SELECT item_id, product_name, stock_quantity FROM products", function(err, res){
    inquirer.prompt([
        {
        name: "ID",
        type: "list",
        message: "What's the ID of the product you'd like to add stock to?",
        choices: function(){
            var choiceArray = [];
            for (var i=0; i < res.length; i++){
                choiceArray.push(res[i].item_id);
            }
                return choiceArray;
    
        }},
        {
            name: "howMany",
            type: "input",
            message: "How much inventory would you like to add to this item?"
        }
    ])
    .then
    (function(answers){
        var updatedQuantity = parseInt(res[0].stock_quantity) + parseInt(answers.howMany)
        updateInventory = connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updatedQuantity},{item_id: answers.ID}])
        console.log("Stock has been updated!")
    })
    })
}

function addItem(){
        addAnItem = connection.query("INSERT INTO procucts SET ?", function(err, res){
            inquirer.prompt([
                {
                    name: "new",
                    type: "input",
                    message: "Please add in the product name, department name, price, and how much stock for the new item. Also make sure you add in a comma after each column title!"
                }
            ])
            .then
            (function(answers){
                var string = answers.new.split(", ")
                connection.query("INSERT INTO products SET ?", {
                    item_id: string[0],
                    product_name: string[1],
                    department_name: string[2],
                    price: string[3],
                    stock_quantity: string[4]})
                    console.log("Item has been added!")
            })
        }
        
        )
}
