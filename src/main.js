
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

import { SnackbarService } from 'vue3-snackbar';
import 'vue3-snackbar/styles';

import router from './routes/router';

// Provide useAuthenticationStore to the entire App

import { useAuthenticationStore } from './stores/use-authentication-store.store';

const pinia = createPinia();

// Add Router and Plugins

createApp(App)
.use(pinia)
.provide('authentication', useAuthenticationStore())
.use(SnackbarService)
.use(CookieConsentBanner, cookieConsentBannerConfig)
.use(router)
.mount('#app');