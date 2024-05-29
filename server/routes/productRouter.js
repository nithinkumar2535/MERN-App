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
    if(userId){
        const productId = req.params.id;

        cartModel.findOne({user:userId,products:productId})
        .then((cart)=>{
            if(cart){
                res.status(200).json({message:"already in cart"})
            }else{
                const updateOperation ={
                    $addToSet: {products:productId}
                } ;
            
                cartModel.findOneAndUpdate(
                    {user:userId},
                    updateOperation,
                    {upsert:true,new:true}
                )
                .then((result)=>{
                    res.status(200).json({message:"success"})
                    
                })
                .catch((error)=>{
                    res.status(500).json({message:"error"})
                    console.log("error adding product");
                })
            }
            
        })
        .catch((error) => {
            console.log("Error finding cart:", error);
            res.status(500).json({ message: "error" });
        });
    
       
    }else{
        res.status(404).json({ message: "User not found" });
        console.log("user not found");
    }
   
})

router.get('/cart',(req,res)=>{
    const userId = req.session.userId;

    cartModel.findOne({user:userId})
        .lean()
        .populate("products")
        .then(cart=>{
            if(!cart){
                res.status(200).json({message:"empty cart"})
                console.log("cart is empty");
            }else{
                const productIds = cart.products.map(product=>product._id);

                ProductModel.aggregate([
                    {$match:{_id:{$in:productIds}}},
                    {
                        $addFields: {
                            cartItemId: `$_id`
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
})

router.get('/cart-item-count', async (req, res) => {
    const userId = req.session.userId;

    if(userId){
        cartModel.findOne({user:userId})
        .then((cart)=>{
            if(cart){
                const itemCount = cart.products.length;
                res.status(200).json({itemCount})
            }else{
                res.status(200).json({itemCount:0})
            }
        })
        .catch((error)=>{
            console.log("error fetching cart items count",error);
            res.status(500).json({error:"internal server error"})
        })
    }else{
        res.status(404).json({error:"user not found"})
    }
   
});

router.delete('/cart/:id', (req, res) => {

    const productId = req.params.id;


    
    
});

export default router;