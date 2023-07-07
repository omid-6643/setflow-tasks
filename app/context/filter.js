import React, { useEffect, useContext, useReducer } from "react";

import { useModel } from "@/hooks/useModel";

import reducer from "../reducer/filterReducer";

const initialState = {
  filteredModel: [],
  allModels: [],
  sort: "date",
  filters: {
    brand: "All",
    category: "All",
    active: null,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { data } = useModel();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOAD_MODELS", payload: data ?? [] });
  }, [data]);

  useEffect(() => {
    dispatch({ type: "FILTER_MODELS" });
  }, [data, state.filters, state.sort]);

  const updateSort = () => {
    dispatch({ type: "SORT_MODELS" });
  };

  const updateFilters = (e) => {
    let name = e?.name;
    let value = e?.value;

    dispatch({ type: "UPDATE_FILTERS", payload: { value, name } });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateSort,
        updateFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
