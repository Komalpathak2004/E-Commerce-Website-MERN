const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const currentUser = req.userId;

        // Check if the product already exists in the cart for the current user
        const existingProduct = await addToCartModel.findOne({ productId, userId: currentUser });

        if (existingProduct) {
            // If the product exists, increase the quantity
            existingProduct.quantity += 1;
            await existingProduct.save();

            return res.json({
                message: "Product quantity updated in cart",
                success: true,
                error: false
            });
        }

        // If the product does not exist, add a new entry
        const newProduct = new addToCartModel({
            productId: productId,
            quantity: 1,
            userId: currentUser,
        });
        const savedProduct = await newProduct.save();

        return res.json({
            data: savedProduct,
            message: "Product added to cart",
            success: true,
            error: false
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = addToCartController;
