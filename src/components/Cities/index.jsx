import styles from "./Cities.module.css";
import City from "../City";
import PropTypes from "prop-types";
import Message from "../Message";
import { NavLink } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";

Cities.propTypes = {
  cities: PropTypes.array,
};

// function Cities({ cities }) {
function Cities() {
  const { cities } = useCities();
  // console.log(useCities());

  if (!cities.length)
    return (
      <Message message="Welcome you, les't add your first country you traveled by clicking on the map 🥰" />
    );
  return (
    <div className={styles.countries}>
      <ul className={styles.list}>
        {cities?.map((ct) => (
          <NavLink
            to={`${ct.id}?lat=${ct.position.lat}&lng=${ct.position.lng}`}
            key={ct.id}
          >
            <City city={ct} />
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

export default Cities;
