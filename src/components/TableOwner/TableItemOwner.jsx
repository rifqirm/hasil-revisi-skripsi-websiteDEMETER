import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../elements/Button/Button";
import { gql, useMutation } from "@apollo/client";
import { HapusProductOwner, UpdateProductOwner } from "../../helpers/gqlHasura";

const TableItemOwner = ({ table, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempdata, setTempData] = useState({});

  return (
    <tr className={isEditing ? "bg-primary" : ""}>
      <td>{index + 1}</td>
      <td>{table.name2}</td>
      <td>{table.category2}</td>
      <td>{table.freshness2}</td>
      <td>{table.description2}</td>
      <td style={{ textAlign: "center" }}>{table.price2}</td>
    </tr>
  );
};

export default TableItemOwner;
