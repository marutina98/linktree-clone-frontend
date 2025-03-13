
// Stylesheets

import '@/assets/main.css';

// Vue

import { createApp } from 'vue';
import App from './App.vue';

// Cookie Consent Banner

import CookieConsentBanner from './plugins/CookieConsentBanner';
import cookieConsentBannerConfig from './settings/cookie-consent-banner-config';

// Router

import router from './routes/router';

createApp(App)
.use(router)
.use(CookieConsentBanner, cookieConsentBannerConfig)
.mount('#app');
