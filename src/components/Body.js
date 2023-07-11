import RestaurantCard from "./RestaurantCard";
import { useEffect, useState} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body =() => {

// State Variable - Super powerful variable
const [listOfRestaurants, setListOFRestaurant] = useState([]); 

const [filteredRestaurant , setFilteredRestaurant] = useState([]);

const [searchText, setSearchText] = useState ("");

console.log("Body Rendered");

useEffect(() => {
        fetchData();
        },
        []);


const fetchData = async () => {
                const data = await fetch
                ("https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.084604&lng=77.547411&page_type=DESKTOP_WEB_LISTING"
                );

                const json = await data.json();

                // Optional Chaining
                setListOFRestaurant(json?.data?.cards[2]?.data?.data.cards); 
                setFilteredRestaurant(json?.data?.cards[2]?.data?.data.cards);              

};


    return listOfRestaurants.length === 0 ? (
    <Shimmer/>
    ) : (
            <div className="body">
                <div className="filter">
                        <input 
                                type="text" 
                                className= "search-box" 
                                value={searchText} 
                                onChange={(e) => {
                                setSearchText(e.target.value);
                        }}
                        />
                        <button 
                        onClick={() =>{
                                // Filter the restaurant and update the UI
                                // searchText
                                console.log(searchText);

                                const filteredRestaurant = listOfRestaurants.filter((res) => 
                                res.data.name.toLowerCase().includes(searchText)
                                );

                                setFilteredRestaurant(filteredRestaurant);
                        }}
                        >
                        Search
                        </button>
                <button 
                        className="filter-btn" 
                        onClick={() => {
                       setListOFRestaurant()
                       const filteredList = listOfRestaurants.filter(
                        (res)=> res.data.avgRating > 4
                        );
                        setListOFRestaurant(filteredList);
                        }}
                        >
                        Top Rated Restaurant
                        </button>
                        </div>
                            <div className="res-container">
                                  {filteredRestaurant.map((restaurant) => (
                                  <Link 
                                  key = {restaurant.data.id}
                                  to = {"/restaurants/" + restaurant.data.id}
                                  >
                                  < RestaurantCard  resData ={restaurant} />
                                  </Link>
                                  ))}
                          </div>
                    </div>
            );
    };


    export default Body;
