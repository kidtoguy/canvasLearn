'use strict';
(function() {
	var canvas = document.getElementById('eluosi'),
	    context = canvas.getContext('2d'),
	    cW=234,
	    cH=360,
	    block,
	    block86;
	var startRowIndex=0,startColumnIndex=5;

        var git;
	var crT = [
		[
			[0,0,0,0],
			[1,1,1,0],
			[0,1,0,0],
			[0,0,0,0]
		],
		[
			[0,1,0,0],
			[1,1,0,0],
			[0,1,0,0],
			[0,0,0,0]
		],
		[
			[0,1,0,0],
			[1,1,1,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,1,0,0],
			[0,1,1,0],
			[0,1,0,0],
			[0,0,0,0]
		]	
	];
	var crTIndex = 0,
		arr = crT,
		tMax = arr.length,
		count = 0;

	var app = {
		init: function() {
			block86 = app._loadImage('img/blockbg2.png');
			setInterval(app._loop,1000/60);
		},
		//绘制背景
		_drawBg:function(){
			//context.drawImage(block86,0,0);
			var pattern = context.createPattern(block86,'repeat');
			context.rect(0,0,cW,cH);
			context.fillStyle=pattern;
			context.fill();
		},
		
		//循环
		_loop:function(){
			app._cleanScreen();
			app._drawBg();
			app._drawBlocks();

			count++;
			if(count%20==0){
				startRowIndex++;
			}
		},

		//绘制方块�		_drawBlocks:function(){
			
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					if(arr[crTIndex][i][j]==1){
						app._drawBlock(startRowIndex+i,startColumnIndex+j);
					}
				}
			}
		},

		//绘制一个方�	
		_drawBlock:function(rowIndex,columnIndex){
			var itemWidth = 18,itemHeight=18;
			block = app._loadImage('img/block.png');
			context.drawImage(block,columnIndex*itemHeight,rowIndex*itemWidth);
		},

		//常用方法--------------------------

		//清屏
		_cleanScreen:function(){
			context.clearRect(0,0,cW,cH);
		},
		//读取图片
		_loadImage:function(src){
			var img = new Image();
			img.src = src;
			return img;
		},
		_keyDownHandler:function(event){
			switch(event.keyCode){
				case 37:    //left
					startColumnIndex--;
					app._drawBlocks();
					break;
				case 38:    //up
					crTIndex = (crTIndex+1)%tMax;
					break;
				case 39:    //right
					startColumnIndex++;
					app._drawBlocks();
					break;
				case 40:    //down

					break;
			}
		},	
		//控制台方�		_log: function(str) {
			var console = window.console;
			console.log(str);
		}
	};
	window.onload = function() {
		app.init();
	};
	window.onkeydown = app._keyDownHandler;
})();