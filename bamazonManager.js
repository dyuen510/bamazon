var mysql = require('mysql');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon_db',
    port: 3306
});

connection.connect();

options();

function viewProducts(){
    connection.query('SELECT * FROM products', function (error, results, fields){
        if (error) throw error;
        console.log('----------------------all products---------------------')
        console.table(results);
    })
}

var viewLowInventory=function(){
    connection.query('SELECT * FROM products WHERE stock_quantity < 20', function (error, results, fields){
        if (error) throw error;
        console.table(results);
    })
}

var addToInventory = function(){
    inquirer.prompt([{
        name:'itemID',
        type:'input',
        message:'Enter item number:'
    },{
        name:'quantity',
        type:'input',
        message:'How many units do you want to add to inventory?'
    }]).then(function(resp){
        idNumber = resp.itemID;
        console.log('You selected item id: ', idNumber);
        quantitySelected = resp.quantity;
        console.log('Quantity added: ', quantitySelected);
        addTo(idNumber);
    })
}

function addTo(pid){
    connection.query('SELECT id, product_name, department_name,stock_quantity FROM products WHERE id=?', [pid], function(error, results, fields){
        if (error) throw error;
        var restock_quantity = results[0].stock_quantity + parseInt(quantitySelected);
        connection.query('UPDATE products SET stock_quantity = ? WHERE id=?', [restock_quantity,pid]);
        console.log('**********************************************************')
        console.log('You have restocked ' + results[0].product_name + ' by '+ quantitySelected+ ' units.')
    })
}

function addNewProduct(productName){
    inquirer.prompt([{
        name:'productName',
        type:'input',
        message:'Enter new product name: '
    },{
        name:'department',
        type:'input',
        message:'Enter department: '
    },{
        name:'price',
        type:'input',
        message:'Enter the price for each unit: '
    },{
        name:'quantityInStock',
        type:'input',
        message:'Enter the quantity available: '
    }]).then(function(resp){
        connection.query('UPDATE products SET WHERE id=?');
        productName = resp.productName;
        department = resp.department;
        price = resp.price;
        quantityInStock = resp.quantityInStock;
        console.log(' Added new product : ' + productName + ' to the ' + department + ' department. Each unit is $' + price + ' and we have '+ quantityInStock+ ' available.' )
    })
}


function options() {
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Products', 'View Low Inventory', 'Add to Inventory', 'Add a New Product', 'exit'],
        name: 'options'
    }])
        .then(function (resp) {
            switch (resp.options) {
                case 'View All Products':
                    viewProducts();
                    break;
                case 'View Low Inventory':
                    viewLowInventory();
                    break;
                case 'Add to Inventory':
                    addToInventory();
                    break;
                case 'Add a New Product':
                    addNewProduct();
                    break;
                case 'exit':
                    console.log('See ya next time!')
                    connection.end();
                    break;
            }
        })
    }
