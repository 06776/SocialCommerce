import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import "../../styles/adminProducts.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { Button } from "@material-ui/core";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/product/admin-all-products`, { withCredentials: true })
      .then((res) => {
        setProducts(res.data.products);
      });
  }, []);

  return (
    <div className="container">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-id">Termék azonosítója: {product._id}</p>
            <p className="product-price">
              Termék ára: {product.originalPrice} HUF
            </p>
            <p className="product-stock">Mennyiség: {product.stock}</p>
          </div>
          <Link to={`/product/${product._id}`} className="product-link">
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
