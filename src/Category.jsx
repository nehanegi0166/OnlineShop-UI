import React, { useState } from "react";
import { BASEURL } from "./constants";

const Category = () => {
  const initialState = {
    categoryName: "",
    categoryDescription: "",
  };
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryDescription: "",
  });

  const [error, setError] = useState();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });

    setErrors({
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateCategory();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await fetch(BASEURL + "/admin/create-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        setSuccessMessage("Category created successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000); // Display the success message for 2 seconds
        setError("");
        resetFormData();
      } else {
        const result = await response.json();
        setError(result.message);
        setSuccessMessage("");
      }
    } catch (error) {
      console.log("Category Network Error", error);
      setError(error);
    }
  };

  const validateCategory = () => {
    let validationErrors = {};
    if (!categoryData.categoryName) {
      validationErrors.categoryName = "Category Name is required";
    }
    return validationErrors;
  };

  const resetFormData = () => {
    setCategoryData({ categoryName: "", categoryDescription: "" });
  };

  return (
    <>
      <h4>Category</h4>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
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
          <label className="col col-form-label">Category Name</label>
          <div className="col">
            <input
              type="text"
              name="categoryName"
              id="categoryName"
              value={categoryData.categoryName}
              onChange={handleChange}
            />
            {errors.categoryName && (
              <div className="text-danger">{errors.categoryName}</div>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label className="col col-form-label">Category Decription</label>
          <div className="col">
            <input
              type="text"
              name="categoryDescription"
              id="categoryDescription"
              value={categoryData.categoryDescription}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-100 text-center">
          <button type="submit" className="btn btn-light btn-outline-dark mt-3">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Category;
