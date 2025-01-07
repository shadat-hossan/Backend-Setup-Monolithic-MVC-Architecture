const allRoles = {
  client: ["common", "client"],
  employee: ["common", "employee"],
  admin: ["common", "admin"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
