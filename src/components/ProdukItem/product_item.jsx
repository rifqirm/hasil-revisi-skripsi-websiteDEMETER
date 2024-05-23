import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../../styles/global.module.css";

const ProductItem = (props) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate("/keranjang");
    window.scrollTo(0, 0); // Scroll to the top
  };

  return (
    <div className={Styles.item_product}>
      <div>
        <img src={props.image} alt={props.title} />
        <h4>{props.title}</h4>
        <h5>{props.price}</h5>
        <Link to="/keranjang" onClick={handleBuyClick}>
          BELI
        </Link>
        {/* <Link to={'cart/' + props.action}>BELI</Link> */}
      </div>
    </div>
  );
};

export default ProductItem;
