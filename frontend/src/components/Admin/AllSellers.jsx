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
    return <div>Betöltés folyamatban</div>;
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
    <div className="seller-container">
      {sellers.map((seller) => (
        <div key={seller._id} className="seller-card">
          <div className="seller-details">
            <h2 className="seller-name">{seller.name}</h2>
            <p className="seller-email">{seller.email}</p>
            <p className="seller-address">{seller.address}</p>
            <p className="seller-joined-at">
              Joined at: {seller.createdAt.slice(0, 10)}
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
        <div className="delete-modal">
          <div className="delete-modal-content">
            <div className="close-modal" onClick={() => setOpen(false)}>
              X
            </div>
            <h3 className="delete-message">
              Are you sure you want to delete this user?
            </h3>
            <div className="modal-buttons">
              <div className="cancel-button" onClick={() => setOpen(false)}>
                Cancel
              </div>
              <div
                className="confirm-button"
                onClick={() => setOpen(false) || handleDelete(userId)}
              >
                Confirm
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSellers;
