# Bamazon-Updated

This is the link to the [Github] (https://margosij.github.io/Bamazon-Updated/) page!
Here's the link to the Bamazon demonstration [video!] (https://youtu.be/qrROJ-UVpd0)

I decided to complete the first two parts of the Bamazon app and their purposes are shown below:

    Customer:
        1. View the list of items for purchase.
        2. Make a purchase.
            a. If you try to buy more items than are currently available, your request will be denied and the items table will reload.
            b. If you buy an amount that Bamazon can support, these items will be deducted from the inventory for that item.

    Manager:
        1. View the products that are for sale.
        2. View any products that have a quantity of less than 5.
        3. Add inventory to any items.
        4. Add a new item to your inventory list. This includes adding the Item ID, Product Name, Department Name, Price and Stock Quantity.

Some of the technologies used in making this app are:
    1. MySQL
    2. Inquirer
    3. Node
    4. Javascript
    5. gitignore

My role in this project was both writer and designer of the code.
In order to complete this project, I split the Customer and Manager aspects of the project to two seperate JS files. Each file is organized fairly similarly. I have the require and connection functions up at the top of the file and then the inquirer prompt and responses set up in the middle and bottom of the file.
I also added a gitignore file and put all the node modules and MySQL password on it so they wouldn't get uploaded onto GitHub.

In order to use this app you will need to do the following:
    for the Customer side:
        1. Open up your terminal and run the node bamazonCustomer.js command.
        2. A table will pull up showing the list of items available for purchase.
        3. Choose the Item Id of the item you'd like to purchase.
        4. Enter in the quantity of the item you'd like to purchase.
            a. If you entered in more than we have, you'll be notified and the app will reset.
            b. If we have enough to cover your request, the quantity will be deducted from the total in the app.

    for the Manager side:
        1. Open up your terminal and run the node bamazonManager.js command.
        2. A table will pop up showing the Item ID, Product Name and Price. A prompt will also ask you what you would like to do.
        3. If you select "View Product for Sale", a new table will generate showing the Item ID, Product Name, Price and Stock Quantity.
        4. If you select "View Low Inventory", a table will generate showing what items have less than 5 quantities.
        5. If you select "Add Inventory", you will be asked which Item ID you want to add stock to then how much you'd like to add. Once this has been filled out, the stock quantity will be updated.
        6. If you select "Add New Product", you will be asked to enter in the product name, department name, price, and how much stock for the new item. Make sure to put a , in between every category. Once you've put in all of that information and hit enter; the table will update with the new item information.