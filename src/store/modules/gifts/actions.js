const PROJECT_URL = process.env.VUE_APP_FIREBASE_PROJECT_URL;

export default {
  async addGift(context, data) {
    const userId = context.rootGetters.userId;
    const giftData = {
      name: data.name,
      price: data.price,
      url: data.url,
      imgUrl: data.imgUrl,
      show: true,
      isReserved: false,
      quantity: data.quantity,
    };

    const token = context.rootGetters.token;

    const giftID = "_" + Math.random().toString(36).substr(2, 9);
    const response = await fetch(
      `${PROJECT_URL}/users/${userId}/gifts/${giftID}.json?auth=` + token,
      {
        method: "PUT",
        body: JSON.stringify(giftData),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to add the gift!"
      );
      throw error;
    }

    context.commit("addGift", {
      ...giftData,
      id: giftID,
    });
  },

  async loadGifts(context, payload) {
    const userId = payload;
    const response = await fetch(`${PROJECT_URL}/users/${userId}/gifts.json`);
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    const gifts = [];

    for (const key in responseData) {
      const gift = {
        id: key,
        name: responseData[key].name,
        price: responseData[key].price,
        url: responseData[key].url,
        imgUrl: responseData[key].imgUrl,
        show: responseData[key].show,
        isReserved: responseData[key].isReserved,
        quantity: responseData[key].quantity,
      };
      gifts.push(gift);
    }
    context.commit("setGifts", gifts);
  },

  async reserveGift(context, payload) {
    const userId = payload.userId;
    const giftId = payload.giftId;
    const isReserved = { isReserved: true };

    const response = await fetch(
      `${PROJECT_URL}/users/${userId}/gifts/${giftId}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(isReserved),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch reserved gift!"
      );
      throw error;
    }
  },

  async loadReservedGift(context, payload) {
    const userId = payload.userId;
    const giftId = payload.giftId;

    const response = await fetch(
      `${PROJECT_URL}/users/${userId}/gifts/${giftId}.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    const gift = {
      id: giftId,
      name: responseData.name,
      price: responseData.price,
      url: responseData.url,
      imgUrl: responseData.imgUrl,
      show: responseData.show,
      isReserved: responseData.isReserved,
      quantity: responseData.quantity,
    };

    context.commit("setReservedGift", gift);
  },

  async changeShowOfGift(context, payload) {
    const show = { show: payload.show };
    const userId = context.rootGetters.userId;
    const giftId = payload.giftId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `${PROJECT_URL}/users/${userId}/gifts/${giftId}.json?auth=` + token,
      {
        method: "PATCH",
        body: JSON.stringify(show),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to change show option!"
      );
      throw error;
    }
  },

  async patchGift(context, payload) {
    const userId = context.rootGetters.userId;
    const giftId = payload.giftId;
    const token = context.rootGetters.token;

    const giftData = {
      name: payload.name,
      price: payload.price,
      url: payload.url,
      imgUrl: payload.imgUrl,
      quantity: payload.quantity,
      isReserved: payload.isReserved,
    };

    const response = await fetch(
      `${PROJECT_URL}/users/${userId}/gifts/${giftId}.json?auth=` + token,
      {
        method: "PATCH",
        body: JSON.stringify(giftData),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to update!");
      throw error;
    }
  },

  async deleteGift(context, payload) {
    const giftId = payload.giftId;
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(
      `${PROJECT_URL}/users/${userId}/gifts/${giftId}.json?auth=` + token,
      {
        method: "DELETE",
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to delete the gift!"
      );
      throw error;
    }
  },
};
