<template>
	<div class="app-wraper">
			<div class="nav-crumb cf">
				<a href="javascript:void (0);" class="back-c" @click="back"><img src="../assets/back-c.png" /></a>
				<a href="javascript:void (0);" class="inner-logo">虹口民营经济</a>
				<ul>
					<li><a href="javascript:void (0);">{{category.cat_name}}</a></li>
				</ul>
				<a href="javascript:void (0);" class="infor-nick"><img src="../assets/f-nickname.png" /></a>
			</div>
			<!--开始-->
			<div class="article-content">
				<div class="article-title">{{newscontent.title}}</div>
				<div class="art-item">
					<h2>{{newscontent.source}}</h2>
					<h3>{{jsDateDiff(add_time)}}</h3>
					<a href="http://mp.weixin.qq.com/mp/getverifyinfo?__biz=MzU0OTE2MDMyOQ==#wechat_webview_type=1&wechat_redirect">虹口民营经济</a>
					<span class="ck-item">{{newscontent.browse_num}}</span>
				</div>
				<div class="gz cf" v-if="category.keywords!==''"><span>{{category.keywords}}</span><a href="javascript:void (0);">马上关注</a></div>
				<div class="summary-text cf" v-if="category.cat_desc!==''">{{category.cat_desc}}</div>
				<div class="submit-email cf"><h3><span>投稿邮箱：</span>tougao@hkmyjj.org</h3></div>
				<div class="sum-text" v-if="newscontent.summary">
					<span>摘要：</span><span>{{newscontent.summary}}</span>
				</div>
				<div class="no-mv-fl" v-if="newscontent.a_type==3&&newscontent.link.indexOf('iframe')!==-1" v-html="newscontent.link"></div>
				<video style="width: 100%; height: auto; margin-top: .3rem;" controls="controls" :src="newscontent.link" v-if="newscontent.a_type==3&&newscontent.link.indexOf('iframe')===-1"></video>
				<audio preload="auto" controls v-if="newscontent.a_type==4">
						<source :src="newscontent.link"></source>
				</audio>
				<div class="article-text" v-if="newscontent.content" v-html='newscontent.content'></div>
				<div class="disclaimer">本网站仅向网友提供空间存储服务，网友上传或发表到本网站的任何网文或图片，均不代表本站的任何意见，相关责任由发布网友自行承担。</div>
				<div class="dp-content">
					<div class="like-btn hot-click"><span>{{newscontent.point?newscontent.point:0}}</span></div>
					<div class="dislike-btn"><span>{{newscontent.step_num?newscontent.step_num:0}}</span></div>
					<a href="javascript:void (0);">投诉</a>
				</div>
			</div>
			<previousnext :get_id="this.$route.query.id">{{this.$route.query.id}}</previousnext>
			<Comment :get_id="this.$route.query.id"></Comment>
			<Footer></Footer>
			<div class="fd-input-c">
			<div class="search-content">
					<div class="search-item">
						<div class="mn-input" @click="closeShow">我来说两句...</div>
						<div class="t-infor">
							<img src="../assets/xz-infor.png" />
							<span>{{newscontent.comment_num}}</span>
						</div>
						<div class="collect"></div>
					</div>
			</div>
	</div>
		<!--评论-->
		<div  v-show="isShow">
			<div class="mask" @click="closeShow"></div>
			<div class="com-text">
				<div class="text-area">
					<textarea placeholder="我来说两句..."></textarea>
					<div class="raido-nm" :class="[isclass?'raido-click':'']" @click="isClass">匿名评价</div>
					<span>提交</span>
				</div>
			</div>
		</div>
		</div>
		
</template>

<script>
	import previousnext from "../components/previousnext.vue"
	import Footer from "../components/Footer.vue"
	import Comment from "../components/comment.vue"
	export default{
		name:'newsDescribe',
		components:{
			previousnext,
			Comment,
			Footer
		},
		data(){
			return{
				url:'http://192.168.18.82:19501/zxz/listone',
				newscontent:[],
				add_time:'2011-11-08 10:32:04',
				category:[],
				isShow:false,
				isclass:true,
			}
		},
		mounted:function(){
			this.url=this.url+'?id='+this.$route.query.id;
			//console.log(this.url);
		    this.$http.get(this.url, {
		        withCredentials: false
		    }).then( res => {
		      this.newscontent = res.body.result;
		      this.add_time=res.body.result.add_time;
		      this.category=res.body.result.category;
		      this.error = res.body.error;
	//	      this.$store.state.title = '发现';
	//console.log(new Date(res.body.result.add_time))
		    }).catch(error => {
		    	console.log(error);
		    });
		    },
		    created:function(){
		    	this.Top();
		    },
		    methods: {
		    	closeShow(){
		    		this.isShow = !this.isShow
		    	},
		    	isClass(){
		    		this.isclass=!this.isclass;
		    	},
		    	inforGo(str){
		    		var news_id=str;
		    		alert(news_id);
		    		this.isShow = !this.isShow
		    	},
		    	Top(){
		    		window.scrollTo(0,0)
		    	},
		    	back() {
		    		this.$router.go(-1)
		    	},
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
		    }
		    }</script>
<style>
	.art-item{clear: both; overflow: hidden; position: relative; height: .4rem; padding-top: .2rem;}
.art-item span{ font-size: .24rem; display: block; color: #666666;line-height: .26rem; height: .26rem;background-image:url(../assets/jb-icon.png); background-position:left center;background-size: .5rem .24rem; padding-left: .6rem; background-repeat: no-repeat;}
.art-item a.art-click{color: #666666;}
.gz a{display: table-cell;float: right;font-size:.24rem; color: #888888; margin-left: .2rem; background: url(../assets/gz.gif) no-repeat left top; background-size: .42rem .42rem; padding-left: .5rem; line-height: .6rem;}
.like-btn span{ background-image:url(../assets/infor-good.png); background-repeat:no-repeat; background-size:.28rem .26rem; background-position:left center; padding-left: .46rem;}
.dislike-btn span{ background-image:url(../assets/infor-cai.png); background-repeat:no-repeat; background-size:.28rem .26rem; background-position:left center; padding-left: .46rem;}
.collect{ margin-top:.15rem;width: .4rem; height: .38rem; background: url(../assets/no-cancelstar.png) no-repeat;background-size: .4rem .38rem;}
.collect-active{background: url(../assets/collect-star.png) no-repeat; background-size: .35rem .33rem;}
.raido-nm{margin-top:.3rem; margin-left:.15rem;height: .3rem; background: url(../assets/nm-img2.png) no-repeat left .07rem; text-align: left; padding-left: .3rem; background-size: .22rem .22rem;color:#7eacff;font-size: .26rem;}
.raido-click{background: url(../assets/nm-img1.png) no-repeat left .07rem;background-size: .22rem .22rem}
.com-text{box-shadow: #888888 0 -5px 5px -5px;height: 2.7rem; background: #efefef; position: fixed; bottom: 0;z-index: 9999; width:100%; }
.mask{width: 100%; height: 100%; position: fixed; top: 0; left: 0;}
</style>
