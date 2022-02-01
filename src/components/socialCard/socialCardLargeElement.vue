<template>
  <div class="social-card">
    <div class="social-card__header">
      <img
        :src="require('../../assets/socialCardAssets/profile' + id + '.jpg')"
        alt="userimage"
        class="social-card__header__profile-image"
      />
      <div class="social-card__header__name-place">
        <p>{{ username }}</p>
        <p>{{ place }}</p>
      </div>
    </div>
    <img
      :src="require('../../assets/socialCardAssets/post-photo' + id + '.jpg')"
      alt=""
      class="social-card__image"
    />
    <div class="social-card__icons">
      <div class="social-card__icons__left">
        <img
          src="../../assets/socialCardAssets/heart_icon.svg"
          alt="heartIcon"
          class="icons__left__heart icons__left__icon"
        />
        <img
          src="../../assets/socialCardAssets/comment_icon.svg"
          alt="commentIcon"
          class="icons__left__comment icons__left__icon"
        />
        <img
          src="../../assets/socialCardAssets/send_icon.svg"
          alt="sendIcon"
          class="icons__left__send icons__left__icon"
        />
        <img
          src="../../assets/socialCardAssets/image_scroll_icon.svg"
          alt="scrollIcon"
          class="icons__left__scroll icons__left__icon"
        />
      </div>
      <div class="social-card__icons__right">
        <img
          src="../../assets/socialCardAssets/save_icon.svg"
          alt=""
          class="icons__right__save"
        />
      </div>
    </div>
    <div class="social-card__content">
      <p class="social-card__content__views">{{ views }} views</p>
      <p class="social-card__content__description">
        {{ description }}
      </p>
      <p class="social-card__content__view-comments">
        View all {{ comments }} comments
      </p>
      <p class="social-card__content__num-of-days-ago">
        {{ daysAgo }} days ago
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "id",
    "username",
    "place",
    "views",
    "description",
    "comments",
    "daysAgo",
  ],
};
</script>

<style lang="scss" scoped>
.social-card {
  width: 400px;
  background-color: var(--v-primary-base);
  border-radius: 20px;
  padding: 1.5rem;
  color: var(--v-secondary-base);

  .social-card__header {
    display: flex;
    width: 100%;

    .social-card__header__profile-image {
      height: 50px;
      border-radius: 50px;
      margin-right: 20px;
    }

    .social-card__header__name-place {
      display: flex;
      flex-direction: column;
    }
  }

  .social-card__image {
    width: 100%;
    height: 350px;
    object-fit: cover;
    margin-top: 20px;
  }

  .social-card__icons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .social-card__icons__left {
      display: flex;
      flex-direction: row;
      align-items: center;

      .icons__left__icon {
        height: 25px;
        margin: 7px;
      }

      .icons__left__scroll {
        height: 15px;
        margin-left: 45px;
      }
      .icons__left__send {
        transform: translateY(-2px);
      }
    }

    .social-card__icons__right {
      .icons__right__save {
        height: 25px;
        margin: 7px;
      }
    }
  }
  .social-card__content {
    margin: 0 5px;
    line-height: 150%;
  }
}
</style>
