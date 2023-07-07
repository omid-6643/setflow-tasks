const filterReducer = (state, action) => {
  if (action.type === "LOAD_MODELS") {
    return {
      ...state,
      allModels: [...action.payload],
      filteredModel: [...action.payload],
      filters: { ...state.filters },
    };
  }

  if (action.type === "UPDATE_SORT") {
    return { ...state, sort: action.payload };
  }

  if (action.type === "SORT_MODELS") {
    const {  filteredModel } = state;
    let tempModels = [...filteredModel];

    tempModels = tempModels.sort(
      (a, b) => new Date(a.nextDate) - new Date(b.nextDate)
    );

    return { ...state, filteredModel: tempModels };
  }

  if (action.type === "UPDATE_FILTERS") {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === "FILTER_MODELS") {
    const { allModels } = state;
    const { category, brand, active } = state.filters;

    let tempModels = [...allModels];

    if (category !== "All") {
      tempModels = tempModels.filter((model) => model.category === category);
    }

    if (brand !== "All") {
      tempModels = tempModels.filter((model) => model.brand === brand);
    }
    if (active !== null) {
      tempModels = tempModels.filter((model) => model.isActive === active);
    }

    return { ...state, filteredModel: tempModels };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filterReducer;
