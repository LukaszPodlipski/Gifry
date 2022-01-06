export default {
  async addGift(context, data) {
    const userId = context.rootGetters.userId;
    const giftData = {
      name: data.name,
      price: data.price,
      url: data.url,
      imgUrl: data.imgUrl,
      show: false,
    };

    const token = context.rootGetters.token;

    const giftID = "_" + Math.random().toString(36).substr(2, 9);
    const response = await fetch(
      `https://gifty-7a577-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/gifts/${giftID}.json?auth=` +
        token,
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
      id: userId,
    });
  },

  async loadGifts(context, payload) {
    const userId = payload;
    const response = await fetch(
      `https://gifty-7a577-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/gifts.json`
    );
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
      };
      gifts.push(gift);
    }

    context.commit("setGifts", gifts);
  },
};
