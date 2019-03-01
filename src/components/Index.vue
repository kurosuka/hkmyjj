<template>
	<div class="app-wraper">
			<div class="search cf">
				<div class="search-content">
					<div class="logo-p">虹口民营经济</div>
					<div class="infor-a" @click="register()">
						<a href="javascript:void (0);"><img src="../assets/f-nickname.png" /></a>
					</div>					
					<div class="search-item">
						<input type="text" placeholder="请输入关键字..." />
						<img src="../assets/f-search.png" />
					</div>
				</div>
			</div>
			<div class="nav-title">
				<div class="nav-m-t" href="javascript:void (0)">
					<span>虹口欢迎您!</span>
					<div class="close-nav"><img src="../assets/t-close.png" /></div>
				</div>
			</div>
			<div class="nav-swiper">
				<Swiper ref="swiper" v-if="swipelist.length>0">
            		<Slide v-for="(item,index) in swipelist" :key=index>
                		<img :src="item.img" />
           		 	</Slide>
        		</Swiper>
			</div>
			<HeaderNav></HeaderNav>
			<twoNews></twoNews>
			<div class="link-content">
				<a href="#" class="link-blue">觅鹰站</a>
				<a href="#" class="link-yellow">衔鹰站</a>
				<a href="#" class="link-pink">交鹰站</a>
			</div>
			<adsIndex></adsIndex>
			<div id="news-list">
				<div  v-for='item in list'>
					<div class="text-list no-img-text" v-if="item.article_img===''">
					<span><router-link tag="a" :to="{path:'/newsDescribe',query:{id:item.article_id}}">{{item.title}}</router-link></span>
					<div class="item-text">
						<span class="text-origin">{{item.source}}</span>
						<span class="text-date">{{jsDateDiff(item.add_time)}}</span>
						<div class="zc-item" v-if="item.point!==0">
							<div class="z-item">
								<img src="../assets/z.png"  />
								<span>{{item.point}}</span>
							</div>
						</div>
						<div class="text-item-content" v-if="item.type"><span class="text-item">{{item.type}}</span></div>
					</div>
					</div>
					<!--一张小图-->
					<div class="text-list one-img-text" v-if="item.article_img!==''">
						<div class="ms-img">
							<img class="lazyimg" :src="'http://211.152.36.66:3013//'+item.article_img" />
							<div class="mv-icon" v-if="item.link"><img src="../assets/mv.png" /></div>
						</div>
						<div class="ms-text">
							<span><router-link tag="a" :to="{path:'/newsDescribe',query:{id:item.article_id}}">{{item.title}}</router-link></span>
							<div class="item-text">
								<span class="text-origin">{{item.source}}</span>
								<span class="text-date">{{jsDateDiff(item.add_time)}}</span>
								<div class="zc-item">
									<div class="z-item">
										<img src="../assets/z.png"  />
										<span>{{item.point}}</span>
									</div>
								</div>
							<div class="text-item-content" v-if="item.type"><span class="text-item text-item-link">{{item.type}}</span></div>
							</div>
						</div>
					</div>
				</div>
				<Footer></Footer>
			</div>
	</div>
</template>

<script>
	import { Swiper, Slide } from 'vue-swiper-component'
	import twoNews from '../components/twoNews.vue'
	import AdsIndex from '../components/AdsIndex.vue'
	import HeaderNav from '../components/HeaderNav.vue'
	import Footer from '../components/Footer.vue'
	export default {
		name:'Index',
		components: {
            Swiper,
            Slide,
            twoNews,
            AdsIndex,
            HeaderNav,
            Footer
        },
        data(){
            return{
            	 swipelist: [
                    { img: '../../static/img/sy-img.png' },
                    { img: '../../static/img/sy-img.png' },
                    { img: '../../static/img/sy-img.png' }
                ],
				url:"http://192.168.18.82:19501/zxz/listall",
				list: [],
				swipeData: [],
				add_time:'2011-11-11 11:11:11'
}
},
methods: {
		jsDateDiff(publishTime) {
		    		var d_minutes, d_hours, d_days;
		    		var timeNow = parseInt(new Date().getTime() / 1000);
		    		var d;
		    		var publishTimeT = new Date(publishTime.replace(/-/g,"/")).getTime();
		    		d = timeNow - publishTimeT;
		    		d_days = parseInt(d / 86400);
		    		d_hours = parseInt(d / 3600);
		    		d_minutes = parseInt(d / 60);
		    		if(d_days > 0 && d_days < 4) {
		    			return d_days + "天前";
		    		} else if(d_days <= 0 && d_hours > 0) {
		    			return d_hours + "小时前";
		    		} else if(d_hours <= 0 && d_minutes > 0) {
		    			return d_minutes + "分钟前";
		    		} else {
		    			var s = new Date(publishTime.replace(/-/g,"/"));
		    			// s.getFullYear()+"年";
		    			if(s.getMonth()+1<10&&s.getDate()<10){
		    				return(
		    					"0"+(s.getMonth() + 1)
		    				) + "-" + "0"+s.getDate();
		    			}else if(s.getMonth()+1<10&&s.getDate()>=10)
		    			{
		    				return(
		    					"0"+(s.getMonth() + 1)
		    				) + "-"+s.getDate();
		    			}else if(s.getMonth()+1>=10&&s.getDate()<10){
		    				return(
		    					(s.getMonth() + 1)
		    				) + "-" + "0"+s.getDate();
		    			}
		    			else{
		    				return(s.getMonth() + 1) + "-" + s.getDate();
		    			}
		    		}
		    	},
		    	register(){
		    		if(localStorage.getItem('token')){
		    			alert('跳转到会员中心')
		    			alert(localStorage.getItem('token'))
		    		}else{
		    			this.$router.replace("/register")
		    			alert(localStorage.getItem('token'))
		    		}
		    	}
	},
	mounted: function() {
		this.$http.get(this.url, {
				withCredentials: false
			}).then(res => {
					this.list = res.body.result;
					this.error = res.body.error;//	      this.$store.state.title = '发现';
	    }).catch( error => {
	      //console.log(error);
	    });
	  }
		
    }

</script>
<style>
	.nav-swiper img{height: 4.1rem;width:100%}
	.wh_show_bgcolor{background: #ffffff;}
	.wh_indicator{bottom: 0;}
	/* 分类菜单*/
	.link-content .link-blue{background: #d0defb; padding-left: .75rem; box-sizing: border-box; background-image: url(../assets/blue-link.png); background-repeat: no-repeat; background-position: left .25rem center; background-size: .4rem .38rem;}
.link-content .link-yellow{background: #ffefac; padding-left: .75rem; box-sizing: border-box; background-image: url(../assets/yellow-link.png); background-repeat: no-repeat; background-position: left .25rem center; background-size: .4rem .38rem;}
.link-content .link-pink{background: #fedcdc; padding-left: .75rem; box-sizing: border-box; background-image: url(../assets/pink-link.png); background-repeat: no-repeat; background-position: left .25rem center; background-size: .4rem .38rem;}

</style>