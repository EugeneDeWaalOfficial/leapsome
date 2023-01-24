<template>
  <div class="praise-item">
    <b-avatar
      :text="praise.sender.firstname[0] + praise.sender.lastname[0]"
      variant="secondary"
      size="5rem"
    ></b-avatar>
    <b-icon icon="caret-right-fill" scale="2" class="caret"></b-icon>
    <b-avatar
      :text="praise.receiver.firstname[0] + praise.receiver.lastname[0]"
      variant="secondary"
      size="5rem"
    ></b-avatar>

    <br /><br />

    <p>From {{ praise.sender.firstname }} to {{ praise.receiver.firstname }}</p>

    <hr />
    <p>{{ praise.content }}</p>
    <hr />
  </div>
</template>

<script>
export default {
  name: "PraiseItem",
  props: {
    praise: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.praise-item {
  margin-bottom: 2rem;
}

.caret {
  margin: auto 1rem;
}
</style>
