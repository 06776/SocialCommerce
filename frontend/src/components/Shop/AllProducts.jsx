import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";

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
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                      ID: {product._id}
                    </div>
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <p className="text-gray-700 text-base">
                      Ár: {product.originalPrice} HUF
                    </p>
                    <p className="text-gray-700 text-base">
                      Készlet: {product.stock}
                    </p>
                  </div>
                  <div className="px-6 py-4 flex justify-between items-center">
                    <div>
                      <Link
                        to={`/product/${product._id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <AiOutlineEye size={20} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </div>
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
