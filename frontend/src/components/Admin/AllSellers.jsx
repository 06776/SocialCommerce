import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@material-ui/core";
import "../../styles/adminSellers.css";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getAllSellers } from "../../redux/actions/sellers";
import { Link } from "react-router-dom";

const AllSellers = () => {
  const dispatch = useDispatch();
  const { sellers } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  if (!sellers) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/shop/delete-seller/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });

    dispatch(getAllSellers());
  };

  return (
    <div className="card-container">
      {sellers.map((seller) => (
        <div key={seller._id} className="seller-card">
          <div className="seller-info">
            <p>
              <strong>Azonosító:</strong> {seller._id}
            </p>
            <h2>
              <strong>Név:</strong> {seller.name}
            </h2>
            <p>
              <strong>E-mail:</strong> {seller.email}
            </p>
            <p>
              <strong>Telefonszám:</strong> {"+36" + seller.phoneNumber}
            </p>
            <p>
              <strong>Cím:</strong> {seller.zipCode + " " + seller.address}
            </p>
            <p>
              <strong>Regisztrált:</strong> {seller.createdAt.slice(0, 10)}
            </p>
          </div>
          <div className="seller-actions">
            <Link to={`/shop/preview/${seller._id}`} className="seller-link">
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
            <Button onClick={() => setUserId(seller._id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </div>
        </div>
      ))}
      {open && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="modal-title">
              Törlöd az eladót?
            </h3>
            <div className="modal-buttons">
              <div className="cancel-button" onClick={() => setOpen(false)}>
                Nem
              </div>
              <div
                className="confirm-button"
                onClick={() => setOpen(false) || handleDelete(userId)}
              >
                Igen
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSellers;
