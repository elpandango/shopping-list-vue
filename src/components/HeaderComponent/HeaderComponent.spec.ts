import { mount } from "@vue/test-utils";
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent.vue";
import { describe, it, expect } from "vitest";
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

const vuetify = createVuetify();

describe('HeaderComponent.vue', () => {
  it('renders the app title', () => {
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.text()).toContain("Shopping List App");
  });
});
