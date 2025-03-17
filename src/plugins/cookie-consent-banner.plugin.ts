import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import type { App } from 'vue';

export default {
  install: (app: App, pluginConfig: {[key: string]: string}) => {
    app.config.globalProperties.$CookieConsent = CookieConsent;
    app.config.globalProperties.$CookieConsent.run(pluginConfig);
  }
}