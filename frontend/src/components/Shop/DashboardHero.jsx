import React, { useEffect } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const renderOrders = () => {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {orders &&
          orders.map((order) => (
            <div key={order._id} className="bg-white rounded shadow p-4">
              <p className="text-sm">
                <b>Rendelés azonosítója: </b>
                {order._id}
              </p>
              <p className="text-sm">
                <b>Állapot: </b>
                {order.status}
              </p>
              <p className="text-sm">
                <b>Mennyiség: </b>
                {order.cart.length}
              </p>
              <p className="text-sm">
                <b>Végösszeg: </b>
                {order.totalPrice} HUF
              </p>
              <Link to={`/order/${order._id}`} className="text-blue-600">
                Részletek
              </Link>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-8">
      <h3 className="text-2xl font-semibold pb-4">Áttekintés</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="bg-white rounded shadow p-4">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-500">Rendelések</h3>
          </div>
          <h5 className="text-xl font-semibold">{orders && orders.length}</h5>
          <Link to="/dashboard-orders" className="text-blue-600">
            Megtekintés
          </Link>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-500">Termékek</h3>
          </div>
          <h5 className="text-xl font-semibold">
            {products && products.length}
          </h5>
          <Link to="/dashboard-products" className="text-blue-600">
            Megtekintés
          </Link>
        </div>
      </div>
      <div className="py-8">
        <h3 className="text-2xl font-semibold pb-4">Legutóbbi rendelések</h3>
        {renderOrders()}
      </div>
    </div>
  );
};

export default DashboardHero;
