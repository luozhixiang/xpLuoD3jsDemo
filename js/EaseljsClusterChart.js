var smr = smr || {};

(function($){
		
	// --------- Component Interface Implementation ---------- //
	function EaseljsClusterChart(){};
	smr.EaseljsClusterChart = EaseljsClusterChart; 
  
	EaseljsClusterChart.prototype.create = function(data,config){
		var html = hrender("tmpl-EaseljsClusterChart",{});
		return html;
	}
		
	EaseljsClusterChart.prototype.postDisplay = function(data, config) {
		var view = this;
		var $e = view.$el;
		var dataSet = createDataSet(30);
		view.dataSet = dataSet;
		data = transformData(dataSet);
		view.showView(data);
		createjs.Ticker.useRAF = true;
	}
	
	EaseljsClusterChart.prototype.showView = function(data){
		var view = this;
		var $e = view.$el;
		
		var canvas = $e.find("canvas").get(0);
		var stage = new createjs.Stage(canvas);
			
		//draw the background shape
		var containershap = new createjs.Container();
		containershap.x=-100;
		containershap.y=-100;
		var bg = new createjs.Shape();
		containershap.addChild(bg);
		
		//draw the center node
		var centerPoint = new createjs.Graphics().beginFill("#006400").drawCircle(400, 400, 10).closePath();
		var shape = new createjs.Shape(centerPoint);
		containershap.alpha=0;
		containershap.addChild(shape);
		
		//draw the center node text
		var centerText = new createjs.Text(data.name, "10px Arial", "#777");
		centerText.x = 410;
		centerText.y = 410;
		containershap.addChild(centerText);
		
		$.each(data.children,function(i,item){
			
			//calculate the angle of the node and the line length
			var angle = (360/data.children.length)*(Math.PI/180)*i;
			var lineLength = (item.weight/10) * 150;
			
			//calculate the node position of circle center 
			var point = {x:400+ (Math.cos(angle)*lineLength),y:400 + (Math.sin(angle)*lineLength)};			
			
			//draw the node
			var node = new createjs.Shape();
			node.graphics.beginFill("rgba(255,102,0,1)").drawCircle(point.x, point.y, 10).closePath();
			node.point=point;
			node.pname = item.name;
			containershap.addChild(node);
			
			//add click event for the node
			node.addEventListener("click",function(evt){
				var mpx = (evt.target.point.x - 400)/10;
				var mpy = (evt.target.point.y - 400)/10;
				
				evt.target.graphics.clear()
				evt.target.graphics.beginFill("#006400").drawCircle(evt.target.point.x, evt.target.point.y, 10).closePath();
				centerPoint.clear();
				centerPoint.beginFill("rgba(255,102,0,1)").drawCircle(400, 400, 10).closePath();
				createjs.Ticker.setFPS(30);
				createjs.Ticker.addEventListener("tick", tick);
	    		
	    		function tick(){
	    			containershap.alpha = containershap.alpha-0.1;
	    			containershap.x = containershap.x-mpx;
	    			containershap.y = containershap.y-mpy;
	    			stage.update();
	    			if(containershap.alpha<=0){
	    				createjs.Ticker.removeEventListener("tick", tick);
	    				stage.clear();
	    				var userData = transformData(view.dataSet,evt.target.pname);
	    				view.showView(userData);
	    			}
	    		}
			});
			
			//draw the line 
			bg.graphics.beginStroke(i%2 ? "#333" : "#444") .moveTo(400,400).lineTo(point.x,point.y);
			
			//draw the node text
			var text = new createjs.Text(item.name, "10px Arial", "#777");
			var deviation = getDeviationForNodeText(data.children.length,i);
			text.x = point.x + deviation.mx;
			text.y = point.y + deviation.my;
			containershap.addChild(text);
			
		});
		
		stage.addChild(containershap);	
		stage.update();
		createjs.Ticker.setFPS(20);
		createjs.Ticker.addEventListener("tick", showTick);
		
		function showTick(){
			containershap.alpha = containershap.alpha+0.2;
			stage.update();
			if(containershap.alpha>=1){
				createjs.Ticker.removeEventListener("tick", showTick);
			}
		}
		
	}
	
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Private Method --------- //
	function getDeviationForNodeText(length,index){
		var mx = 0;
		var my = 0;
		var ang = (360/length)*index;
		if(ang <= 45){
			mx = 15;
			my = -6;
		}else if(ang > 45 && ang <= 90){
			mx = 2;
			my = 7;
		}else if(ang > 90 && ang <= 180){
			mx = -50;
			my = -6;
		}else if(ang > 180 && ang <= 225){
			mx = -50;
			my = -5;
		}else if(ang > 225 && ang <= 270){
			mx = -50;
			my = -15;
		}else if(ang > 270 && ang <= 315){
			mx = 10;
			my = -20;
		}else if(ang > 315 && ang < 360){
			mx = 10;
			my = -10;
		}
		return {mx:mx,my:my};
	}
	
	function createDataSet(dataSize){
		var dataSet = [];
		dataSize = dataSize || 10;
		for(var i = 1; i <= dataSize;i++){
			var data = {};
			data.id = i;
			data.name = "User" + i;
			var friendsNum = RandomData(5,10);
			var friendsArr = [];
			for(var j = 1; j < friendsNum;j++){
				var friend = {};
				if(j == i) continue;
				friend.id = j;
				friend.name = "User" + j;
				friend.weight = RandomData(5,10);
				friendsArr.push(friend);
			}
			data.friends = friendsArr;
			dataSet.push(data);
		}
		return dataSet;
	}
	
	//generate the data between fromNum and toNum
	function RandomData(fromNum,toNum){ 
		return parseInt(Math.random()*(toNum-fromNum) + fromNum); 
	}
	
	function transformData(dataSet,name){ 
		var object = {};
		if(typeof name == 'undefined'){
			var dataPart = dataSet[0];
			object.id = dataPart.id;
			object.name = dataPart.name;
			object.children = dataPart.friends;
		}else{
			$.each(dataSet,function(i,user){
				if(name == user.name){
					var dataPart = dataSet[i];
					object.id = dataPart.id;
					object.name = dataPart.name;
					object.children = dataPart.friends;
				}
			});
		}

		return object;
	}
	
	function fRandomBy(under, over){ 
		switch(arguments.length){ 
			case 1: return parseInt(Math.random()*under+1); 
			case 2: return parseInt(Math.random()*(over-under+1) + under); 
			default: return 0; 
		} 
	} 
	
	function weightSort(a,b){
		return a.weight>b.weight ? 1 :-1;
	}
	// --------- /Private Method --------- //
	
	// --------- Component Registration --------- //
	brite.registerView("EaseljsClusterChart",{
		emptyParent: true
	},
	function(){
		return new smr.EaseljsClusterChart();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
