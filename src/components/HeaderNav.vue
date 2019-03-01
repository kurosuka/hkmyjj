<template>
<div class="allSort">
	<div class="sortMenu clearfix">
		<ul class="sortMenu-ul">
			<router-link tag="li" class="cell" v-for="(item,index) in headerNav" :to="item.toLink" :key="index">{{item.type}}</router-link>
		</ul>
	</div>
</div>
</template>

<script>
	export default{
		name:'HeaderNav',
		data(){
			return{
				headerNav:[
				{type:'首页',toLink:"/"},
				{type:'经济要闻',toLink:"jjyw"},
				{type:'民企风采',toLink:"mqfc"},
				{type:'投资虹口',toLink:"tzhk"},
				{type:'企业服务',toLink:"qyfw"},
				{type:'商学院',toLink:"sxy"}
				]
			}
		},
		methods:{
			choose:function (index) {  
                 
                    }  
		}
	}
</script>

<style>
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
.sortMenu-ul .router-link-exact-active{border-bottom: 3px solid #EB5961;}
.sortMenu-ul { 
  min-width:400px; 
  display: flex;
  justify-content: flex-start;
  background: #EFEFEF;
  box-sizing: border-box;
  padding-left: .5rem;
  padding-right: .5rem;
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
    color: #000000;
    margin-right: .25rem;
}
.sortMenu .cell a{color: #000000;}
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
</style>