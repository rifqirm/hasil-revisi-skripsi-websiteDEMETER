import { useState } from "react";
import { useMutation } from "@apollo/client";
import { InsertProduct, GetProductList } from "../../helpers/gqlHasura";
import Swal from "sweetalert2";
import uuid from "react-uuid";

const Form = ({ product }) => {
  const [insertProduct] = useMutation(InsertProduct, {
    refetchQueries: [{ query: GetProductList }],
  });

  const formData = {
    productName: "",
    productCathegory: "",
    productFreshness: "",
    productDesc: "",
    productPrice: "",
  };

  const formErrors = {
    productName: "",
    productCathegory: "",
    productFreshness: "",
    productDesc: "",
    productPrice: "",
  };

  const [data, setData] = useState(formData);
  const [errors, setErrors] = useState(formErrors);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "productName" && value.length > 30) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        productName: "Please input a valid product name",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        productName: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!data.productName) newErrors.productName = "Harap Isi Nama Produk!";
    if (!data.productCathegory)
      newErrors.productCathegory = "Harap Pilih Kategori Produk!";
    if (!data.productFreshness)
      newErrors.productFreshness = "Harap Pilih Jenis Produk!";
    if (!data.productDesc)
      newErrors.productDesc = "Harap Isi Deskripsi Tambahan!";
    if (!data.productPrice)
      newErrors.productPrice = "Harap Isi Banyaknya Produk Yang Diminta!";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await insertProduct({
          variables: {
            object: {
              id: uuid(),
              name: data.productName,
              price: data.productPrice,
              description: data.productDesc,
              freshness: data.productFreshness,
              category: data.productCathegory,
            },
          },
        });

        setData(formData);
        setErrors(formErrors);

        Swal.fire({
          icon: "success",
          title: "Data berhasil dikirim!",
          text: "Data Produk Berhasil Masuk kedalam Tabel Dibawah Ini!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error inserting product:", error);
        Swal.fire({
          icon: "error",
          title: "Terjadi kesalahan!",
          text: "Data gagal dikirim.",
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mt-5 w-50"
      id="productForm"
    >
      <h2>Detil Produk</h2>
      <div className="mb-4 mt-4 w-50">
        <label className="form-label has-success" htmlFor="productName">
          Nama Produk
        </label>
        <input
          type="text"
          name="productName"
          className={`form-control ${errors.productName ? "is-invalid" : ""}`}
          minLength={6}
          maxLength={50}
          value={data.productName}
          onChange={handleInput}
        />
        <small id="nameError" className="text-danger">
          {errors.productName}
        </small>
      </div>
      <div className="mb-4 w-50">
        <label className="form-label" htmlFor="productCathegory">
          Kategori Produk Tanaman Hias
        </label>
        <select
          name="productCathegory"
          value={data.productCathegory}
          className={`form-select ${
            errors.productCathegory ? "is-invalid" : ""
          }`}
          aria-label="Default select example"
          onChange={handleInput}
        >
          <option disable="" value="" hidden="">
            Plih...
          </option>
          <option value="Tanaman Hias Bunga">Tanaman Hias Bunga</option>
          <option value="Tanaman Hias Daun">Tanaman Hias Daun</option>
          <option value="Tanaman Hias Batang atau Pohon">
            Tanaman Hias Batang atau Pohon
          </option>
          <option value="Tanaman Hias Buah">Tanaman Hias Buah</option>
          <option value="Tanaman Hias Akar">Tanaman Hias Akar</option>
          <option value="Lainnya">Lainnya</option>
        </select>
        <small id="cathegoryError" className="text-danger">
          {errors.productCathegory}
        </small>
      </div>
      <div className="mb-4">
        <label className="form-label" htmlFor="productFreshness">
          Jenis Produk
        </label>
        <div className="form-check">
          <input
            id="new"
            name="productFreshness"
            className="form-check-input"
            type="radio"
            value="Bibit"
            checked={data.productFreshness === "Bibit"}
            onChange={handleInput}
          />
          <label className="form-check-label" htmlFor="new">
            Bibit
          </label>
        </div>
        <div className="form-check">
          <input
            id="second"
            name="productFreshness"
            className="form-check-input"
            type="radio"
            value="Tanaman Hias"
            checked={data.productFreshness === "Tanaman Hias"}
            onChange={handleInput}
          />
          <label className="form-check-label" htmlFor="second">
            Tanaman Hias
          </label>
        </div>
        <div className="form-check">
          <input
            id="refurbished"
            name="productFreshness"
            className="form-check-input"
            type="radio"
            value="Lainnya"
            checked={data.productFreshness === "Lainnya"}
            onChange={handleInput}
          />
          <label className="form-check-label" htmlFor="refurbished">
            Lainnya
          </label>
        </div>
        <small id="new,second,refurbished" className="text-danger">
          {errors.productFreshness}
        </small>
      </div>
      <div className="mb-4">
        <label className="form-label" htmlFor="productDesc">
          Deskripsi Tambahan
        </label>
        <textarea
          rows={5}
          className={`form-control ${errors.productDesc ? "is-invalid" : ""}`}
          name="productDesc"
          value={data.productDesc}
          onChange={handleInput}
        />
        <small id="descError" className="text-danger">
          {errors.productDesc}
        </small>
      </div>
      <div className="mb-4 w-50">
        <label className="form-label" htmlFor="productPrice">
          Jumlah Produk Yang Diminta
        </label>
        <input
          type="number"
          className={`form-control ${errors.productPrice ? "is-invalid" : ""}`}
          name="productPrice"
          value={data.productPrice}
          onChange={handleInput}
        />
        <small id="priceError" className="text-danger">
          {errors.productPrice}
        </small>
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-4">
        Submit
      </button>
    </form>
  );
};

export default Form;
