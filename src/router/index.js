import App from '../App'
import HelloWorld from '@/components/HelloWorld'

export default [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        name: 'HelloWorld',
        component: HelloWorld
      }
    ]
  }

]
