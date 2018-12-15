import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Home from './views/Home.vue';
import Article from './views/Article.vue';
import CreateArticle from './views/CreateArticle.vue';



Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {path: '/Login', component: Login},
        {path: '/Signup', component: Signup},
        {path: '/', component: Home},
        {path: '/article/:id', component: Article},
        //observe, we have 's' in the articles name so that the id route and the create route dont conflict
        {path: '/articles/create', component: CreateArticle}




    ]
})

export default router;