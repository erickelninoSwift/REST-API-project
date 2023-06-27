const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3500;


app.get('/',(req,res) =>{

    res.send('<h1>Hi Eriik</h1>');

});


const products = [
    {
        id: '1',
        name: 'Orange',
        price: 30

    },
    {
        id: '2',
        name: 'Banana',
        price:  55

    }

  
]

  // Show list of products
app.get('/API/products',(req,res) =>{
    
    res.json(products);

});

// -================================

app.listen(PORT,() =>{
    console.log(`Server is running on Port: ${PORT}`);

})

process.on('uncaughtException', error =>{
    console.log(`Error was found :${error}`);
    process.exit(1);
});