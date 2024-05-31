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

        cartModel.findOne({user:userId})
        .then(cart=>{
            if(!cart){
                const newCart = new cartModel({
                    user : userId,
                    products : [{product: productId,quantity: 1}]
                });
                return newCart.save()
                  
            }else{
               // check if the product already in the cart
               const productIndex = cart.products.findIndex(p=>p.product.toString()=== productId);

               if(productIndex > -1) {
                //if product exists, increment the quantity
                cart.products[productIndex].quantity += 1;

               } else{
                // if product does not exist, add it to the cart
                cart.products.push({product:productId,quantity: 1})
                res.status(200).json({message:"success"})
               }
            
            return cart.save()
            }
           
        })
        .then(updatedCart =>{
            // calculate the toatal items
            const totalItems = updatedCart.products.reduce((total,item)=>total + item.quantity,0);
            res.json({cartItems: totalItems})
        })
        
        .catch((error) => {
            console.log("Error adding product to cart:", error);
            res.status(500).json({ message: "internal server error" });
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
        .populate('products.product')
        .then(cart=>{
            if(!cart){
                res.status(200).json({products:[]})
            }else{
               //extract products from the cart
               const populatedProducts = cart.products.map(item=>{
                const product = item.product;
                return {
                    ...product,
                    quantity: item.quantity //include the qunatity from the cart
                }
               });
               // return the products with populated quantity
               res.json({products:populatedProducts});
            }
        })
        .catch((error)=>{
            console.log("error fetching cart",error);
            res.status(500).json("internal server error")
        })
})





// Decrement item quantity
router.put('/cart/decrement/:id', (req, res) => {
    const { id } = req.params;
    const { userId } = req.session;

    cartModel.findOne({ user: userId })
        .then(cart => {
            if (!cart) {
                return res.status(404).json({ success: false, message: 'Cart not found' });
            }

            const productIndex = cart.products.findIndex(item => item.product.toString() === id);

            if (productIndex === -1) {
                return res.status(404).json({ success: false, message: 'Product not found in cart' });
            }

            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity -= 1;
            }

            return cart.save();
        })
        .then(() => {
            res.json({ success: true }); // Send response only after saving the cart
        })
        .catch(error => {
            console.error("Error decrementing product quantity:", error);
            res.status(500).json({ success: false, error: error.message });
        });
});

// Increment item quantity
router.put('/cart/increment/:id', (req, res) => {
    const { id } = req.params;
    const { userId } = req.session;

    cartModel.findOne({ user: userId })
        .then(cart => {
            if (!cart) {
                return res.status(404).json({ success: false, message: 'Cart not found' });
            }

            const productIndex = cart.products.findIndex(item => item.product.toString() === id);

            if (productIndex === -1) {
                return res.status(404).json({ success: false, message: 'Product not found in cart' });
            }

            cart.products[productIndex].quantity += 1;

            return cart.save();
        })
        .then(() => {
            res.json({ success: true }); // Send response only after saving the cart
        })
        .catch(error => {
            console.error("Error incrementing product quantity:", error);
            res.status(500).json({ success: false, error: error.message });
        });
});

// Decrement item quantity
router.put('/cart/decrement/:id', (req, res) => {
    const { id } = req.params;
    const { userId } = req.session;

    CartModel.findOne({ user: userId })
        .then(cart => {
            if (!cart) {
                return res.status(404).json({ success: false, message: 'Cart not found' });
            }

            const productIndex = cart.products.findIndex(item => item.product.toString() === id);

            if (productIndex === -1) {
                return res.status(404).json({ success: false, message: 'Product not found in cart' });
            }

            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity -= 1;
            }

            return cart.save();
        })
        .then(() => {
            res.json({ success: true }); // Send response only after saving the cart
        })
        .catch(error => {
            console.error("Error decrementing product quantity:", error);
            res.status(500).json({ success: false, error: error.message });
        });
});

// Delete item from cart
router.delete('/deletefromcart/:id', (req, res) => {
    console.log("Triggered deletefromcart route");
    const { id } = req.params;
    const { userId } = req.session;
    console.log("userId:", userId);
    console.log("productId:", id); 
    // Find the cart document for the user in the database and pull the product ID from the products array
    cartModel.findOneAndUpdate(
        { user: userId },
        { $pull: { products: { product: id } } },
        { new: true } // Return the updated cart document after the update
    )
    .lean() 
    .then(updatedCart => {
        const cart = updatedCart;
        res.json(cart);
    })
    .catch(error => {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ message: 'Internal server error' });
    });
});

export default router;