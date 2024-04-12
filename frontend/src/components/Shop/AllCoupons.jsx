import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import Loader from "../Layout/Loader";
import styles from "../../styles/styles";
import "../../styles/coupons.css";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [value, setValue] = useState(null);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, [dispatch, seller._id]);

  const handleDelete = async (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success("Kuponkód sikeresen törölve");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Kuponkód törlése sikertelen");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Kuponkód sikeresen létrehozva");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "Kupon azonosítója",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Kuponkód",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Kedvezmény %-ban",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Törlés",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button className="deleteBtn" onClick={() => handleDelete(params.id)}>
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
  ];

  const rows = coupons.map((coupon) => ({
    id: coupon._id,
    name: coupon.name,
    price: `${coupon.value} %`,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Kuponkód létrehozása</span>
            </div>
          </div>
          <div className="coupon-container">
            {coupons.map((coupon) => (
              <div key={coupon._id} className="couponCard">
                <div className="couponInfo">
                  <span className="couponTitle">Kupon azonosítója:</span>{" "}
                  {coupon._id}
                </div>
                <div className="couponInfo">
                  <span className="couponTitle">Kuponkód:</span> {coupon.name}
                </div>
                <div className="couponInfo">
                  <span className="couponTitle">Kedvezmény %-ban:</span>{" "}
                  {coupon.value} %
                </div>
                <button
                  className="deleteBtn"
                  onClick={() => handleDelete(coupon._id)}
                >
                  <AiOutlineDelete size={20} />
                </button>
              </div>
            ))}
          </div>
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
              <div className="w-full max-w-md bg-white rounded-md shadow p-4">
                <div className="flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-2xl font-Poppins text-center mb-4">
                  Kuponkód létrehozása
                </h5>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1">
                      Kupon neve <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="input-field"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Kuponkód (számok és/vagy betűk)"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">
                      Kedvezmény mértéke (%){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="value"
                      value={value}
                      required
                      className="input-field"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Minimum mennyiség</label>
                    <input
                      type="number"
                      name="value"
                      value={minAmount}
                      className="input-field"
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Maximum mennyiség</label>
                    <input
                      type="number"
                      name="value"
                      value={maxAmount}
                      className="input-field"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label className="block mb-1">
                      Termék kiválasztása<span className="text-red-500">*</span>
                    </label>
                    <select
                      className="input-field"
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="Choose your selected products">
                        Válassz egy terméket
                      </option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Létrehozás"
                      className="btn-submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
