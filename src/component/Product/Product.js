import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    const {img, name, seller, price, stock} = props.product;
    return (
        <div className = "product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className = "product-name">{name}</h4>
                <p>by: {seller}</p>
                <h3>${price}</h3>
                <p><small>only {stock} left in stock - order soon</small></p>
                <button onClick = {() => props.handleCartButton(props.product)} className = "button-cart"><FontAwesomeIcon icon={faShoppingCart}/>add to cart</button>
            </div>
        </div>
    );
};

export default Product;