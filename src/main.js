
// Stylesheets

import '@/assets/main.css';

// Vue & Pinia

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// Plugins
// CookieConsentBanner, Router and Pinia

import CookieConsentBanner from './plugins/cookie-consent-banner.plugin';
import cookieConsentBannerConfig from './settings/cookie-consent-banner-config';

import router from './routes/router';

// Provide useAuthenticationStore to the entire App

import { useAuthenticationStore } from './stores/use-authentication-store.store';

const pinia = createPinia();

// Add Router and Plugins

createApp(App)
.use(router)
.use(CookieConsentBanner, cookieConsentBannerConfig)
.use(pinia)
.provide('authentication', useAuthenticationStore())
.mount('#app');