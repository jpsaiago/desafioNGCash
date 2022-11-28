export const storageInfo = {
  get: function () {
    const username = window.localStorage.getItem("username");
    const token = window.localStorage.getItem("token");
    const tokenExp = window.localStorage.getItem("tokenExp");
    return { username, token, tokenExp };
  },

  set: async function (username: string, token: string, tokenExp: Date) {
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("tokenExp", `${tokenExp}`);
  },
};
