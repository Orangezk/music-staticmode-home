import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/findmusic',
      children: [
        {
          path: '/findmusic',
          component: () => import('@/views/findmusic/FindMusic.vue'),
          redirect: '/findmusic/recommend',
          children: [
            {
              path: '/findmusic/recommend',
              component: () => import('@/views/findmusic/RecomMusic.vue')
            },
            {
              path: '/findmusic/musiclist',
              component: () => import('@/views/findmusic/MusicList.vue')
            },
            {
              path: '/findmusic/playlist',
              component: () => import('@/views/findmusic/PlayList.vue')
            },
            {
              path: '/findmusic/singers',
              component: () => import('@/views/findmusic/SingerSinger.vue')
            }
          ]
        },
        {
          path: '/mymusic',
          component: () => import('@/views/mymusic/MyMusic.vue')
        },
        {
          path: '/concern',
          component: () => import('@/views/concern/FocusSongs.vue')
        },
        {
          path: '/market',
          component: () => import('@/views/market/MusicMarket.vue')
        },
        {
          path: '/singer',
          component: () => import('@/views/singer/MusicPlayer.vue')
        },
        {
          path: '/search',
          component: () => import('@/views/search/SearchMusic.vue')
        },
        {
          path: '/users/home',
          component: () => import('@/views/users/UserHome.vue')
        },
        {
          path: '/users/news',
          component: () => import('@/views/users/UserNews.vue')
        },
        {
          path: '/users/setting',
          component: () => import('@/views/users/UserSettings.vue')
        }
      ]
    }
  ]
})

export default router
