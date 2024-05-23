import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetSearchProductList } from "../../helpers/gqlHasura";
import Input from "../../elements/Input/Input";
import Button from "../../elements/Button/Button";
import Card from "../../components/Card/Card";
import logo from "../../assets/logo2.svg.svg";
import Styles from "./product.css";

const ProductList = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(3);

  const { data, loading, error } = useQuery(GetSearchProductList, {
    variables: { name: `%${search}%`, limit: limit },
  });

  if (error) {
    console.log(error);
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleLoadMore = () => {
    setLimit(limit + 3);
  };

  return (
    <>
      <center>
        <div className="container text-center">
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
                produk.
              </center>
            </p>

            <div className={`${Styles.handleSearch} mb-3 w-25 mx-auto`}>
              <label className={`${Styles.label} form-label mt-5`}>
                <strong>Masukan Pencarian:</strong>
              </label>
              <div className={Styles.inputWrapper}>
                <input
                  type="text"
                  className={`${Styles.input} form-control`}
                  value={search}
                  onChange={handleSearch}
                  placeholder="🔍 Search Product..."
                />
              </div>
            </div>

            <div className="container mx-auto">
              <div className="mycard row w-100 justify-content-center">
                {data?.Product.map((card) => (
                  <Card key={card.id} card={card} />
                ))}
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
