exports.policies = (type, body) => {
  if (type == "new") {
  } else if (type == "existing") {
  } else if (type == "delete") {
    return "";
  }
};
