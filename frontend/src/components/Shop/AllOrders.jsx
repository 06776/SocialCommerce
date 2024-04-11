import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/shopOrders.css";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";

const AllOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller._id]);

  return (
    <div className="w-full p-8">
      <h3 className="text-2xl font-bold pb-4">Rendelések</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orders &&
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-info">
                <p>
                  <b>Rendelés azonosítója: </b>
                  {order._id}
                </p>
                <p>
                  <b>Rendelés státusza: </b>
                  {order.status}
                </p>
                <p>
                  <b>Mennyiség: </b>
                  {order.cart.length}
                </p>
                <p>
                  <b>Végösszeg: </b>
                  {order.totalPrice} HUF
                </p>
              </div>
              <div className="order-button">
                <Link to={`/order/${order._id}`}>
                  <Button>
                    <AiOutlineArrowRight size={20} />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllOrders;
