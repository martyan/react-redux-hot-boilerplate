import React from 'react'
import Loadable from 'react-loadable'


const loading = () => <div>Loading...</div>

const Home = Loadable({
    loader: () => import('../client/components/Home'),
    loading,
    delay: 300
})

const About = Loadable({
    loader: () => import('../client/components/Home'),
    loading,
    delay: 300
})

export default [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/about',
        component: About,
        exact: true
    }
];
