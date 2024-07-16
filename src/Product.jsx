import React, { useState, useEffect } from "react";
import { BASEURL } from "./constants";

const Product = () => {
  const initialState = {
    productName: "",
    productDescription: "",
    productPrice: "",
    productQuantity: "",
    productCategoryId: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await fetch(BASEURL + "/admin/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccessMessage("Category created successfully");
        setError("");
      } else {
        const result = await response.json();
        setError(result.message);
        setSuccessMessage("");
      }
      console.log(response);
      setFormData(initialState);
    } catch (error) {
      console.log("Product Network Error", error);
      setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASEURL + "/admin/categories");
        console.log(response);
        const data = await response.json();
        setCategories(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h4>Product</h4>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {successMessage && (
        <p style={{ color: "green" }}>Success: {successMessage}</p>
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #00000057",
          padding: "30px",
          borderRadius: "5px",
        }}
        className="mt-3"
      >
        <div className="form-group row gx-7">
          <label className="col-3 col-form-label">Product Name</label>
          <div className="col-4">
            <input
              type="text"
              name="productName"
              id="productName"
              value={formData.productName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row gx-7">
          <label className="col col-form-label">Product Description</label>
          <input
            type="text"
            name="productDescription"
            id="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
          />
        </div>
        <div className="form-group row gx-7">
          <label className="col col-form-label">Product Price</label>
          <input
            type="text"
            name="productPrice"
            id="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
          />
        </div>
        <div className="form-group row gx-7">
          <label className="col col-form-label">Product Quantity</label>
          <input
            type="text"
            name="productQuantity"
            id="productQuantity"
            value={formData.productQuantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group row gx-7">
          <label className="col col-form-label">Category</label>
          <select
            className="w-10"
            value={formData.productCategoryId}
            onChange={handleChange}
            name="productCategoryId"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option
                key={category.categoryId}
                name="categoryId"
                value={category.categoryId}
              >
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Product;
