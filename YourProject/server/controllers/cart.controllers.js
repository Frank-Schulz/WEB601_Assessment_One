const asyncHandler = require('express-async-handler');
const Cart = require('../models/cart.model');
const Users = require('../models/users.model');
const Products = require('../models/products.model');


async function getUser(req) {
    return await Users.findOne({ email: req.session.user })
        .then((user) => { return user; });
}

async function getUserCart(userId) {
    return await Cart.findOne({ userId })
        .then((cart) => { return cart; });
}

async function getProduct(req) {
    return await Products.findOne({ _id: req.body.productId })
        .then((product) => { return product; })
}


//@description     Display the user's cart
//@route           GET /cart
//@access          Public
const showCart = asyncHandler(async (req, res) => {
    // Get user object
    const user = await getUser(req);

    // Get users cart object
    const userCart = await getUserCart(user.email);

    // Save user's cart to user object
    user[ "cartProducts" ] = userCart.products

    res.render("cart", { email, password, firstName, lastName, DoB, addresses, cartProducts } = user)
})

//@description     Add a product to the user's cart
//@route           POST /cart/add
//@access          Public
const addToCart = asyncHandler(async (req, res) => {
    // Get user object
    const user = await getUser(req);

    const product = await getProduct(req)

    // Get users cart object
    const userCart = await getUserCart(user.email);
    console.log(userCart);

    userCart.products.forEach(prod => {
        if (prod._id._id == product._id) {
            errorMessage = "Product already in cart";
            res.render("product", { user, product, errorMessage })
        }
    })

    // const itemExistsInCart = await Cart.findOne({
    //     userId: user.email,
    //     products: { _id: { _id: product._id } }
    // })
    // console.log(itemExistsInCart);

    // if (itemExistsInCart) {
    //     errorMessage = "Product already in cart";
    //     res.render("product", { user, product, errorMessage })
    // }

    await Cart.findOneAndUpdate(
        { userId: user.email },
        {
            $push: {
                products:
                    { _id: product, quantity: 1 }

            }
        })

    res.redirect('/cart')
})

//@description     Update a product's quantity in the user's cart
//@route           GET /cart/update
//@access          Public
const updateQuantity = asyncHandler(async (req, res) => {
    // Get user object
    const user = await getUser(req);

    // Get users cart object
    const userCart = await getUserCart(user.email);

    change = reg.body.productId.change

    Cart.findOneAndUpdate(
        { userId: user.email },
        { $set: { products: { quantity: quantity + change } } }
    )
})

//@description     Remove product from the user's cart
//@route           GET /cart/remove
//@access          Public
const removeFromCart = asyncHandler(async (req, res) => {
    // Get user object
    const user = await getUser(req);

    // Get users cart object
    const userCart = await getUserCart(user.email);

    await Cart.findOneAndUpdate(
        { userId: user.email },
        { $pull: { products: { productId: req.body.productId } } }
    )

    res.redirect('/cart')
})

module.exports = {
    showCart,
    addToCart,
    updateQuantity,
    removeFromCart,
};

