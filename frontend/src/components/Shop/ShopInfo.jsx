import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { server } from "../../server";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const { products } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [dispatch, id]);

  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });
    navigate("/");
    window.location.reload();
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5 w-[50px]">
            <div className="flex justify-center">
              <Link to="/">
                <img
                  src={require("../../Assets/socialcommerce_logo.png")}
                  alt="Store logo"
                  width="180"
                  height="180"
                />
              </Link>
            </div>
            <div className="w-full flex item-center justify-center">
              <img
                src={`${data.avatar?.url}`}
                alt=""
                className="w-[100px] h-[100px] object-cover rounded-full"
              />
            </div>
            <h3 className="text-center py-2 text-[15px]">{data.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center"></p>
          </div>
          <div className="p-3">
            <h4 className="font-[600]">Leírás</h4>
            <h3 className="text-[#000000a6]">{data.description}</h3>
          </div>
          <div className="p-3">
            <h4 className="font-[600]">Cím</h4>
            <h3 className="text-[#000000a6]">{data.address}</h3>
          </div>
          <div className="p-3">
            <h4 className="font-[600]">Tel.</h4>
            <h3 className="text-[#000000a6]">+36{data.phoneNumber}</h3>
          </div>
          <div className="p-3">
            <h4 className="font-[600]">Termékek</h4>
            <h3 className="text-[#000000a6]">{products && products.length}</h3>
          </div>
          <div className="p-3">
            <h4 className="font-[600]">Értékelések</h4>
            <h3 className="text-[#000000b0]">{averageRating}/5</h3>
          </div>
          <div className="p-3">
            <h4 className="font-[600]">Regisztrált</h4>
            <h3 className="text-[#000000b0]">
              {data?.createdAt?.slice(0, 10)}
            </h3>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings">
                <div
                  className={`${styles.button} !w-[90px] !h-[42px] !rounded-[5px]`}
                >
                  <span className="text-white">
                    <h6>Szerkesztés</h6>
                  </span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-[90px] !h-[42px] !rounded-[5px]`}
                onClick={logoutHandler}
              >
                <span className="text-white">Kilépés</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
