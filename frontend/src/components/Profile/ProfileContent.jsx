import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";
import "../../styles/orders.css";
import "../../styles/address.css";
import "../../styles/newAddress.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            dispatch(loadUser());
            toast.success("Profilkép sikeresen frissítve");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${user?.avatar?.url}`}
                className="w-[100px] h-[100px] rounded-full object-cover border-[3px] border-[#3ad132] mr-6"
                alt="Profilkép"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px] mr-5">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Név</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">E-mail cím</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Telefonszám</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber ? `+36${phoneNumber}` : "+36"}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace("+36", ""))
                    }
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">
                    Jelszó megadása adatok módosításához
                  </label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[240px] h-[35px] border border-[#1CBA6D] bg-[#1CBA6D]
                text-center text-[#fff] rounded-[5px] mt-1 cursor-pointer`}
                required
                value="Adatok frissítése"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  return (
    <div className="order-grid-container">
      {orders &&
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-info">
              <span>
                <strong>Rendelés száma:</strong> {order._id}
              </span>
              <span>
                <strong>Rendelés állapota:</strong> {order.status}
              </span>
              <span>
                <strong>Mennyiség:</strong> {order.cart.length}
              </span>
              <span>
                <strong>Végösszeg:</strong> <u>{order.totalPrice} HUF</u>
              </span>
            </div>
            <Link to={`/user/order/${order._id}`} className="order-link">
              <Button className="order-button">
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </div>
        ))}
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[22px] text-center font-[600] text-[#000000ba] pb-2 mr-5">
        Jelszó módosítás
      </h1>
      <div className="w-full">
        <form
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Jelenlegi jelszó</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Új jelszó</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Új jelszó ismét</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[35px] border border-[#1CBA6D] bg-[#1CBA6D] text-center text-[#fff] rounded-[5px] mt-3 cursor-pointer`}
              required
              value="Jelszó módosítása"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("Magyarország");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Otthoni",
    },
    {
      name: "Munkahelyi",
    },
    {
      name: "Vállalkozási",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Kérjük, töltsd ki az összes mezőt");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md bg-white rounded shadow-lg overflow-hidden">
            <div className="flex justify-end p-4">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="p-4 bg-gray-200">
              <h1 className="text-lg font-bold text-center text-gray-800">
                Új cím hozzáadása
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label htmlFor="country" className="block mb-1">
                  Ország
                </label>
                <select
                  name="country"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="input-field"
                >
                  <option value="Magyarország">Magyarország</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="city" className="block mb-1">
                  Város
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="address1" className="block mb-1">
                  Út, utca
                </label>
                <input
                  type="text"
                  id="address1"
                  required
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="address2" className="block mb-1">
                  Házszám, ajtó, emelet
                </label>
                <input
                  type="text"
                  id="address2"
                  required
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="zipCode" className="block mb-1">
                  Irányítószám
                </label>
                <input
                  type="number"
                  id="zipCode"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="addressType" className="block mb-1">
                  Cím típusa
                </label>
                <select
                  name="addressType"
                  id="addressType"
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                  className="input-field"
                >
                  <option value="">Válassz egy típust</option>
                  {addressTypeData &&
                    addressTypeData.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cím mentése
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex w-full items-center justify-between">
        <h1 className="text-[20px] font-[600] text-[#000000ba] pb-2">
          Mentett címeim
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Új hozzáadása</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div className="address-card" key={index}>
            <div className="address-info">
              <div className="address-header">
                <h3 className="font-semibold text-lg">
                  {item.addressType}
                  <br></br>
                </h3>
                <AiOutlineDelete
                  size={25}
                  className="delete-icon"
                  onClick={() => handleDelete(item)}
                />
              </div>
              <div className="address-content">
                <p className="text-xs">
                  <span className="font-semibold">Cím:</span> {item.zipCode}{" "}
                  {item.city}, {item.address1}, {item.address2}
                </p>
                <p className="text-xs">
                  <span className="font-semibold">
                    <br></br>Telefonszám:
                  </span>{" "}
                  +36{user && user.phoneNumber}
                </p>
              </div>
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          Nincsenek mentett címeid
        </h5>
      )}
    </div>
  );
};
export default ProfileContent;
