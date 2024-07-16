import React, { useState, useEffect } from "react";
import { BASEURL } from "./constants";

const Customer = () => {
  //Data for Products
  const [productData, setProductData] = useState([]);
  //Data for Categories
  const [categoriesData, setCategoriesData] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      return fetch(BASEURL + "/products")
        .then((response) => response.json())
        .then((prodData) => {
          if (prodData.length === 0) {
            setMessage("No product found");
          } else {
            setProductData(prodData);
          }
        })
        .catch((error) => setError(error));
    };

    const fetchCategories = async () => {
      return fetch(BASEURL + "/admin/categories")
        .then((response) => response.json())
        .then((categoryData) => {
          if (categoryData.length === 0) {
            setMessage("No category found");
          } else {
            const sortedCategories = categoryData.sort((a, b) =>
              a.categoryName.localeCompare(b.categoryName)
            );

            setCategoriesData(sortedCategories);
          }
        })
        .catch((error) => setError(error));
    };
    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategory = async (categoryId) => {
    const response = fetch(BASEURL + "/product/" + categoryId)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || "Something went wrong");
          });
        }
        setError("");
        return response.json();
      })
      .then((data) => setProductData(data))
      .catch((error) => {
        console.log("Error", error.message);
        setError(error.message);
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-3 mt-2">
          <h4 className="text-muted">Categories</h4>
          <div
            className="p-3"
            style={{
              backgroundColor: "#d0d0d02b",
              overflowY: "scroll",
              height: "400px",
            }}
          >
            {message && <span>{message}</span>}
            {categoriesData.map((category) => (
              <p
                className="py-2 m-0 text border-bottom text-capitalize"
                onClick={() => handleCategory(category.categoryId)}
                style={{ cursor: "pointer" }}
              >
                {category.categoryName}
              </p>
            ))}
          </div>
        </div>
        <div className="col-9">
          <h1>Products</h1>
          <div className="row">
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!error &&
              productData.map((products) => (
                <div className="card col-3 p-1 m-2">
                  <div className="card-body">
                    <span key={products.id} className="w-10 list-style-none">
                      <div className="row">
                        <div>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="mt-2 mb-0">{products.productName}</h4>
                        </div>
                        <div>
                          <small class="text-muted">
                            {products.productDescription}
                          </small>
                        </div>
                        <div>
                          <span class="text-muted">
                            Rs. {products.productPrice}
                          </span>
                        </div>
                        <div className="flex">
                          <span style={{ marginRight: "20px" }}>
                            <small>Quantity: {products.productQuantity}</small>
                          </span>
                          <span>
                            <small>
                              Category: {products.productCategoryName}
                            </small>
                          </span>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
