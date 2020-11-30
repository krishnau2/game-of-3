export const getCurrentUserSession = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

export const clearSession = () => {
  sessionStorage.removeItem("user");
};

export const createCurrentUserSession = user => {
  sessionStorage.setItem("user", JSON.stringify(user));
};
