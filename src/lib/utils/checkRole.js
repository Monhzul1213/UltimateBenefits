export const checkRole = (role) => {
  const havePermission =
    (role.toLowerCase() === "admin") | (role.toLowerCase() === "hr");
  return havePermission;
};
