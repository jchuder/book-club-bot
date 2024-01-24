module.exports = (rolesMember, rolesRequired) => {
  return rolesRequired.filter((element) => rolesMember.includes(element)).length >= 1;
};
