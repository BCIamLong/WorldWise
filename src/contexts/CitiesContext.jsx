import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import PropTypes from "prop-types";
import { deleteCity, getCities, postCity } from "../services/apiCities";
import { getCity } from "../services/apiCities";
import { useTitle } from "../hooks/useTitle";

CitiesProvider.propTypes = {
  children: PropTypes.any,
};

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  city: {},
  error: "",
};

function reducer(state, action) {
  const { cities } = state;
  const { type, payload } = action;
  switch (type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: payload, isLoading: false };
    case "city/loaded":
      return { ...state, city: payload, isLoading: false };

    case "city/created":
      return {
        ...state,
        cities: [...cities, payload],
        isLoading: false,
        city: payload,
      };

    case "city/deleted":
      return {
        ...state,
        cities: cities.filter(city => city.id !== payload),
        isLoading: false,
        city: {},
      };

    case "rejected":
      return { ...state, error: payload, isLoading: false };

    default:
      throw new Error("Unknown action!");
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, isLoading, city, error } = state;

  useTitle();
  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        const citiesData = await getCities();

        dispatch({ type: "cities/loaded", payload: citiesData });
      } catch (err) {
        alert(err.message);
        dispatch({ type: "rejected", payload: err.message });
      }
    };
    fetchCities();
  }, []);

  const fetchCity = useCallback(
    async id => {
      console.log(id, city.id);
      if (+id === city.id) return;

      dispatch({ type: "loading" });
      try {
        const cityData = await getCity(id);
        dispatch({ type: "city/loaded", payload: cityData });
      } catch (err) {
        alert(err.message);
        dispatch({ type: "rejected", payload: err.message });
      }
    },
    [city.id]
  );

  const createCity = async newCity => {
    dispatch({ type: "loading" });
    try {
      await postCity(newCity);
      dispatch({ type: "city/created", payload: newCity });
    } catch (err) {
      alert(err.message);
      dispatch({ type: "rejected", payload: err.message });
    }
  };

  const removeCity = async id => {
    dispatch({ type: "loading" });
    try {
      await deleteCity(id);
      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch (err) {
      alert(err.message);
      dispatch({ type: "rejected", payload: err.message });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        city,
        fetchCity,
        createCity,
        removeCity,
        dispatch,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context was using outside the CitiesProvider");

  return context;
};

export { useCities, CitiesProvider };
