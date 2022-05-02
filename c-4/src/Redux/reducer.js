const init = false;

export const reducer = (store = init, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return (store = true);
    case "LOGOUT":
      return (store = false);
    default:
      return store;
  }
};
