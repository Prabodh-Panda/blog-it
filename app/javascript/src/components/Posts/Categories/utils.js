export const getIdsFromIdParamString = paramString =>
  paramString
    .split(",")
    .map(id => id.trim())
    .map(Number);

export const getParamStringFromIds = ids => ids.join(",");

export const filterByPropertyIncludes = (list, searchTerm, property) => {
  const lowerCaseSearch = searchTerm.toLowerCase();

  return list.filter(item =>
    item[property]?.toLowerCase().includes(lowerCaseSearch)
  );
};
