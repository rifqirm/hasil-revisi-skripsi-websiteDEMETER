import { useNavigate, useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Input from "../../elements/Input/Input";
import Button from "../../elements/Button/Button";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { UpdateProduct, HapusProduct } from "../../helpers/gqlHasura";

const DetailProduct = () => {
  const [hapusProduct] = useMutation(HapusProduct);
  const [updateProduct] = useMutation(UpdateProduct);
  const navigate = useNavigate();
  const { productId } = useParams();

  const formData = {
    productId: "",
    productName: "",
    productCathegory: "",
    productImage: "",
    productFreshness: "",
    productDesc: "",
    productPrice: "",
  };

  const [dataEdit, setDataEdit] = useState(formData);
  const [formErrors, setFormErrors] = useState(formData);

  const GetProductListbyId = gql`
    query MyQuery {
      Product(where: { id: { _eq: "${productId}" } }) {
        category
        description
        id
        image
        name
        price
        freshness
      }
    }
  `;

  const { data, loading, error } = useQuery(GetProductListbyId, {
    onCompleted: ({ Product: data }) =>
      setDataEdit({
        productId: data[0].id,
        productName: data[0].name,
        productCathegory: data[0].category,
        productImage: data[0].image,
        productFreshness: data[0].freshness,
        productDesc: data[0].description,
        productPrice: data[0].price,
      }),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data?.Product?.length) {
    return <div>Produk Tidak Ada</div>;
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = { ...formData };

    if (!dataEdit.productName) {
      errors.productName = "Nama produk harus diisi";
      valid = false;
    }
    if (!dataEdit.productCathegory) {
      errors.productCathegory = "Kategori produk harus dipilih";
      valid = false;
    }
    if (!dataEdit.productDesc) {
      errors.productDesc = "Deskripsi tambahan harus diisi";
      valid = false;
    }
    if (!dataEdit.productPrice) {
      errors.productPrice = "Jumlah produk yang diminta harus diisi";
      valid = false;
    }

    setFormErrors(errors);

    return valid;
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Apakah Anda Yakin?",
      text: "Hapus Produk Yang Anda Minta Ini! Produk " + dataEdit.productName,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#54B435",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        hapusProduct({
          variables: {
            id: dataEdit.productId,
          },
        })
          .then(() => {
            navigate("/produkList");
            swal({
              title: "Berhasil",
              text: "Produk " + dataEdit.productName + " Telah Dihapus",
              icon: "success",
              button: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log("Error:", error);
            Swal.fire({
              title: "Error",
              text: "Terjadi kesalahan saat menghapus produk",
              icon: "error",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Dibatalkan",
          text: "Produk Yang Anda Minta Tetap Aman :)",
          icon: "error",
          confirmButtonColor: "#54B435",
        });
      }
    });
  };

  const handleEdit = () => {
    if (validateForm()) {
      updateProduct({
        variables: {
          id: dataEdit.productId,
          object: {
            name: dataEdit.productName,
            price: dataEdit.productPrice,
            freshness: dataEdit.productFreshness,
            description: dataEdit.productDesc,
            category: dataEdit.productCathegory,
          },
        },
      })
        .then(() => {
          navigate("/produkList");

          Swal.fire({
            title: "Berhasil",
            text: "Produk " + dataEdit.productName + " berhasil diperbarui",
            icon: "success",
            confirmButtonColor: "#54B435",
          });
        })
        .catch((error) => {
          console.log("Error:", error);
          Swal.fire({
            title: "Error",
            text: "Terjadi kesalahan saat mengedit produk",
            icon: "error",
          });
        });
    }
  };

  return (
    <div className="container">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="container mt-5 w-50"
        id="productForm"
      >
        <h2>Detail Product</h2>
        <div className="mb-4 mt-4 w-50">
          <label className="form-label has-success" htmlFor="productName">
            Nama Produk
          </label>
          <Input
            type="text"
            name="productName"
            className="form-control"
            value={dataEdit.productName}
            onChange={handleInput}
          />
          <small className="text-danger">{formErrors.productName}</small>
        </div>
        <div className="mb-4 w-50">
          <label className="form-label" htmlFor="productCathegory">
            Kategori Produk Tanaman Hias
          </label>
          <select
            name="productCathegory"
            value={dataEdit.productCathegory}
            className="form-select"
            aria-label="Default select example"
            onChange={handleInput}
          >
            <option disable="" value="" hidden="">
              Pilih...
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
          <small className="text-danger">{formErrors.productCathegory}</small>
        </div>
        {/* <div className="mb-4 w-50">
          <label className="form-label" htmlFor="productImage">
            Gambar Produk
          </label>
          <img
            style={{
              width: "19.5rem",
              height: "12rem",
              marginBottom: "0.5rem",
            }}
            src={dataEdit.productImage}
          ></img>
          <input
            className="form-control"
            name="productImage"
            type="file"
            onChange={handleInput}
            accept="image/*"
          />
        </div> */}
        <div className="mb-4">
          <label className="form-label" htmlFor="productFreshness">
            Jenis Produk
          </label>
          <div className="form-check">
            <input
              checked={dataEdit.productFreshness === "Bibit"}
              id="Bibit"
              name="productFreshness"
              className="form-check-input"
              type="radio"
              value="Bibit"
              onChange={handleInput}
            />
            <label className="form-check-label" htmlFor="Bibit">
              Bibit
            </label>
          </div>
          <div className="form-check">
            <input
              checked={dataEdit.productFreshness === "Tanaman Hias"}
              id="Tanaman Hias"
              name="productFreshness"
              className="form-check-input"
              type="radio"
              value="Tanaman Hias"
              onChange={handleInput}
            />
            <label className="form-check-label" htmlFor="Tanaman Hias">
              Tanaman Hias
            </label>
          </div>
          <div className="form-check">
            <input
              checked={dataEdit.productFreshness === "Lainnya"}
              id="Lainnya"
              name="productFreshness"
              className="form-check-input"
              type="radio"
              value="Lainnya"
              onChange={handleInput}
            />
            <label className="form-check-label" htmlFor="Lainnya">
              Lainnya
            </label>
          </div>
          <small className="text-danger">{formErrors.productFreshness}</small>
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="productDesc">
            Deskripsi Tambahan
          </label>
          <textarea
            rows={5}
            className="form-control"
            name="productDesc"
            value={dataEdit.productDesc}
            onChange={handleInput}
          />
          <small className="text-danger">{formErrors.productDesc}</small>
        </div>
        <div className="mb-4 w-50">
          <label className="form-label" htmlFor="productPrice">
            Jumlah Produk Yang Diminta
          </label>
          <input
            type="number"
            className="form-control"
            name="productPrice"
            value={dataEdit.productPrice}
            onChange={handleInput}
          />
          <small className="text-danger">{formErrors.productPrice}</small>
        </div>
        <Button
          onClick={handleEdit}
          className="btn btn-warning me-5 mb-5"
          label="Edit"
        />
        <Button
          onClick={handleDelete}
          className="btn btn-danger ms-5 mb-5"
          label="Hapus"
        />
      </form>
    </div>
  );
};

export default DetailProduct;
