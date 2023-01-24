<template>
  <div class="praise-wall">
    <headline
      title="Praise Wall"
      buttonText="Create"
      @btn-click="onButtonClick"
    />

    <b-row>
      <b-col cols="4" v-for="praise in list" :key="praise._id">
        <praise-item :praise="praise"></praise-item>
      </b-col>
    </b-row>

    <b-modal
      id="modal"
      ref="modal"
      title="Send New Praise"
      @show="resetModal"
      @hide="resetModal"
      @ok="handleOk"
      v-model="showModal"
    >
      <form ref="form" @submit.stop.prevent="sendPraise">
        <b-form-group label="Receiver" label-for="name-input">
          <b-form-select
            v-model="receiver"
            :options="selectUsersOptions"
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Content" label-for="content-input">
          <b-form-textarea
            id="content-input"
            v-model="content"
            placeholder="What are you thankful for?"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
      </form>
      <b-alert v-model="showErrorAlert" variant="danger" dismissible>
        Oops, an error occured ... please make sure all the inputs are correctly
        filled and try again!
      </b-alert>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Headline from "@/components/Headline";
import PraiseItem from "@/components/PraiseItem";

export default {
  name: "PraiseWall",
  components: {
    Headline,
    PraiseItem
  },
  data() {
    return {
      showModal: false,
      showErrorAlert: false,
      receiver: "",
      content: ""
    };
  },
  computed: {
    ...mapGetters({
      user: "users/current",
      users: "users/list",
      list: "praise/list"
    }),
    selectUsersOptions() {
      return [
        { value: null, text: "Please select one of your colleagues" },
        ...this.users.map(user => ({
          value: user._id,
          text: user.firstname + " " + user.lastname
        }))
      ];
    }
  },
  methods: {
    onButtonClick() {
      this.showModal = !this.showModal;
    },
    resetModal() {
      this.receiver = "";
      this.content = "";
      this.showErrorAlert = false;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.sendPraise();
    },
    sendPraise() {
      this.$store
        .dispatch("praise/create", {
          praise: {
            sender: this.user._id,
            receiver: this.receiver,
            content: this.content
          }
        })
        .then(() => {
          this.$bvModal.hide("modal");
        })
        .catch(() => {
          this.showErrorAlert = true;
        });
    }
  }
};
</script>

<style scoped></style>
