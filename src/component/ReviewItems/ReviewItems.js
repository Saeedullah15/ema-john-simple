import React from 'react';

const ReviewItems = (props) => {
    const {name, quantity, key, price} = props.product;
    const reviewItemStyle = {
        borderBottom: "2px solid gray",
        padding: "10px",
        margin: "10px",
        marginLeft: "150px"
    };
    return (
        <div style = {reviewItemStyle}>
            <h1 className = "product-name">{name}</h1>
            <p>Quantity: {quantity}</p>
            <p>Price: {price}</p>
            <br/>
            <button onClick = {() => props.removeProduct(key)} className = "button-cart">remove</button>
        </div>
    );
};

export default ReviewItems;