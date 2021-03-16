import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {img, name, seller, price, stock, key} = props.product;
    // console.log(props.product.key);
    return (
        <div className = "product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className = "product-name"><Link to = {"/product/" + key}>{name}</Link></h4>
                <p>by: {seller}</p>
                <h3>${price}</h3>
                <p><small>only {stock} left in stock - order soon</small></p>
                {props.showAddToCart === true && <button onClick = {() => props.handleCartButton(props.product)} className = "button-cart"><FontAwesomeIcon icon={faShoppingCart}/>add to cart</button>}
            </div>
        </div>
    );
};

export default Product;