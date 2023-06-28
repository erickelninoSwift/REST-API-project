const path = require('path');
const express = require('express');
const exp = require('constants');
const app = express();
const {v4: uuidv4} = require('uuid');
const Joi = require('joi');
const { chownSync } = require('fs');


const PORT = process.env.PORT || 3500;


app.get('/',(req,res) =>{

    res.send('<h1>Hi Eriik</h1>');

});




app.use(express.json());

let products = [
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

//   // Show list of products
// app.get('/API/products',(req,res) =>{

//     res.json(products);

// });

// // -================================

// // Show a specifi products

// app.get('/API/products/:id',(req,res) =>{
//     const myId = req.params.id;

//     const currentProducts = products.find(data =>{
//         return data.id === myId;
//     });
//     currentProducts ? res.status(200).send(currentProducts): res.status(404).json({
//         error: 'No data found'
//     });
// });

// //  post a product or insert data 

// app.use(express.json());

// app.post('/API/products',(req,res) =>{

//     const {error} = validation(req.body);

//        if(error)
//        {
//         return res.status(404).json({

//             message : error.details[0].message
//         });
//        }

//         const product = {

//             id: uuidv4(),
//             name : req.body.name,
//             price : req.body.Price
//         }

//         products.push(product);

//         res.json(result);


// });

// Update Alldata

app.put('/API/products/:id',(req,res) =>{

   const {error} = validation(req.body);

  
  if(error)
  {
    return res.status(400).json({
        message: error.details[0].message
    });
  }
   

   const index = products.findIndex(data =>{
    return data.id === req.params.id;
   });

   console.log(`Index of the object : ${index}`);

   if(index === -1)
   {
   res.status(404).json({
    message: 'Product was not found '
   });

   }else
   {
     
   products[index].name = req.body.name ;
   products[index].price = req.body.Price ;

    //  console.log(req.body);

   return res.json(products[index]);
   }
   

   console.log(products[index]);
   
});


app.patch('/API/products/:id',(req,res) =>{

    const mycurrentID = req.params.id;

    const currentIndex = products.findIndex(data =>{
        return data.id === mycurrentID
    });

    if(currentIndex === -1)
    {
        res.status(404).json({
            message: 'Data selected was not found in the record'
        });
    }
    let updatedProduct = {
         ...products[currentIndex],
         ...req.body
    }

    products[currentIndex] = updatedProduct;
    console.log(updatedProduct);


    return res.json({
        updatedProduct
    })
});

// app.delete('/API/products/:id',(req,res) =>{

//       const index = products.findIndex(data =>{

//          return data.id === req.params.id
//       });

//       if(index === -1)
//       {
//         res.status(404).json({

//             message : 'Data to delete was not found'

//         });
//       }
//       const newproduct = products.filter(data =>{
//         return data.id !== req.params.id
//       });

//        products = newproduct;

//        res.status(200).json(newproduct);

// });


// Deletev everything 

app.delete('/API/products/:id',(req,res) =>{

   const productSelected = products.find(data =>{
    return data.id === req.params.id
   });

   if(!productSelected)
   {
        res.json({
            message : 'There was record found '
        });
   }



      const index = products.findIndex(data =>{
        return data.id === productSelected.id
      });

      products.splice(index,1);

      return res.status(200).json({
        productSelected
      });

   
});

app.delete('/API/products/',(req,res) =>{

    if(products.length > 0)
    {
        products.splice(0,products.length);

        res.status(200).json({
            products
        })
       console.log('product list is Empty');
    }else
    {
        res.status(404).json({
            message : 'There is no data recorded in the database'
        });
    }

});

const validation = (body) =>{


    const schema = Joi.object({

        name: Joi.string().min(3).max(3000).required(),
        Price: Joi.number().required()
   });

   return schema.validate(body);

}


app.listen(PORT,() =>{
    console.log(`Server is running on Port: ${PORT}`);

})

