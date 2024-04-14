import React, { useEffect } from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../redux/actions/order";
import "../styles/adminOrders.css";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();

  const { adminOrders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, [dispatch]);

  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>

          <div className="w-full min-h-[45vh] pt-5 rounded flex">
            <div className="card-container">
              {" "}
              {adminOrders &&
                adminOrders.map((order) => (
                  <div key={order._id} className="order-card">
                    {" "}
                    <h2>Rendelés azonosítója: {order._id}</h2>
                    <p>
                      Státusz:{" "}
                      <span
                        className={
                          order.status === "Kiszállítva"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.status}
                      </span>
                    </p>
                    <p>
                      Mennyiség:{" "}
                      {order.cart.reduce((acc, item) => acc + item.qty, 0)}
                    </p>
                    <p>Végösszeg: {order.totalPrice} HUF</p>
                    <p>Rendelés dátuma: {order.createdAt.slice(0, 10)}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
