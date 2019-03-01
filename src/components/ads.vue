<template>
	<div class="nav-swiper">
		<Swiper ref="swiper" v-if="swipelist.length>0">
            <Slide v-for="(item,index) in swipelist" :key=index>
            	<img :src="item.img" />
        	</Slide>
    	</Swiper>
	</div>
</template>

<script>
	
</script>

<style>
	
</style>