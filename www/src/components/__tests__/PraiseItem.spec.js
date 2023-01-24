import { shallowMount } from "@vue/test-utils";

import PraiseItem from "@/components/PraiseItem.vue";

describe("PraiseItem.vue", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(PraiseItem, {
      propsData: {
        praise: {
          _id: "1",
          sender: { _id: "11", firstname: "Billie", lastname: "Some" },
          receiver: { _id: "12", firstname: "Lee", lastname: "Leaper" },
          content: "Great job!"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
