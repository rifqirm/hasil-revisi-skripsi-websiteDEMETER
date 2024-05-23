import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import Table from "../../components/Table/Table";
// import { useContext, useState } from 'react';
// import ProductsContext from "../../context/ProductsContext";

function CreateProduct() {
  return (
    <>
      <Header />
      <Form />
      <Table />
    </>
  );
}

export default CreateProduct;
