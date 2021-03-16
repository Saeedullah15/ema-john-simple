import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        total = total + element.price * element.quantity;
    }

    let shipping = 0;
    if (total < 50 && total > 0) {
        shipping = 12.50;
    }
    else if (total > 50 && total < 100) {
        shipping = 4.50;
    }
    else if (total > 100) {
        shipping = 0;
    }

    const tax = Math.round( total * 0.1);
    return (
        <div>
            <h3>order summary</h3>
            <h4>items ordered: {cart.length}</h4>
            <h4>product price: {total.toFixed(2)}</h4>
            <h4>shipping cost: {shipping}</h4>
            <h4>tax: {tax}</h4>
            <h4>total price: {(total + shipping + tax).toFixed(2)}</h4>
            <br/>
            <Link to = "/review">
            <button className = "button-cart">review order</button>
            </Link>
        </div>
    );
};

export default Cart;