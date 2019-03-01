<template>
<div v-if="comment_num!==0">
	<div class="mv-discuss">
		<span>评论</span>
	</div>
	<div class="discuss-content">
		<ul>
			<li v-for="(com,index) in commenttext" :key="index">
				<div class="discuss-name">
					<div class="discuss-nickimg"><img :src="getimg(com.userInfo.head_img)" /></div>
					<div class="nick-content">
						<div class="nick-name">
							<span>{{com.userInfo.user_name}}</span>
							<img v-if="com.userInfo.level_star!='0'" :src="getLevel(com.userInfo.level_star)" />
						</div>
						<div class="dis-date">{{com.add_time}}</div>
						<span class="floor floor-yz">{{com.support}}</span>
					</div>
				</div>
				<div class="discuss-text">{{com.content}}</div>
				<router-link tag="div" class="two-discuss" :to="{path:'/commentDescribe',query:{id:com.id}}">
					<div class="discuss-p-text" v-for="rep in com.reply">
						<span>{{rep.userInfo.user_name}}:</span>
						<span>{{rep.content}}</span>
					</div>
				</router-link>
				<div class="infor-btn">
					<a class="jb-btn" href="javascript：void(0);"></a>
					<span @click="inforGo(com.userInfo.user_name)">回复</span>
				</div>
			</li>
		</ul>
		<div class="look-discuss cf">
			<router-link tag="a" :to="{path:'/allcomment',query:{id:this.get_id}}">查看全部评论</router-link>
		</div>
	</div>
	<div class="fd-input-c">
			<div class="search-content">
					<div class="search-item">
						<div class="mn-input" @click="closeShow">我来说两句...</div>
						<div class="t-infor">
							<img src="../assets/xz-infor.png" />
							<span>{{comment_num}}</span>
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
	export default{
		name:'Comment',
		data(){
			return{
				url:"http://192.168.18.82:19501/zxz/listone",
				isShow:false,
				isclass:true,
				commenttext:[],
				comment_num:''
			}
		},
		props:['get_id'],
		mounted:function(){
			this.url=this.url+'?id='+this.get_id;
			console.log(this.url);
		    this.$http.get(this.url, {
		        withCredentials: false
		    }).then( res => {
		      this.commenttext = res.body.result.comment;
		      this.comment_num=res.body.result.comment_num;
		      this.error = res.body.error;
	//	      this.$store.state.title = '发现';
		    }).catch(error => {
		    	console.log(error);
		    });
		    },
		    methods:{
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
		
	}
</script>

<style>
	.dis-date{text-align: left;}
	.floor{display: block; position: absolute; font-size: .28rem; color: #404040; top: 0; right: 0rem; background-image:url(../assets/discuss-z.png); background-repeat:no-repeat; background-size:.32rem .26rem; background-position:left 0.02rem; padding-left: .4rem;}
.discuss-p-text span{text-align: left; display: inline;float: none; font-size: .28rem; line-height: .32rem;}
.discuss-p-text{text-align: left;}
.infor-btn span{ font-size: .28rem; color: #888888; background: url(../assets/discuss-infors.png) no-repeat left .1rem; background-size: .32rem .28rem; padding-left: .42rem; float: right;}
.infor-btn a.jb-btn{float: right;display: block;width: .38rem; height: .34rem; background: url(../assets/jb-bg.png) no-repeat center right; background-size: .38rem .34rem; margin-right: 0; padding-left: .25rem;}
.mv-discuss{text-align: left;}
.fd-input-c .search-content .search-item .mn-input{text-align: left;}
</style>