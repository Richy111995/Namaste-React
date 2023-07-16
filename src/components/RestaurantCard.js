import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => { 
    const { resData } = props;

    const {
            cloudinaryImageId,
             name,
             cuisines,
             avgRating,
             costForTwo,
             deliveryTime
            } = resData?.data;

    return (
    <div className="res-card" style={{background: "#f0f0f0"}}>
            <img className="res-logo" 
            alt="res-logo"
            src={CDN_URL + resData.data.cloudinaryImageId}
            />
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>Rs. {costForTwo / 100} Cost for two</h4>
            <h4>{deliveryTime } minutes </h4>
    </div>
    );
};

export default RestaurantCard;