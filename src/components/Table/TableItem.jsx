import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../elements/Button/Button";
import { gql, useMutation } from "@apollo/client";
import { HapusProduct, UpdateProduct } from "../../helpers/gqlHasura";

const TableItem = ({ table, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempdata, setTempData] = useState({});

  return (
    <tr className={isEditing ? "bg-primary" : ""}>
      <td>{index + 1}</td>
      <td>{table.name}</td>
      <td>{table.category}</td>
      <td>{table.freshness}</td>
      <td>{table.description}</td>
      <td style={{ textAlign: "center" }}>{table.price}</td>
    </tr>
  );
};

export default TableItem;
