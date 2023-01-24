<template>
  <div class="home">
    <b-row no-gutters>
      <b-col cols="3" class="user">
        <b-avatar :text="avatarText" variant="info" size="10rem"></b-avatar>
        <p class="user-name">{{ user.firstname + " " + user.lastname }}</p>
        <b-button
          block
          squared
          size="lg"
          variant="outline-info"
          to="/praise"
          class="goto-praise"
        >
          Praise Wall
        </b-button>
      </b-col>

      <b-col cols="8" offset="1">
        <div class="greeting">
          <h2>Hi there, {{ user.firstname }}! 👋</h2>
        </div>

        <b-card
          title="Your Stats"
          sub-title="Here are some stats about your praise activity"
        >
          <b-card-body>
            <b-row>
              <b-col>
                <b-row><h3 class="text-info">Sent</h3></b-row>
                <b-row>
                  <p class="stats-number">{{ user.stats.sent }}</p>
                </b-row>
              </b-col>
              <b-col>
                <b-row><h3 class="text-info">Received</h3></b-row>
                <b-row>
                  <p class="stats-number">{{ user.stats.received }}</p>
                </b-row>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters({
      user: "users/current"
    }),
    avatarText() {
      return this.user.firstname[0] + this.user.lastname[0];
    }
  }
};
</script>

<style scoped>
.greeting {
  margin-bottom: 2rem;
}

.user {
  text-align: left;
}
.user-name {
  margin-top: 1rem;
  font-size: 2rem;
}

.stats-number {
  margin-bottom: 0;
  font-size: 2rem;
}

.goto-praise {
  margin-top: 2rem;
}
</style>
