import { shallowMount } from "@vue/test-utils";

import Headline from "@/components/Headline.vue";

describe("Headline.vue", () => {
  it("renders title and button text when passed", () => {
    const title = "Some Title";
    const buttonText = "Some Button";

    const wrapper = shallowMount(Headline, {
      propsData: { title, buttonText }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
