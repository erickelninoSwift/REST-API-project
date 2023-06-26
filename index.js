const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3500;


app.get('/',(req,res) =>{

    res.send('<h1>Hi Eriik</h1>');

});

app.listen(PORT,() =>{
    console.log(`Server is running on Port: ${PORT}`);

})

process.on('uncaughtException', error =>{
    console.log(`Error was found :${error}`);
    process.exit(1);
});