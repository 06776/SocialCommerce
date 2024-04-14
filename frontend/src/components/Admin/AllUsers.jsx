import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/user";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@material-ui/core";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import "../../styles/adminUsers.css";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/user/delete-user/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });

    dispatch(getAllUsers());
  };

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <div className="card-container">
          {users && users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="user-card">
                <div className="user-info">
                  <p>
                    <strong>Azonosító:</strong> {user._id}
                  </p>
                  <p>
                    <strong>Név:</strong> {user.name}
                  </p>
                  <p>
                    <strong>E-mail:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Telefonszám:</strong> {"+36" + user.phoneNumber}
                  </p>
                  <p>
                    <strong>Jogosultság:</strong> {user.role}
                  </p>
                  <p>
                    <strong>Regisztrált:</strong> {user.createdAt.slice(0, 10)}
                  </p>
                </div>
                <div className="user-actions">
                  <Button onClick={() => setUserId(user._id) || setOpen(true)}>
                    <AiOutlineDelete size={20} />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p>Nincsenek felhasználók</p>
          )}
        </div>
        {open && (
          <div className="modal">
            <div className="modal-content">
              <h3 className="modal-title">Törlöd a felhasználót?</h3>
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
    </div>
  );
};

export default AllUsers;
