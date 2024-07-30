import { useQuery } from "@apollo/client";
import TableItem from "./TableItem";
import { GetProductList } from "../../helpers/gqlHasura";
import "./table.css";

const Table = () => {
  const { data, loading, error } = useQuery(GetProductList);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Daftar Produk</h2>
      <table className="table table-striped w-full" id="data-table">
        <thead>
          <tr>
            <th className="column-no">No</th>
            <th className="column-name">Nama Produk</th>
            <th className="column-category">Kategori Produk Tanaman Hias</th>
            <th className="column-type">Jenis Produk</th>
            <th className="column-description">Deskripsi Tambahan</th>
            <th className="column-quantity">Jumlah Produk</th>
          </tr>
        </thead>
        <tbody>
          {data?.Product.map((table, index) => (
            <TableItem key={table.id} table={table} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
