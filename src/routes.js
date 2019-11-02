import Home from 'pages/home'
import Article from 'pages/article'
import Tag from 'pages/tags'
import Archives from 'pages/archives'
import Category from 'pages/categories'
import MindMap from 'pages/mind'
import About from 'pages/about'
import Classify from 'pages/classify'
import ClassifyDetail from 'pages/classifyDetail'


export const createRoutes = () => {
    const home = {
        path: '/',
        component: Home,
        exact: true,
    }
    const tags = {
        path: '/tag/:tagName',
        component: Tag,
        exact: true,
    }
    const article = {
        path: '/article/:postName',
        component: Article,
        exact: true,
    }
    const archives = {
        path: '/archives',
        component: Archives
    }
    const classify = {
        path: '/classify',
        component: Classify
    }
    const categories = {
        path: '/categories',
        component: Category
    }
    const mindMap = {
        path: '/mindMap',
        component: MindMap
    }
    const about = {
        path: '/about',
        component: About
    }
    const classifyDetail = {
        path: '/classifyDetail:classify',
        component: ClassifyDetail
    }
    return [home, tags, article, archives, classify, categories, mindMap, about, classifyDetail]
};
