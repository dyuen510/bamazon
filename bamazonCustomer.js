var mysql = require('mysql');

var inquirer = require("inquirer");


// mysql -u root -p
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon_db',
    port: 3306
});

connection.connect();
//shows all products available in the store
function allProducts(){
connection.query("SELECT * FROM products", function (error, results, fields) {
    if (error) throw error;
    console.log('-----------')
    console.log('-----------')
    console.log('---allProducts()----')
    console.table(results);
    console.log('-----------')

    purchase();
});
}
allProducts();

//setting a value to purchase and prompting user to enter ID and quantity of the product wanted
var purchase=function(){
    inquirer.prompt([{
        name:'itemID',
        type:'input',
        message:'Enter item number:'
    },{
        name:'quantity',
        type:'input',
        message:'How many units of the product did you want to purchase?'
    }]).then(function(resp){
        idNumber = resp.itemID;
        console.log('You chose item id:', idNumber);
        quantitySelected = resp.quantity;
        console.log('Quantity desired:', quantitySelected);
        findProductBasedOnID(idNumber);



//Created a function that would locate the product ID and console.logs the price x quantity wanted.
        function findProductBasedOnID(pid){
            connection.query('SELECT id, product_name, price, stock_quantity FROM products WHERE id=?', [pid], function(error, results, fields){
                if (error) throw error;
                    console.log('-----------------------------------')
                    console.log(results)
                    console.log('------------------------------------')
                
                var quantityRemaining = results[0].stock_quantity - parseInt(quantitySelected);
//If we have more quantity than the user selected. 
                if (quantityRemaining>quantitySelected){
                    console.log('***********************************************************************************')
                    console.log('You have selected ' + quantitySelected + ' order(s) of ' +results[0].product_name + ' at the price of $' + results[0].price + ' each.' )
                    console.log('Quantity of Product Remaining: ' + quantityRemaining);
                    console.log('Your total is : $ ' + results[0].price * parseInt(quantitySelected));
                    console.log('***********************************************************************************')
                    continuePurchasing();
                    connection.query('UPDATE products SET stock_quantity = ? WHERE id=?',[quantityRemaining,pid])
                }else{

//else statement that returns if quantityRemaining is less than the quantity the user selected.
                    console.log('***********************************************************************************')
                    console.log('We don\'t have enough in stock! Check back later sorry!');
                    console.log('***********************************************************************************')
                    continuePurchasing();
                }

//function that would ask user if they want to continue purchasing or exit.
                function continuePurchasing(){
                    inquirer.prompt([{
                        type:'list',
                        message: 'Do you want to continue purchasing?',
                        choices:['Continue','Exit'],
                        name:'continue'
                    }])
                    .then(function(resp){
                        switch (resp.continue){
                            case 'Continue':
                                purchase();
                                break;
                            case 'Exit':
                                console.log('Thank you! See ya next time!')
                                connection.end();
                                break;
                        }
                    })
                }
            })
        }
        
    })
}
