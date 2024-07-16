import React, { useState } from "react";
import Category from "./Category";
import Product from "./Product";

const Admin = () => {
  const [showData, setShowData] = useState("category");
  return (
    <div>
      <h2>Admin</h2>
      <div className="row gx-4">
        <div className="col-3 mt-5">
          <a
            className="d-block text-muted text-decoration-none mb-2"
            onClick={() => setShowData("category")}
            style={{ cursor: "pointer" }}
          >
            Create Category
          </a>
          <a
            className="d-block text-muted text-decoration-none"
            onClick={() => setShowData("product")}
            style={{ cursor: "pointer" }}
          >
            Create Product
          </a>
        </div>
        <div className="col-5">
          {showData === "category" ? <Category /> : <Product />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
