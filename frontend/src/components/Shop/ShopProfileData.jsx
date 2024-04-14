import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import ProductCard from "../Route/ProductCard/ProductCard";
import Ratings from "../Products/Ratings";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
  }, [dispatch, id]);

  const [active, setActive] = useState(1);

  const allReviews = products && products.flatMap((product) => product.reviews);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Termékek
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Értékelések
            </h5>
          </div>
        </div>
      </div>

      <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {products &&
            products.map((product, index) => (
              <ProductCard key={index} data={product} isShop={true} />
            ))}
        </div>
      )}

      {active === 3 && (
        <div className="w-full">
          {allReviews && allReviews.length > 0 ? (
            allReviews.map((review, index) => (
              <div key={index} className="w-full flex my-4">
                <img
                  src={review.user.avatar?.url}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-[600] pr-2">{review.user.name}</h1>
                    <Ratings rating={review.rating} />
                  </div>
                  <p className="font-[400] text-[#000000a7]">
                    {review?.comment}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h5 className="w-full text-center py-5 text-[18px]">
              Nincsenek értékelések
            </h5>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
