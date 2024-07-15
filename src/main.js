// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import FileUpload from './components/FileUpload.vue';

const routes = [
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/upload', component: FileUpload }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
