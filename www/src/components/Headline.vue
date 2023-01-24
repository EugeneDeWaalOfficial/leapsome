<template>
  <div class="headline">
    <div class="title-wrapper">
      <h2 class="title">{{ title }}</h2>
      <b-button class="button" variant="info" @click="$emit('btn-click')">{{
        buttonText
      }}</b-button>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "Headline",
  props: {
    title: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.headline {
  margin-bottom: 3rem;
}

.title-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
