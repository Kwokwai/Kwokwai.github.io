import React from 'react';
import Loadable from 'react-loadable';
import Home from 'pages/home'
import Article from 'pages/article'
import Tag from 'pages/tags'
import Archives from 'pages/archives'
import Category from 'pages/categories'
import About from 'pages/about'

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
    path: '/post/:postName',
    component: Article,
    exact: true,
  }
  const archives = {
    path: '/archives',
    component: Archives
  }
  const categories = {
    path: '/categories',
    component: Category
  }
  const about = {
    path: '/about',
    component: About
  }
  return [home, tags, article, archives, categories, about]
};
