import Home from './scenes/Home'
import About from './scenes/About'
import Work from './scenes/Work'
import WorkDetail from './scenes/WorkDetail'
import AppShell from './scenes/AppShell'
import Missing from './scenes/Missing'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/work',
    component: Work,
    exact: true
  },
  {
    path: '/work/:id',
    component: WorkDetail
  },
  {
    path: '/about',
    component: About,
    exact: true
  },
  {
    path: '/app-shell',
    component: AppShell,
    exact: true
  },
  {
    component: Missing
  }
]

export default routes
