// An application depends on what roles it will have.

const allRoles = {
  user: ["common", "user"],
  admin: ["common", "commonAdmin", "admin"],
  superAdmin: ["common", "commonAdmin", "superAdmin"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
