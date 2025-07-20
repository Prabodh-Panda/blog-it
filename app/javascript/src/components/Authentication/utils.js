export const getOrganizationOptions = organizations =>
  organizations.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
