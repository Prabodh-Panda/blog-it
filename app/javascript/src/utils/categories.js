export const getCategoryOptions = categories => {
  if (!categories) return [];

  return categories.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
};
