/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message"
import CountryItem from "./CountryItem";
import { useCities } from "./ProviderContext";

function CountryList() {
  const {isLoading, cities} = useCities()
    if (isLoading) return <Spinner />;

    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />
    
    const Countries = cities.reduce((accumulator, city) => {
      const { country, emoji } = city;
      const key = `${country}-${emoji}`;
    
      // Check if the key doesn't already exist in accumulator
      if (!accumulator.find(item => item.key === key)) {
        return [...accumulator, {country, emoji, key}]
      }
    
      return accumulator;
    }, []);
    console.log(Countries)
    console.log(Countries)
    return (
      <ul className={styles.CountryList}>
        {Countries.map((country) => (
          <CountryItem country={country} key={country.emoji} />
        ))}
      </ul>
    );
}

export default CountryList
