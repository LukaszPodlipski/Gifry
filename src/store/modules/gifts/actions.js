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

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
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
      };
      gifts.push(gift);
    }

    context.commit("setGifts", gifts);
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

    if (!response.ok) {
      // error ...
    }

    // context.commit("changeShowOfGift", {
    // giftId,show
    // });
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

    if (!response.ok) {
      // error ...
    }
  },
};
