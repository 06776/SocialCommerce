import React, { useEffect } from "react";
import styles from "../../styles/styles";
import "../../styles/adminMain.css";
import { FiShoppingBag } from "react-icons/fi";
import { AiOutlineShop } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { getAllSellers } from "../../redux/actions/sellers";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();
  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );
  const { sellers } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, [dispatch]);

  return (
    <>
      {adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4">
          <h3 className="text-[22px] font-Poppins pb-2">Áttekintés</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineShop size={30} className="mr-2" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Eladók
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {sellers && sellers.length}
              </h5>
              <Link to="/admin-sellers">
                <h5 className="pt-4 pl-2 text-[#077f9c]">
                  Eladók megtekintése
                </h5>
              </Link>
            </div>
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <FiShoppingBag size={30} className="mr-2" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Rendelések
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {adminOrders && adminOrders.length}
              </h5>
              <Link to="/admin-orders">
                <h5 className="pt-4 pl-2 text-[#077f9c]">
                  Rendelések megtekintése
                </h5>
              </Link>
            </div>
          </div>
          <br />
          <h3 className="text-[22px] font-Poppins pb-2">
            Legutóbbi rendelések
          </h3>
          <div className="recent-orders-container">
            {adminOrders && adminOrders.length > 0 ? (
              adminOrders.map((order) => (
                <div key={order._id} className="recent-order">
                  <p>
                    <strong>Rendelés azonosítója:</strong> {order._id}
                  </p>
                  <p>
                    <strong>Rendelés állapota:</strong> {order.status}
                  </p>
                  <p>
                    <strong>Mennyiség:</strong>{" "}
                    {order.cart.reduce((acc, item) => acc + item.qty, 0)}
                  </p>
                  <p>
                    <strong>Végösszeg:</strong> {order.totalPrice} HUF
                  </p>
                  <p>
                    <strong>Rendelés dátuma:</strong>{" "}
                    {order.createdAt.slice(0, 10)}
                  </p>
                </div>
              ))
            ) : (
              <p>Nincsenek rendelések</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
