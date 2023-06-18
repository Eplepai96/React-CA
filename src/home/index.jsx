import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api/index';
import { BASEURL } from '../api';

function DisplayProducts() {
  const { data, isLoading, isError } = api.useApi(BASEURL);

  const calculatePriceDifference = (product) => {
    if (product.discountedPrice < product.price) {
      const priceDifference = (product.price - product.discountedPrice).toFixed(2);
      return <p>{priceDifference} off!</p>;
    }
  };
  

  const displayCurrentPrice = (product) => {
    if (product.discountedPrice < product.price) {
      return product.discountedPrice.toFixed(2);
    } else {
      return product.price.toFixed(2);
    }
  };
  

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!Array.isArray(data)) {
    return <div>Data is not an array</div>;
  }

  return (
    <div>
    <h1>Products</h1>
        <div className="products">
        {data.map((item) => (
            <div className='product' key={item.id}>
            <h2>{item.title}</h2>
            <div className='imageContainer'>
            <img src={item.imageUrl} alt={item.title} />
            </div>
            <p>Price: {displayCurrentPrice(item)}</p>
            <p>{calculatePriceDifference(item)}</p>
            <Link to={`/product/${item.id}`}>
                <button className='btn-primary'>Go to Product</button>
            </Link>
            </div>
        ))}
        </div>
    </div>
  );
}

export default DisplayProducts;
