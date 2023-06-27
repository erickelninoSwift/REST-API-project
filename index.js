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

// Show a specifi products

app.get('/API/products/:id',(req,res) =>{
    const myId = req.params.id;

    const currentProducts = products.find(data =>{
        return data.id === myId;
    });
    currentProducts ? res.status(200).send(currentProducts): res.status(404).json({
        error: 'No data found'
    });
});



app.listen(PORT,() =>{
    console.log(`Server is running on Port: ${PORT}`);

})

process.on('uncaughtException', error =>{
    console.log(`Error was found :${error}`);
    process.exit(1);
});