import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/published/:status',
        name: 'Published',
        component: () => import(/* webpackChunkName: "Published" */ '../pages/Published.vue')
    },
    {
        path: '/Received/:status',
        name: 'Received',
        component: () => import(/* webpackChunkName: "Received" */ '../pages/Received.vue')
    },
    {
        path: '/subscriber',
        name: 'Subscriber',
        component: () => import(/* webpackChunkName: "Subscriber" */ '../pages/Subscriber.vue')
    },
    {
        path: '/nodes',
        name: 'Nodes',
        component: () => import(/* webpackChunkName: "Nodes" */ '../pages/Nodes.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router