import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiHandler } from "../../api";
import { endpoint } from "../../api/endpoint";
import "./home.css";

const Home = () => {
  const [usersList, setUsersList] = useState("");
  const getUsers = async () => {
    const result = await apiHandler({
      url: endpoint.GETALLUSERS,
      method: "GET",
    });
    if (result.data.success) {
      setUsersList(result.data.users);
    } else {
      console.log("getUsers.result.data", result.data);
    }
  };

  const deleteUser = async (e, id) => {
    e.preventDefault();
    const result = await apiHandler({
      url: endpoint.DELETEUSER + id,
      method: "DELETE",
    });
    if (result.data.success) {
      console.log(result.data);
      getUsers();
    } else {
      console.log("getUsers.result.data", result.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="home">
      <div className="homeHeader"></div>
      <div className="container">
        <div className="homeSection p-4">
          <div className="text-end">
            <Link to={"/addUser"}>
              <button className="btn btn-secondary">Add User</button>
            </Link>
          </div>
          {usersList && usersList.length ? 
          <div className="userList row p-3">
            {usersList &&
              usersList.map((user, index) => {
                return (
                  <div className="p-2  col-lg-4 col-6" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          {user.firstName} {user.lastName}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {user.email}
                        </h6>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {user.mobile}
                        </h6>
                        <p className="card-text">
                          <strong> Address </strong>: {user.address1},{" "}
                          {user.address2 ? user.address2 : null}
                        </p>
                        <p>
                          <strong> State </strong>: {user.state}
                        </p>
                        <p>
                          <strong> Country </strong>: {user.country}
                        </p>
                        <p>
                          <strong> ZipCode </strong>: {user.zipCode}
                        </p>
                        <div className="cardbuttons">
                          <Link to={`/updateUser/${user._id}`}>
                            <button className="btn btn-secondary">Edit</button>
                          </Link>
                          <button
                            className="btn btn-secondary"
                            onClick={(e) => deleteUser(e, user._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          : <div className="text-center display-5">No Users.</div>}
        </div>
      </div>
    </div>
  );
};

export default Home;
