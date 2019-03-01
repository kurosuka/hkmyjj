<template>
    <div class="moudle-one">
		<router-link class="md-one-item" v-for="(newsdata,index) in twonewsList" :to="{path:'/newsDescribe',query:{id:newsdata.news_id}}" :key="index">
				<img :src="newsdata.news_pic" />
				<span>{{newsdata.news_title}}</span>
		</router-link>
	</div>
</template>
<script> 
 
export default {
  name: 'twoNews',
  data () {
    return {
    	url:"",
     twonewsList:[
     	{
     		news_id:'122',
     		news_title:'吴信宝勉励民营企业家：在实现高水平高品质发展的舞台上大显身手、成就梦想',
     		news_pic:'https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360'
     	},
     	{
     		news_id:'234',
     		news_title:'吴信宝勉励民营企业家：在实现高水平高品质发展的舞台上大显身手、成就梦想',
     		news_pic:'https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360'
     	}
     ]
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
</style>