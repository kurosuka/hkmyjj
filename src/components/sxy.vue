<template>
	<div class="app-wraper">
			<div class="nav-crumb cf">
				<a href="javascript:void(0);" class="back-c" @click="back"><img src="../assets/back-c.png" /></a>
				<router-link tag='a' :to="{path:'/'}" class="inner-logo">虹口民营经济</router-link>
				<router-link tag='a' class="inner-logo" :to="{path:'/'}"></router-link>
				<ul>
					<li><a href="javascript:void(0);">商学院</a></li>
				</ul>
				<a href="javascript:void(0);" class="infor-nick"><img src="../assets/f-nickname.png" /></a>
			</div>
			<HeaderNav></HeaderNav>
            <div id="news-list">
				<div  v-for='item in list'>
					<div class="text-list no-img-text" v-if="item.article_img===''">
					<span><router-link tag="a" :to="{path:'/newsDescribe',query:{id:item.article_id}}">{{item.title}}</router-link></span>
					<div class="item-text">
						<span class="text-origin">{{item.source.substr(0,5)}}</span>
						<span class="text-date">{{jsDateDiff(item.add_time)}}</span>
						<div class="zc-item">
							<div class="z-item">
								<img src="../assets/z.png"  />
								<span>{{item.point}}</span>
							</div>
						</div>
						<div class="text-item-content"><span class="text-item">{{item.type}}</span></div>
					</div>
					</div>
					<!--一张小图-->
					<div class="text-list one-img-text" v-if="item.article_img!==''">
						<div class="ms-img"><img class="lazyimg" :src="'http://211.152.36.66:3013'+item.article_img" /></div>
						<div class="ms-text">
							<span><router-link tag="a" :to="{path:'/newsDescribe',query:{id:item.article_id}}">{{item.title}}</router-link></span>
							<div class="item-text">
								<span class="text-origin">{{item.source.substr(0,5)}}</span>
								<span class="text-date">{{jsDateDiff(item.add_time)}}</span>
								<div class="zc-item">
									<div class="z-item">
										<img src="../assets/z.png"  />
										<span>{{item.point}}</span>
									</div>
								</div>
							<div class="text-item-content"><span class="text-item text-item-link">{{item.type}}</span></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--结束-->
		</div>
</template>

<script>
	import HeaderNav from "../components/HeaderNav.vue"
	export default{
		name:'sxy',
		components:{
			HeaderNav
		},
		data(){
			return{
				url:"http://192.168.18.82:19501/zxz/listjjyw",
				list:[],
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			getDate(){
				var timestamp=Date.parse(new Date());
				
			},
			jsDateDiff(publishTime) {
		var d_minutes, d_hours, d_days;
		var timeNow = parseInt(new Date().getTime() / 1000);
		var d;
		publishTime= new Date(publishTime).getTime();
		d = timeNow - publishTime;
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
			var s = new Date(publishTime * 1000);
			// s.getFullYear()+"年";
			if(s.getMonth()+1<10&&s.getDate()<10){
		    				return(
		    					"0"+(s.getMonth() + 1)
		    				) + "-" + "0"+s.getDate();
		    			}else{
		    				return(s.getMonth() + 1) + "-" + s.getDate();
		    			}
		}
	}
		},
		mounted: function (){
	    this.$http.get(this.url, { 
	        withCredentials: false
	    }).then( res => {
	      this.list = res.body.result;
	      this.error = res.body.error;
//	      this.$store.state.title = '发现';
	    }).catch( error => {
	      console.log(error);
	    });
	  }
	}
</script>

<style>
	/* 分类菜单*/
.sortMenu{
  width: 100%; 
  background-color:#fff; 
  overflow-x: scroll; 
  -webkit-overflow-x: scroll;
  background: #efefef;
}
.sortMenu::-webkit-scrollbar{ 
  width: 0; 
  height: 0;   
  background-color: #fff;  
}
.active{border-bottom: 3px solid #EB5961;}
.sortMenu-ul { 
  min-width:400px; 
  display: flex;
  justify-content: flex-start;
  background: #EFEFEF;
}
.sortMenu .cell{ 
  display: inline-block; 
  font-size: .3rem;
  height: .9rem;
  line-height: .9rem;
  text-align: center;
  position: relative;
      text-overflow: ellipsis;
    word-break: keep-all;
    background: #efefef;
}
.sortMenu .cell:last-child{margin-right: .5rem;}
.sortMenu .cell.special a{
  color: #000000;
}
.sortMenu .cell.special:before {
  content: '';
  height: 2px;
  width: 100%;
  background: #efefef;
  position: absolute;
  bottom: 0px;
}
.sortMenu .all{
  right: 0;
  top: 0;
  height: 35px;
  width: 35px;
  position: absolute;
  background: #fff;
  z-index: 10;
  display: flex;
  justify-content:center;
  align-items:center;
}
.sortMenu .all:before{
  content: '';
  height: 25px;
  width: 1px;
  position: absolute;
  box-shadow: 1px 0px 1px #e0e0e0;
  left: 0px;
}
.sortMenu .all img{
  display: block;
  width: 16px;
}
.sortMenu .pull-down{
  position: absolute;
  top: 40px;
  height:auto;
  width: 100%;
  background: #fff;
  z-index: 1;
  border-top: 1px solid #f2f2f2;

}
.pull-down-sort{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: space-around;
  flex-wrap: wrap;
  flex-direction: row
}
.pull-down-sort li{
  float: left;
  padding: .1rem
}
.pull-down-sort li a:hover{
  color: #ff474c;
}
.text-list span.text-item-link{ background-color: #f1f1f1; color: #EB5961; background-image: url(../assets/sg.png); background-size: .13rem .21rem; background-position: center right .05rem; background-repeat: no-repeat; padding-right: .25rem; border: 1px solid #f1f1f1;}

</style>