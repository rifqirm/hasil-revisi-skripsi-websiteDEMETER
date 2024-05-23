import { Link } from "react-router-dom"
import "./card.css"

const Card = ({ card }) => {

    // console.log(card)

    return (
        <div className="card m-5" style={{ width: "25%" }}>
            <img src={card.image}
                className="card-img-top2"
                alt="image.jpg" />
            <div className="card-body">
                <h4 className="card-title"><strong>{card.name}</strong></h4>
                <p className="card-text">
                    {card.description}
                </p>
                <Link
                    to={`/detailproduct/${card.id}`}
                    className="btn btn-primary">
                    Detail
                </Link>
            </div>
        </div>
    );
}

export default Card