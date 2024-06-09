import { useQuery } from "@apollo/client";
import TableItemOwner from "./TableItemOwner";
import { GetProductListOwner } from "../../helpers/gqlHasura";

const TableOwner = () => {
  const { data, loading, error } = useQuery(GetProductListOwner);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Daftar Produk</h2>
      <table className="table table-striped w-100" id="data-table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama Produk</th>
            <th scope="col">Kategori Produk Tanaman Hias</th>
            <th scope="col">Jenis Produk</th>
            <th scope="col">Deskripsi Tambahan</th>
            <th scope="col" style={{ textAlign: "center" }}>
              Jumlah Produk
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.ProductOwner.map((table, index) => (
            <TableItemOwner key={table.id2} table={table} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOwner;
