import express from 'express';
const router = express.Router();
import ProductModel from '../models/productModel.js';
import path from 'path';
import cartModel from '../models/cartModel.js';
import UserModel from '../models/userModel.js';
import session from 'express-session';

router.post('/admin/products', (req, res)=>{
    const product = new ProductModel(req.body);
    product.save().then((product)=>{  
        let image = req.files.itemImage;
        image.mv(path.join('public/images/product-images', `${product._id}.jpg`), (err)=>{
            if(err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.json(product);
            }
        });
    }).catch((error)=>{
        console.error(error);
        res.status(400).send(error);
    });
})


router.get('/admin/viewproducts', (req, res)=>{
    ProductModel.find({}).lean()
    .then((products)=>{
        res.json(products)
    })
    .catch((error)=>{
        console.log(error);
    })
})

router.get('/editproducts/:id',(req,res)=>{
    const productId = req.params.id;
    ProductModel.findById(productId).lean()
    .then((product)=>{
        res.json(product)
    })
})

//edit product post route
router.post('/editproducts/:id', (req, res) => {
    const productId = req.params.id;
    const { itemName, itemDesc, itemPrice } = req.body;

    // Check if files were uploaded
    if (req.files && req.files.itemImage) {
        let image = req.files.itemImage;

        // Update product details and handle image upload
        ProductModel.findByIdAndUpdate(productId, {
            itemName: itemName,
            itemDesc: itemDesc,
            itemPrice: itemPrice
        })
        .then((product) => {
            // Move uploaded image to the appropriate directory
            image.mv(path.join('public/images/product-images', `${productId}.jpg`), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
                res.json("success");
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });
    } else {
        ProductModel.findByIdAndUpdate(productId, {
            itemName: itemName,
            itemDesc: itemDesc,
            itemPrice: itemPrice
        })
        .then(() => {
            res.json("success");
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });
    }
});


router.delete('/deleteproduct/:id', (req, res) => {
    const productId = req.params.id;

    // Delete the product based on the product ID
    ProductModel.findByIdAndDelete(productId)
        .then(() => {
            console.log("Product deleted successfully");
            // Send a success response
            res.json({ message: "Product deleted successfully" });
        })
        .catch((error) => {
            console.error("Error deleting product:", error);
            // Send an error response
            res.status(500).json({ error: "Error deleting product" });
        });
});


router.get('/products',(req,res)=>{
    ProductModel.find()
    .then((products)=>{
        res.json(products);
    })
    .catch((error)=>{
        res.json(error)
    })
})

router.post('/add-to-cart/:id',(req,res)=>{
    const userId = req.session.userId;
    const productId = req.params.id;

    const updateOperation ={
        $addToSet: {products:productId}
    } ;

    cartModel.findOneAndUpdate(
        {user:userId},
        updateOperation,
        {upsert:true,new:true}
    )
    .then((result)=>{
        console.log("successfully added to cart");
    })
    .catch((error)=>{
        console.log("error adding product");
    })
})

router.get('/cart',(req,res)=>{
    const userId = req.session.userId;

    cartModel.findOne({user:userId}
        .lean()
        .populate("products")
        .then(cart=>{
            if(!cart){
                res.json("empty cart")
            }else{
                const productIds = cart.map(product=>product._id);

                ProductModel.aggregate([
                    {$match:{_id:{$in:productIds}}},
                    {
                        $addFields: {
                            cartItemId: { $arrayElemAt: ['$product._id',0]}
                        }
                    }
                ])
                .then((products)=>{
                    res.json(products)
                })
                .catch((error)=>{
                    res.json(error)
                    console.log("error agregating product");
                })
            }
        })
        .catch((error)=>{
            console.log("error fetching cart");
        })
    )
})

export default router;