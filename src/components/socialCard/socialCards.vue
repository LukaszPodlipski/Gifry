<template>
  <div class="social-cards">
    <social-card-element
      class="social-cards__first-card social-card_card"
      ref="leftCard"
      :key="leftCardStories.id"
      :username="leftCardStories.username"
      :place="leftCardStories.place"
      :views="leftCardStories.views"
      :description="leftCardStories.description"
      :comments="leftCardStories.comments"
      :daysAgo="leftCardStories.daysAgo"
      :id="leftCardStories.id"
      :class="{ 'in-front': isLeftOnFront, 'in-back': !isLeftOnFront }"
    ></social-card-element>
    <social-card-element
      class="social-cards__second-card social-card_card"
      ref="rightCard"
      :key="rightCardStories.id"
      :username="rightCardStories.username"
      :place="rightCardStories.place"
      :views="rightCardStories.views"
      :description="rightCardStories.description"
      :comments="rightCardStories.comments"
      :daysAgo="rightCardStories.daysAgo"
      :id="rightCardStories.id"
      :class="{ 'in-front': !isLeftOnFront, 'in-back': isLeftOnFront }"
    ></social-card-element>
  </div>
</template>

<script>
import socialCardElement from "./socialCardElement.vue";
export default {
  components: {
    socialCardElement,
  },
  data() {
    return {
      leftCardStories: {
        username: "",
        place: "",
        views: null,
        description: "",
        comments: null,
        daysAgo: null,
        id: null,
      },
      rightCardStories: {
        username: "",
        place: "",
        views: null,
        description: "",
        comments: null,
        daysAgo: null,
        id: null,
      },
      stories: [
        {
          username: "lipskylukash",
          place: "Legnica",
          views: 1054,
          description: "Zobaczcie co dostałem na urodziny! Ania zaszalałaś!",
          comments: 54,
          daysAgo: 5,
          id: 1,
        },
        {
          username: "adamski",
          place: "Wrocław",
          views: 3522,
          description: "Zawsze marzyłem o dronie, dzięki Wam go mam #family!",
          comments: 12,
          daysAgo: 2,
          id: 2,
        },
        {
          username: "OlaOla",
          place: "Gdańsk",
          views: 654,
          description:
            "Dziękuję mamo za garnki! Jak widzisz przydają się bardzo.",
          comments: 10,
          daysAgo: 6,
          id: 3,
        },
        {
          username: "AnkaSkakanka",
          place: "Warszawa",
          views: 7054,
          description: "Przed Wami megaa prezent! Trafiony w punkt.",
          comments: 8,
          daysAgo: 1,
          id: 4,
        },
      ],
      index: 0,
      isLeftOnFront: true,
    };
  },
  mounted() {
    this.index += 1;

    setInterval(() => {
      this.isLeftOnFront = !this.isLeftOnFront;
      this.leftCardStories = {
        username: this.stories[this.index].username,
        place: this.stories[this.index].place,
        views: this.stories[this.index].views,
        description: this.stories[this.index].description,
        comments: this.stories[this.index].comments,
        daysAgo: this.stories[this.index].daysAgo,
        id: this.stories[this.index].id,
      };

      this.index += 1;

      this.rightCardStories = {
        username: this.stories[this.index].username,
        place: this.stories[this.index].place,
        views: this.stories[this.index].views,
        description: this.stories[this.index].description,
        comments: this.stories[this.index].comments,
        daysAgo: this.stories[this.index].daysAgo,
        id: this.stories[this.index].id,
      };
      if (this.index === this.stories.length - 1) {
        this.index = 0;
      }
      //   document.querySelector(".social-cards__first-card").style.zIndex =
      //     !document.querySelector(".social-cards__first-card").style.zIndex;
      //   document.querySelector(".social-cards__second-card").style.zIndex =
      //     !document.querySelector(".social-cards__second-card").style.zIndex;
    }, 5000);
  },

  created() {
    this.leftCardStories = {
      username: this.stories[this.index].username,
      place: this.stories[this.index].place,
      views: this.stories[this.index].views,
      description: this.stories[this.index].description,
      comments: this.stories[this.index].comments,
      daysAgo: this.stories[this.index].daysAgo,
      id: this.stories[this.index].id,
    };

    this.index += 1;

    this.rightCardStories = {
      username: this.stories[this.index].username,
      place: this.stories[this.index].place,
      views: this.stories[this.index].views,
      description: this.stories[this.index].description,
      comments: this.stories[this.index].comments,
      daysAgo: this.stories[this.index].daysAgo,
      id: this.stories[this.index].id,
    };
  },
};
</script>

<style lang="scss" scoped>
.social-cards {
  display: flex;
  height: auto;

  .social-card_card {
    -webkit-box-shadow: 8px 8px 24px -22px rgba(66, 68, 90, 1);
    -moz-box-shadow: 8px 8px 24px -22px rgba(66, 68, 90, 1);
    box-shadow: 8px 8px 24px -22px rgba(66, 68, 90, 1);
    top: 0;
  }

  .social-cards__first-card {
    transform: rotate(-5deg);
    z-index: 1;
  }

  .social-cards__second-card {
    transform: rotate(10deg) scale(0.9) translateX(-80px);
    z-index: 0;
    left: 300px;
  }

  .in-front {
    z-index: 1;
  }

  .in-back {
    z-index: 0;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
