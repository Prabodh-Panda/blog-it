export const getIdsFromIdParamString = paramString =>
  paramString
    .split(",")
    .map(id => id.trim())
    .map(Number);

export const getParamStringFromIds = ids => ids.join(",");
