/* eslint-disable react/prop-types */
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "./ProviderContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, date, emoji, id, position } = city;
  const { currentCity, deleteCity } = useCities();
  const condcity = city.id === currentCity.id;
  function onDelete(e){
    e.preventDefault()
    console.log("delete")
    deleteCity(id)
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          condcity ? styles.cityItemActive : ""
        } `}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button onClick={onDelete} className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
