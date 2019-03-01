<template>
	<div class="login-bg">
		<div class="header-nav">
    		<a href="#" class="nav-back"><img src="../assets/ip-back.png" /></a>
    		<span class="header-name">会员登录</span>
    		<a href="#" class="index-back"></a>
    		<a href="#" class="login-quick">注册</a>
    	</div>
    	<div class="login-nav">
			<span><a class="login-nav-on">账号登录</a></span>
			<span><a>手机动态密码登录</a></span>
		</div>
		<div class="login-content">
			<div class="phone-com-fren login-com phone-comname"><input placeholder="请输入手机号/昵称" v-model="phone" /><i></i></div>
			<div class="login-com phone-psd"><input placeholder="请输入密码" v-model="userpassword" /><i></i></div>
		</div>
		<div class="login-content-btn" @click="register()"><div class="login-btn">登录</div></div>
		<div class="regis-btm">
			<a href="#">免费注册</a>
			<a href="#"><span>忘记密码？</span></a>
		</div>
		<!--
        	作者：offline
        	时间：2018-06-11
        	描述：弹框
        -->
		<div class="alert-content" v-if="isshow">
		<div class="alert-title">
			<span class="yzm-title">{{message}}</span>
			<span class="ture-btn" @click="_ishow()">确定</span>
		</div>
	</div>
	</div>
</template>

<script>
	export default{
		name:'register',
		data(){
			return{
				isshow:false,
				phone:'',
				userpassword:'',
				message:'',
				url:'http://192.168.18.82:19501/admin/userlogin',
				token:''
			}
		},
		methods:{
			register(){
				//this.url=this.url+"?phone="+this.phone+"&password="+this.password
				if(this.phone==""||this.userpassword==""){
					this.isshow=!this.isshow
					this.message="账号或密码不能为空！"
				} else {
	this.$http.post(this.url,{phone:this.phone,password:this.userpassword},{emulateJSON:true}, {
		withCredentials: false
	}).then(res=>{
		if(res.body.code=='200'){
			this.$router.push({path:"/"})
			this.phone=res.body.result.phone;
			this.userpassword=res.body.result.pasword;
			this.token=res.body.result.token;
			localStorage.setItem('phone', this.phone);
			localStorage.setItem('token',this.token);
			alert("登录成功！")
		}else if(res.body.code=='403'){
			this.message="账号或密码不正确！"
			this.isshow=!this.isshow
		}
	}).catch( error => {
        console.log(error);
      })
}
},
_ishow() {
	this.isshow = false;
}
}
}</script>

<style>
.login-nav{width: 100%; box-sizing: border-box; display: -webkit-box;background: url(../assets/phone-shortline.png) repeat-x bottom; padding-left: .7rem; padding-right: .7rem; display: flex; display: -webkit-flex;-webkit-justify-content: space-between; justify-content: space-between;}
.login-nav span{font-size: 0.26rem; height: 1rem; line-height: 1rem; display:block; text-align: center; width: 50%;}
.login-nav span a{width: 100%; text-align: center;font-size: 0.32rem; height: .99rem; line-height:  .99rem; display: block; text-align: center;text-decoration: none; color: #333333;}
.login-nav span a.login-nav-on{ background:url(../assets/phone-line.png) repeat-x bottom;color: #EB5961;height: .99rem; line-height:  .99rem}
.login-content{padding-left: .7rem; padding-right: .7rem;-webkit-box-sizing:content-box;box-sizing:content-box; overflow: hidden; margin-top: .01rem;}
.login-content .login-com{height: .98rem; border-bottom: 1px solid #d6d6d6; box-sizing: border-box; line-height: .98rem;font-size: .32rem;}
.phone-comjd{height: .98rem; border-bottom: 1px solid #d6d6d6;line-height: .98rem; position: relative;}
.phone-comjd i{background: url(../assets/phone-address.png) no-repeat left center; background-size: .35rem .5rem;width: .35rem; height: .98rem; position: absolute; left: 0;}
.phone-comjd span{font-size: .32rem; line-height: .98rem; height: .98rem; float: left; color:#888888; margin-left: .5rem; background: url(../assets/input-tr.png) no-repeat right .5rem center;background-size: .2rem .33rem; width: 100%;}
.phone-comjd{font-size:.32rem;background: url(../assets/phone-jd.png) no-repeat right 10px center; background-size: .18rem .35rem;box-sizing: border-box;}
.login-content div input{width: 100%;color:#333333;-webkit-box-sizing:content-box;box-sizing: border-box; background: none;  border: none; font-size: .32rem; display: inline-block; padding-left: 5px; border-radius: 0; padding-left: .5rem;}
.login-content .ph-yzm{position: relative;}
.login-content .ph-yzm input{width: 50%; border: none;}
.phone-psd{height: .8rem; border-bottom: 1px solid #FBC8C5;line-height: .8rem; position: relative;}
.phone-psd i{background: url(../assets/regist-psd.png) no-repeat left center; background-size: .35rem .44rem;width: .35rem; height: .98rem; position: absolute; left: 0;}
.ph-yzm i{background: url(../assets/phone-yzm.png) no-repeat left center; background-size: .35rem .5rem; width: .35rem; height: .98rem; position: absolute; left: 0;}
.ph-yzm span{ float:right;font-size: .28rem;line-height: .98rem; display: block; color: #EB5961; margin-right: 10px;}
.login-content-btn{box-sizing: content-box; padding-left: .7rem; padding-right: .7rem;}
.login-content-btn-s{box-sizing: content-box; padding-left: 1.4rem; padding-right: 1.4rem;}
.register-content-btn{box-sizing: content-box; padding-left: .4rem; padding-right: .4rem;}
.login-btn{width: 100%; height: .95rem;line-height: .95rem;font-size: .38rem; background: #eb5961; text-align: center; color: #ffffff;border-radius: 4px; margin-top: 0.6rem;}
.login-content-btn-s .login-btn{width: 100%; height: .6rem;line-height: .6rem;font-size: .32rem; background: #eb5961; text-align: center; color: #ffffff;border-radius: 4px; margin-top: 0.46rem;}
.login-career{margin-top: 0;}
.popuptitle{position: fixed; width: 100%; height: 100%;background: url(../assets/phone-bg.png) repeat;  top: 0;}
.pop{height: 50%; background: #ffffff; position: absolute; top: 100%; width: 100%;}
.popbtn{height: .74rem; background: #ffffff;}
.popbtn span:first-child{float: right; height: .74rem; color: #ffffff; font-size: .28rem; line-height: .74rem; margin-right: .25rem;}
.popbtn span.qx-btn img{width: .36rem; height:.24rem}
.popbtn span{float: right; height: .8rem; color: #ffffff; font-size: .28rem; line-height: .8rem; margin-right: .5rem;}
.popcontent{-webkit-justify-content:space-between;justify-content:space-between;background:#ffffff;box-sizing: content-box; overflow: hidden; padding-left: .5rem; padding-right: .5rem; display: flex; display: -webkit-flex;-webkit-flex-flow: row wrap; flex-flow: row wrap; }
.popcontent span{font-size: .24rem; height: .46rem; line-height: .46rem; color: #333333 ;text-align: center; border: 1px solid #f1eee3; width:22%; border-radius: 4px; margin-top: .15rem; background: #f1eee3;}
.popcontent .span-on{border: 1px solid #eb5961; color:#eb5961; background: #ffffff;}
.popcontent span.input-text{width: 100%; height:.52rem; line-height: .52rem;}
.popcontent span.input-text input{ background:#f1eee3;width:100%; padding-left:10px;border: none; outline: none; font-size: .24rem; height: .52rem; line-height: .52rem; box-sizing: border-box;}
.popcontent span.input-text input::-webkit-input-placeholder{
    color: #999999;opacity:1;font-size: .24rem;
}
.displaynone{display: none;}
.phone-comname{position: relative;}
.phone-comname i{background: url(../assets/phone-name.png) no-repeat left center; background-size: .35rem .44rem; width: .35rem; height: .98rem; position: absolute; left: 0;}
.phone-career{position: relative;}
.phone-career i{background: url(../assets/phone-b.png) no-repeat center; background-size: .35rem .57rem; width: .35rem; height: .98rem; position: absolute;}
.phone-mumber{position: relative;}
.phone-mumber i{position: absolute; left: 0; background: url(../assets/phone-number.png) no-repeat left center; background-size: .35rem .53rem; width: .35rem; height: .98rem;}
.phone-comaddress{position: relative;}
.phone-comaddress i{position: absolute; left: 0; background: url(../assets/p-address.png) no-repeat left center; background-size: .4rem .42rem; width: .4rem; height: .98rem;}
.enterprise-name{position: relative;}
.enterprise-name i{position: absolute; left: 0; background: url(../assets/enterprise-name.png) no-repeat left center; background-size: .35rem .33rem; width: .35rem; height: .98rem;}
.alert-content{z-index:9999999;display: flex;display:-webkit-flex;justify-content: center;-webkit-justify-content:center;align-items: center;-webkit-align-items:center;position: fixed;width: 100%;box-sizing: border-box;height: 100%;background: url(../assets/phone-bg.png) repeat;top: 0;padding-left: .9rem;padding-right: .9rem;}
</style>