import Home from '../client/components/Home'
import About from '../client/components/About'

export default [
    {
        path: "/",
        component: Home,
        exact: true
    },
    {
        path: "/about",
        component: About,
        exact: true
    }
];
