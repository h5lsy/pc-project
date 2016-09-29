$(function(){
	var goodsDetail = {
		init: function(){
			this.numInput = $('.amount-option .num-input');
			
			this.styleSelect();
			this.numAdd();
			this.numReduce();
			this.numInputval();
			this.addCart();
			
			
		},
		//商品款式的选择
		styleSelect: function(){
			$('.goods-style .g-s-item').click(function(){
				$(this).addClass('selected').siblings().removeClass('selected');
			});
		},
		//增加商品数量
		numAdd: function(){
			var that = this;
			$('.amount-option .num-add').click(function(){
				var amount = parseInt(that.numInput.val());//获取的是字符串
				//判断库存
				if(amount >= 999){
					return;
				}
				amount++;
				that.numInput.val(amount);
			});
		},
		//减少商品数量
		numReduce: function(){
			var that = this;
			$('.amount-option .num-reduce').click(function(){
				var amount = parseInt(that.numInput.val());//获取的是字符串
				//判断库存
				if(amount <= 1){
					return;
				}
				amount--;
				that.numInput.val(amount);
			});
		},
		//直接输入
		numInputval: function(){
			//实时监控文本框的值是否发生变化
			this.numInput.on('input propertychange',function(){
				var amount = $(this).val();
				//判断是否为0
				if(amount <= 0){
					amount = 1;
				}else if(amount > 999){
					amount = 999;
				}
				//判断输入是否含非数字字符
				var reg = /^\d+$/;
				if(!reg.test(amount)){
					amount = 1;
				}
				$(this).val(amount);
			});
		},
		
		
		//**加入购物车**
		addCart: function(){
			$('.good-buy .add-cart').click(function(){
				//购物车的数据怎么存储？ cookie
				/*
					cart --> {} 存储在cookie中的购物车数据
						{
							'1001':{
								good-id:1001,
								goods-amount:999,
							}
						}
				*/
				var cart = $.cookie('mls-cart') || '{}' //可能不存在，cookie里面什么都没有
				cart = JSON.parse(cart);	//json字符串形式转为json对象形式
				
				
				var goodsId = $('.goods-style .g-s-item.selected').data('gid');
				var amount = $('.amount-option .num-input').val();//amount是字符串
				//判断cart中是否存在当前商品
				if(!cart[goodsId]){
					cart[goodsId] = {
						goodsId: goodsId,
						goodsAmount: parseInt(amount)
					};
				}else{
					cart[goodsId].goodsAmount += parseInt(amount);
				}
				
				//写到cookie中
				$.cookie('mls-cart',JSON.stringify(cart),{expires:365,path:'/'});
				console.log(JSON.parse('mls-cart'));
				alert("添加成功");
				
				
				
			});
		},
		
		
	};
	goodsDetail.init();
});