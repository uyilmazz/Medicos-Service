const mongoose = require('mongoose');
const Product = require('./product');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        imageUrl: {
            type: String
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        zipCode: {
            type: Number
        },
        phoneNumber: {
            type: String
        },
        token: {
            type: String
        },
        appointments: [{
            type: Schema.Types.ObjectId,
            ref: 'Appointment',
            required: true
        }],

        cart: {
            cartItems: [
                {
                    productId: {
                        type: Schema.Types.ObjectId,
                        ref: 'Product',
                        required: true
                    },
                    quantity: {
                        type: Number,
                        required: true
                    }
                }
            ]
        }
    }
);

userSchema.methods.getUserCart = function () {

    const ids = this.cart.cartItems.map(product => {
        return product.productId;
    });

    return Product.find({
        _id: {
            $in: ids
        }
    })
        .then(products => {
            return products.map(product => {
                return {
                    product,
                    quantity: this.cart.cartItems.find(item => {
                        return item.productId.toString() == product._id.toString();
                    }).quantity
                }
            })
        })
        .catch(err => console.log(err));
}

userSchema.methods.addProductInCart = function (productId) {
    const cartItems = [...this.cart.cartItems];
    const itemQuantity = 1;
    const itemIndex = cartItems.findIndex(item => {
        return item.productId.toString() == productId.toString();
    });

    if (itemIndex < 0) {
        cartItems.push({
            productId,
            quantity: itemQuantity
        });
    } else {
        cartItems[itemIndex].quantity += itemQuantity;
    }

    this.cart = {
        cartItems
    }
    return this.save();
}

userSchema.methods.decrementProductInCart = function (productId) {
    const cartItems = [...this.cart.cartItems];
    const itemQuantity = 1;
    const itemIndex = cartItems.findIndex(item => {
        return item.productId.toString() == productId.toString();
    });

    if (cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity -= itemQuantity;
    } else {
        cartItems.splice(itemIndex, 1);
    }

    return User.updateOne({ _id: this._id }, {
        cart: {
            cartItems: cartItems
        }
    });

}

userSchema.methods.removeProductFromCart = function (productId) {
    const cartItems = [...this.cart.cartItems];
    const itemIndex = cartItems.findIndex(item => {
        return item.productId.toString() == productId.toString();
    });
    cartItems.splice(itemIndex, 1);

    this.cart = {
        cartItems
    }
    return this.save();
}

userSchema.methods.clearCart = function () {
    this.cart = {
        cartItems: []
    }

    return this.save();
}

const User = mongoose.model('User', userSchema);

module.exports = User;