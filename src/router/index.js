import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import newsDescribe from '@/components/newsDescribe'
import mqfc from '@/components/mqfc'
import tzhk from '@/components/tzhk'
import qyfw from '@/components/qyfw'
import sxy from '@/components/sxy'
import jjyw from '@/components/jjyw'
import allcomment from '@/components/allcomment'
import commentDescribe from '@/components/commentDescribe'
import register from '@/components/register'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
     // meta:{index:0},
      component: Index
    },
    {
    	path:"/newsDescribe",
    	name:'newsDescribe',
    	//meta:{index:6},
    	component:newsDescribe
    },
    {
    	path:'/jjyw',
    	name:'jjyw',
    	//meta:{index:1},
    	component:jjyw
    },
    {
    	path:'/mqfc',
    	name:'mqfc',
    	//meta:{index:2},
    	component:mqfc
    },
    {
    	path:'/tzhk',
    	name:'tzhk',
    	//meta:{index:3},
    	component:tzhk
    },
    {
    	path:'/qyfw',
    	name:'qyfw',
    	//meta:{index:4},
    	component:qyfw
    },
    {
    	path:'/sxy',
    	name:'sxy',
    	//meta:{index:5},
    	component:sxy
    },
    {
    	path:'/allcomment',
    	name:'allcomment',
    	component:allcomment
    },
    {
    	path:'/commentDescribe',
    	name:'commentDescribe',
    	component:commentDescribe
    },
    {
    	path:'/register',
    	name:'register',
    	component:register
    }
  ]
})
