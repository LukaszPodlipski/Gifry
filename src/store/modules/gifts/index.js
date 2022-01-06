import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state: {
    gifts: [
      // {
      //   id: "g1",
      //   name: "Barwnik do tkanin Simplicol",
      //   price: 27.99,
      //   url: "https://www.drogerienatura.pl/simplicol-instensiv-barwnik-do-tkanin-aksamitna-czern-559-g.html?utm_content=products&google_pro_id=5S52519&utm_source=organic_shopping&utm_medium=organic&gclid=EAIaIQobChMIycGh3bSU9QIVYxDmCh2uTQMOEAQYAyABEgK4T_D_BwE&gclsrc=aw.ds",
      //   imgUrl:
      //     "https://api.drogerienatura.pl/img/480/480/convert/webp//pub/media/catalog/product/1/2/120640_pim.jpg",
      // },
      // {
      //   id: "g2",
      //   name: "Drapak dla kota",
      //   price: 78.99,
      //   url: "https://globalplayers24.com/pl/drapaki/194-drapak-dla-kota-model-h-09-5902751541533.html?utm_source=skapiec.pl&utm_medium=referral",
      //   imgUrl:
      //     "https://globalplayers24.com/1276-large_default/drapak-dla-kota-model-h-09.jpg",
      // },
      // {
      //   id: "g3",
      //   name: "Xiaomi mi TV box",
      //   price: 278.0,
      //   url: "https://www.proshop.pl/Streaming-urzadzenia/Xiaomi-Mi-Box-S-4K-HDR/2694237?utm_source=ceneo&utm_medium=cpc&utm_campaign=pricesite",
      //   imgUrl:
      //     "https://www.proshop.pl/Images/300x251/2694237_3aac633a427e.png",
      // },
      // {
      //   id: "g4",
      //   name: "Mikrofon Razer Seiren X",
      //   price: 749.0,
      //   url: "https://www.mediaexpert.pl/komputery-i-tablety/akcesoria-komputerowe/mikrofony-pc/mikrofon-razer-seiren-x-rz19-02290100-r3m1?gclid=EAIaIQobChMIqaulrLWU9QIVF0eRBR1iWgOqEAQYASABEgJ1vPD_BwE",
      //   imgUrl:
      //     "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/98/980270/Mikrofon-RAZER-Seiren-X-RZ19-02290100-R3M1-front.jpg",
      // },
      // {
      //   id: "g5",
      //   name: "Mikrofon Razer Seiren X",
      //   price: 249.0,
      //   url: "https://www.mediaexpert.pl/komputery-i-tablety/akcesoria-komputerowe/mikrofony-pc/mikrofon-razer-seiren-x-rz19-02290100-r3m1?gclid=EAIaIQobChMIqaulrLWU9QIVF0eRBR1iWgOqEAQYASABEgJ1vPD_BwE",
      //   imgUrl:
      //     "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/98/980270/Mikrofon-RAZER-Seiren-X-RZ19-02290100-R3M1-front.jpg",
      // },
    ],
  },
  mutations,
  actions,
  getters,
};
