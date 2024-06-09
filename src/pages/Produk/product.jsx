import "./product.css"; // Import CSS directly
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  GetSearchProductList,
  GetSearchProductListOwner,
} from "../../helpers/gqlHasura";
import Input from "../../elements/Input/Input";
import Button from "../../elements/Button/Button";
import Card from "../../components/Card/Card";
import logo from "../../assets/logo2.svg.svg";

const ProductList = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(3);

  const {
    data: dataProduct,
    loading: loadingProduct,
    error: errorProduct,
  } = useQuery(GetSearchProductList, {
    variables: { name: `%${search}%`, limit: limit },
  });

  const {
    data: dataProductOwner,
    loading: loadingProductOwner,
    error: errorProductOwner,
  } = useQuery(GetSearchProductListOwner, {
    variables: { nameowner: `%${search}%`, limit1: limit },
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleLoadMore = () => {
    setLimit(limit + 3);
  };

  if (errorProduct || errorProductOwner) {
    console.log(errorProduct || errorProductOwner);
    return <p>Error: {(errorProduct || errorProductOwner).message}</p>;
  }

  return (
    <>
      <center>
        <div className="container text-center mt-5">
          <img
            style={{ height: 300, width: "300px" }}
            src={logo}
            alt="Hero Logo"
          />
        </div>
        <section className="productlist mt-3 mb-5">
          <div className="produkList">
            <h3>Katalog Produk</h3>
            <p>
              <center>
                Berisi daftar produk yang telah di buat di halaman permintaan
                produk dan Disetujui oleh Admin.
              </center>
            </p>

            <div className="handleSearch mb-3 w-25 mx-auto">
              <label className="label form-label mt-5">
                <strong>Masukan Pencarian:</strong>
              </label>
              <div className="inputWrapper">
                <input
                  type="text"
                  className="input form-control"
                  value={search}
                  onChange={handleSearch}
                  placeholder="🔍 Search Product..."
                />
              </div>
            </div>

            <div className="container mx-auto">
              <div className="mycard row w-100 justify-content-center">
                {loadingProduct || loadingProductOwner ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    {dataProduct?.Product?.map((card) => (
                      <Card key={card.id} card={card} />
                    ))}
                    {dataProductOwner?.ProductOwner?.map((card) => (
                      <Card key={card.id2} card={card} />
                    ))}
                  </>
                )}
              </div>
            </div>
            <Button
              type="button"
              className="btn btn-secondary2"
              label="Load More"
              onClick={handleLoadMore}
            />
          </div>
        </section>
      </center>
    </>
  );
};

export default ProductList;
