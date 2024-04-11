import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import "../../styles/products.css";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-4 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products &&
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-info">
                    <div className="product-header">
                      <h2 className="product-title">
                        Termék azonosítója: {product._id}
                      </h2>
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">
                      Ár: {product.originalPrice} HUF
                    </p>
                    <p className="product-stock">Készlet: {product.stock}</p>
                  </div>
                  <div className="product-actions">
                    <Link
                      to={`/product/${product._id}`}
                      className="product-icon"
                    >
                      <AiOutlineEye size={24} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="product-icon delete-icon"
                    >
                      <AiOutlineDelete size={24} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
