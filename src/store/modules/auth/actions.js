export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },

  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSJZmmzh6iSFPt7vFEXoXFaZbMSIJSWKA";

    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSJZmmzh6iSFPt7vFEXoXFaZbMSIJSWKA";
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to authenticate. Check your login data."
      );
      throw error;
    }

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    if (mode === "signup") {
      context.dispatch("setUserName", {
        name: payload.name,
        userId: responseData.localId,
        token: responseData.idToken,
      });
    }
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },

  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },

  logout(context) {
    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  async setUserName(context, payload) {
    const userId = payload.userId;
    const name = payload.name;
    const token = payload.token;

    const response = await fetch(
      `https://gifty-7a577-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/name.json?auth=` +
        token,
      {
        method: "PUT",
        body: JSON.stringify(name),
      }
    );
    if (!response.ok) {
      // error ...
    }
    context.commit("setName", name);
  },
  async loadName(context, payload) {
    const userId = payload;
    const response = await fetch(
      `https://gifty-7a577-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/name.json`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    context.commit("setName", responseData);
  },
};
