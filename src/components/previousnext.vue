<template>
	<div class="article-item">
		<router-link tag='a' :to="{path:'/newsDescribe',query:{id:previous.news_id}}" @click.native="gotolink"><span>上一篇：</span>{{previous.content}}</router-link>
		<router-link tag='a' :to="{path:'/newsDescribe',query:{id:next.news_id}}" @click.native="gotolink"><span>下一篇：</span>{{next.content}}</router-link>
	</div>
</template>

<script>
	export default{
		name:"previousnext",
		data(){
			return{
				url:'',
				previous:
					{
						news_id:1,
						content:"建设科技强国 习近平提出这五点要求 潜心科研"
					}
				,
				next:
					{
						news_id:123,
						content:"高规格高礼遇 各国欢迎习近平访问亮点多"
					}
				
			}
		},
		props:['get_id'],
		mounted:function(){
			
		  },
		  methods:{
		  	gotolink:function(){
		  		this.$router.go(0);
		  	}
		  }
	}
</script>

<style>
</style>