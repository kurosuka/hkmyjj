<template>
	<div class="mf-ads">
        <a href="">
            <span>广告</span>
            <img class="lazyimg" :src="get_src">
        </a>
    </div>
</template>

<script>
	export default{
		name:'mfads',
		data(){
			return{
				
			}
		},
		props:['get_src']
	}
</script>

<style>
</style>