import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import NotFound from '@/pages/NotFound.vue'
import StockTimeSeriesPage from '@/pages/StockTimeSeriesPage.vue'
import TopStocksPage from '@/pages/TopStocksPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    redirect: '/time-series/MSFT',
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/top-stocks',
    name: 'TopStocks',
    component: TopStocksPage,
  },
  {
    path: '/time-series/:stockName',
    name: 'StockTimeSeries',
    component: StockTimeSeriesPage,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
