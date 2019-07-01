import React from 'react';
import Loadable from 'react-loadable';
const Loading = () => <div className="page-loading">Loading...</div>;

export const createRoutes = () => {
  const home = {
    path: '/',
    component: Loadable({
      loader: () => import('pages/home'),
      loading: Loading,
    }),
    exact: true,
  }
  const tags = {
    path: '/tag/:tagName',
    component: Loadable({
      loader: () => import('pages/tags'),
      loading: Loading,
    }),
    exact: true,
  }
  const article = {
    path: '/post/:postName',
    component: Loadable({
      loader: () => import('pages/article'),
      loading: Loading,
    }),
    exact: true,
  }
  const archives = {
    path: '/archives',
    component: Loadable({
        loader: () => import('pages/archives'),
        loading: Loading
    })
  }
  const categories = {
    path: '/categories',
    component: Loadable({
        loader: () => import('pages/categories'),
        loading: Loading
    })
  }
  const about = {
    path: '/about',
    component: Loadable({
        loader: () => import('pages/about'),
        loading: Loading
    })
  }
  return [home, tags, article, archives, categories, about]
};
