import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../elements/Button/Button";
// import ProductsContext from "../../context/ProductsContext"
import { gql, useMutation } from "@apollo/client";
import {
  GetProductList,
  HapusProduct,
  UpdateProduct,
} from "../../helpers/gqlHasura";

const TableItem = ({ table, index }) => {
  // const { products, setProducts } = useContext(ProductsContext)

  const [isEditing, setIsEditing] = useState(false);
  const [tempdata, setTempData] = useState({});

  // console.log(tempdata)

  const [hapusProduct] = useMutation(HapusProduct, {
    refetchQueries: [{ query: GetProductList }],
  });

  const [updateProduct] = useMutation(UpdateProduct, {
    refetchQueries: [{ query: GetProductList }],
  });

  const editHandler = (table) => {
    setIsEditing(true);
    setTempData(table);
  };

  //   const saveHandler = () => {
  //     setIsEditing(false);
  //     console.log(tempdata);
  //     updateProduct({
  //       variables: {
  //         id: tempdata.id,
  //         object: {
  //           name: tempdata.name,
  //           price: tempdata.price,
  //           freshness: tempdata.freshness,
  //           category: tempdata.category,
  //           description: tempdata.description, // Adding the new field
  //         },
  //       },
  //     });
  //   };

  //   const deleteHandler = (id) => {
  //     console.log(id);

  //     if (window.confirm("Are you sure you want to delete this item?")) {
  //       hapusProduct({
  //         variables: {
  //           id: id,
  //         },
  //       });
  //     }
  //   };

  return (
    <tr className={isEditing ? "bg-primary" : ""}>
      <td>{index + 1}</td>
      <td
        className={isEditing ? "text-white border-2 border-danger" : ""}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onInput={(e) =>
          setTempData((prev) => ({ ...prev, name: e.target.textContent }))
        }
      >
        {table.name}
      </td>
      <td
        className={isEditing ? "text-white" : ""}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onInput={(e) =>
          setTempData((prev) => ({ ...prev, category: e.target.textContent }))
        }
      >
        {table.category}
      </td>
      <td
        className={isEditing ? "text-white" : ""}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onInput={(e) =>
          setTempData((prev) => ({ ...prev, freshness: e.target.textContent }))
        }
      >
        {table.freshness}
      </td>
      <td
        className={isEditing ? "text-white" : ""}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onInput={(e) =>
          setTempData((prev) => ({
            ...prev,
            description: e.target.textContent,
          }))
        }
      >
        {table.description}
      </td>
      <td
        className={isEditing ? "text-white" : ""}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onInput={(e) =>
          setTempData((prev) => ({ ...prev, price: e.target.textContent }))
        }
      >
        {table.price}
      </td>
    </tr>
  );
};

export default TableItem;
