import { useEffect, useState } from "react";
import "./Details.css";
import { useParams } from "react-router";
import { flipWatched, getItemById } from "../../services/AppServices";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";

export default function Details() {
  const params = useParams();
  const [itemDetails, setItemDetails] = useState({itemDetails:{}, item: {}, ratings: []});

  useEffect(() => {
    getItemById(
      params.id,
      window.localStorage.getItem("username"),
      window.localStorage.getItem("password")
    ).then((res) => {
      if (res.data.status == 200) {
        setItemDetails({itemDetails: res.data.response,  item: JSON.parse(res.data.response.details), ratings: JSON.parse(res.data.response.details).Ratings});
      }
    });
  }, []);

  const flipItemWatched = (id) => {
    flipWatched(window.localStorage.getItem("userId"),
    window.localStorage.getItem("username"),
    window.localStorage.getItem("password"),
    !itemDetails.itemDetails.watched,
    id
  ).then(res => {
    setItemDetails({itemDetails: res.data.response,  item: JSON.parse(res.data.response.details), ratings: JSON.parse(res.data.response.details).Ratings});
  })

  };

  return (
    <div className="item-container">
      <BreadCrumbs item={itemDetails.item.Title}/>
      <div className="main-container">
        <div className="poster-container">
          <img src={itemDetails.item.Poster} width="100%" height="100%" />
        </div>
        <div className="details-container">
          <p>
            <span className="column-title">Name:</span> {itemDetails.item.Title}
          </p>
          <p>
            <span className="column-title">Year:</span> {itemDetails.item.Year}
          </p>
          <p>
            <span className="column-title">Released:</span> {itemDetails.item.Released}
          </p>
          <p>
            <span className="column-title">Director:</span> {itemDetails.item.Director}
          </p>
          <p>
            <span className="column-title">IMDB Rating:</span> {itemDetails.item.imdbRating}
          </p>

          {
            itemDetails.ratings.map((itemRating) =>  <p key={itemRating.Source}><span className="column-title">{itemRating.Source} Rating:</span> {itemRating.Value}</p>)
          }
         
          <p>
            <span className="column-title">Plot:</span> {itemDetails.item.Plot}
          </p>
          <input
            id="watchedButton"
            type="button"
            value={itemDetails.itemDetails.watched ? "SET AS UNWATCHED" : "SET AS WATCHED"}
            onClick={() => flipItemWatched(itemDetails.itemDetails.id)}
          />
        </div>
      </div>
    </div>
  );
}
