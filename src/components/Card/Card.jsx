import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./card.css";

const Card = ({ card }) => {
  const { image, name, description, id, image2, name2, description2, id2 } =
    card;

  return (
    <div className="card m-5" style={{ width: "25%" }}>
      <img src={image || image2} className="card-img-top2" alt="" />
      <div className="card-body">
        <h4 className="card-title">
          <strong>{name || name2}</strong>
        </h4>
        <p className="card-text">{description || description2}</p>
        {id2 && (
          <div className="approved-icon">
            <FontAwesomeIcon icon={faCheckCircle} color="green" />
            <span>Disetujui oleh Admin</span>
          </div>
        )}
        {id ? (
          <Link to={`/detailproduct/${id}`} className="btn btn-primary">
            Detail
          </Link>
        ) : (
          <Link
            to={`/detailproductapproved/${id2}`}
            className="btn btn-primary"
          >
            Detail
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
