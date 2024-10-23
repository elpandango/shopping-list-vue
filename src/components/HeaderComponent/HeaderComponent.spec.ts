import { mount } from '@vue/test-utils';
import HeaderComponent from '@/components/HeaderComponent/HeaderComponent.vue';
import { createI18n } from 'vue-i18n';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { describe, it, expect } from 'vitest';

const messages = {
  en: { appTitle: 'Shopping List App' },
  de: { appTitle: 'Einkaufsliste App' },
};

const i18n = createI18n({
  locale: 'en',
  messages,
});

const vuetify = createVuetify();

describe('HeaderComponent.vue', () => {
  it('renders the correct app title and button text based on locale', async () => {
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [i18n, vuetify],
      },
    });

    expect(wrapper.text()).toContain(messages.en.appTitle);

    const button = wrapper.find('v-btn');
    expect(button.text()).toBe('EN');

    await button.trigger('click');

    expect(button.text()).toBe('DE');
    expect(wrapper.text()).toContain(messages.de.appTitle);
  });
});
