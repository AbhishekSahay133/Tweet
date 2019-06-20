import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AboutUs from './components/aboutus'
import UserProfile from './components/userprofile'
import ContactUs from './components/contactus'
import AddBlog from './components/addblog'
import Login from '@/components/login'
import Registration from '@/components/registration'
import firebase from 'firebase'
Vue.use(Router)

let router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'aboutus',
      component: AboutUs,
      meta:{
        requiresAuth:true
      }
    },
   
    {
      path: '/addblog',
      name: 'addblog',
      component: AddBlog,
      meta:{
        requiresAuth:true
      }
    },  
    {
      path: '/userprofile',
      name: 'userprofile',
      component: UserProfile,
      meta:{
        requiresAuth:true
      }
    }, 
    {
      path: '/contactus',
      name: 'contactus',
      component: ContactUs,
      meta:{
        requiresAuth:true
      }
    },  
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        requiresGuest:true
      }
    }, 
    {
      path: '/registration',
      name: 'registration',
      component: Registration,
      meta:{
        requiresGuest:true
      }
    },       
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
});
router.beforeEach((to, form ,next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!firebase.auth().currentUser){
      next({
        path:'/login',
        query:{
          redirect: to.fullPath
        }
      });
     
    }
    else{
        next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)){
    if(firebase.auth().currentUser){
      next({path:'/', 
       query:{
        redirect: to.fullPath
      }
    });
     
    }
    else{
        next();
    }
  } else{
    next();
  }
});

export default router;