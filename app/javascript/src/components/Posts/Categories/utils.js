export const getIdsFromIdParamString = paramString =>
  paramString
    .split(",")
    .map(id => id.trim())
    .map(Number);

export const getParamStringFromIds = ids => ids.join(",");

export const getFilteredCategories = (categories, searchTerm) => {
  const lowerCaseSearch = searchTerm.toLowerCase();

  return categories.filter(({ name }) =>
    name.toLowerCase().includes(lowerCaseSearch)
  );
};
