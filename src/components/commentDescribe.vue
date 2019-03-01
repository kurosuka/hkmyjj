<template>
<div class="app-wraper">
	<!--评论-->
	<div class="discuss-title">
		<a href="javascript:void(0);" @click="back"><img src="../assets/co-back.png" /></a>
		<span>评论详情</span>
	</div>
	<div class="discuss-content">
				<ul>
					<li>
						<div class="discuss-name">
							<div class="discuss-nickimg"><img :src="getimg(allcommentlist.userInfo.head_img)" /></div>
							<div class="nick-content">
								<div class="nick-name">
									<span>{{allcommentlist.userInfo.user_name}}</span>
									<img v-if="allcommentlist.userInfo.level_star!='0'" :src="getLevel(allcommentlist	.userInfo.level_star)" />
								</div>
								<div class="dis-date">{{allcommentlist.add_time}}</div>
								<span class="floor">{{allcommentlist.support}}</span>
							</div>
						</div>
						<div class="discuss-text">{{allcommentlist.content}}</div>
						<div class="infor-btn">
							<a class="jb-btn" href="#"></a>
							<span @click="inforGo(allcommentlist.userInfo.user_name)">回复</span>
						</div>
					</li>
				</ul>
			</div>
		<div>
			<div class="disc-title">
				<span><a href="#">全部评论</a></span>
			</div>
			<div class="discuss-content dis-more-content">
				<ul>
					<li v-for="rep in allcommentlist.reply">
						<div class="discuss-name">
							<div class="discuss-nickimg"><img :src="getimg(rep.userInfo.head_img)" /></div>
							<div class="nick-content">
								<div class="nick-name">
									<span>{{rep.userInfo.user_name}}</span>
									<img v-if="rep.userInfo.level_star!='0'" :src="getLevel(rep.userInfo.level_star)" />
								</div>
								<div class="dis-date">2017-09-29 17:02:49</div>
								<div class="fl-content">
									<a class="jb-btn" href="#"></a>
									<span class="floor floor-yz">{{rep.support}}</span>
								</div>
							</div>
						</div>
						<div class="discuss-text">{{rep.content}}</div>
					</li>
				</ul>
				<div class="nomore-discuss">
					<a href="#">没有更多评论</a>
				</div>
			</div>
		</div>
	<!--评论-->
	<div class="fd-input-c">
			<div class="search-content">
					<div class="search-item">
						<div class="mn-input" @click="closeShow">我来说两句...</div>
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
	export default{
		name:'commentDescribe',
		data(){
			return{
				allcommentlist:{},
				head_img:'../../static/img/login-in.png',
				username:'',
				userInfo:{},
				url:'http://192.168.18.82:19501/zxz/listOneComment',
				isShow:false,
				isclass:true,
				comment_num:'',
				loginimg:'../../static/img/login-in.png'
			}
		},
		mounted:function(){
			this.url=this.url+'?id='+this.$route.query.id;
			console.log(this.url);
		    this.$http.get(this.url, {
		        withCredentials: false
		    }).then( res => {
		      this.allcommentlist = res.body.result;
		      this.userInfo=res.body.result.userInfo;
		      this.head_img=res.body.result.userInfo.head_img;
		      //this.comment_num = res.body.result.comment_num;
		      this.error == res.body.error;
	//	      this.$store.state.title = '发现';
			console.log(this.allcommentlist)
		    }).catch(error => {
		    	console.log(error);
		    });
},
methods: {
	closeShow() {
		this.isShow = !this.isShow
	},
	isClass() {
		this.isclass = !this.isclass;
	},
	back() {
		this.$router.go(-1)
	},
		    	inforGo(str){
		    		var news_id=str;
		    		alert(news_id);
		    		this.isShow = !this.isShow
		    	},
		    	getimg(str){
		    		if(str.indexOf("http:")!=-1){
		    			return str;
		    		}else if(str==''){
		    			return 'http://211.152.36.66:3013/login-in.png';
		    		}else{
		    			return ('http://211.152.36.66:3013/'+str);
		    		}
		    	},
		    	getLevel(str){
		    		if(str==1){
		    			return '../assets/level1.png'
		    		}else if(str==2){
		    			return '../assets/level2.png'
		    		}else if(str==3){
		    			return '../assets/level3.png'
		    		}else if(str==4){
		    			return '../assets/level4.png'
		    		}else if(str==5){
		    			return '../assets/level5.png'
		    		}
		    	}
	
}
}</script>

<style>
		.dis-date{text-align: left;}
	.floor{display: block; position: absolute; font-size: .28rem; color: #404040; top: 0; right: 0rem; background-image:url(../assets/discuss-z.png); background-repeat:no-repeat; background-size:.32rem .26rem; background-position:left 0.02rem; padding-left: .4rem;}
.discuss-p-text span{text-align: left; display: inline;float: none; font-size: .28rem; line-height: .32rem;}
.discuss-p-text{text-align: left;}
.infor-btn span{ font-size: .28rem; color: #888888; background: url(../assets/discuss-infors.png) no-repeat left .1rem; background-size: .32rem .28rem; padding-left: .42rem; float: right;}
.infor-btn a.jb-btn{float: right;display: block;width: .38rem; height: .34rem; background: url(../assets/jb-bg.png) no-repeat center right; background-size: .38rem .34rem; margin-right: 0; padding-left: .25rem;}
.mv-discuss{text-align: left;}
.fd-input-c .search-content .search-item .mn-input{text-align: left;}
.collect{ margin-top:.15rem;width: .4rem; height: .38rem; background: url(../assets/no-cancelstar.png) no-repeat;background-size: .4rem .38rem;}
.collect-active{background: url(../assets/collect-star.png) no-repeat; background-size: .35rem .33rem;}
.raido-nm{margin-top:.3rem; margin-left:.15rem;height: .3rem; background: url(../assets/nm-img2.png) no-repeat left .07rem; text-align: left; padding-left: .3rem; background-size: .22rem .22rem;color:#7eacff;font-size: .26rem;}
.raido-click{background: url(../assets/nm-img1.png) no-repeat left .07rem;background-size: .22rem .22rem}
.com-text{box-shadow: #888888 0 -5px 5px -5px;height: 2.7rem; background: #efefef; position: fixed; bottom: 0;z-index: 9999; width:100%; }
.mask{width: 100%; height: 100%; position: fixed; top: 0; left: 0;}
.disc-title{box-sizing: border-box; padding: 0 .5rem; border-top: .12rem solid #efefef; padding-top: .3rem; text-align: left;}
.disc-title span{ padding-bottom:.16rem;font-size: .28rem; display: block; background: url(../assets/pl-line.png) no-repeat left bottom; background-size: 100% .02rem; }
.disc-title span a{padding-bottom:.2rem;color: #888888;}
.fl-content a.jb-btn{float: right;display: block;width: .38rem; height: .34rem; background: url(../assets/jb-bg.png) no-repeat center right; background-size: .38rem .34rem; margin-right: 0; padding-left: .25rem; right: 0;}

</style>