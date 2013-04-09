var smr = smr || {};

(function($){
		
	var _weightPerLength = [20,10,8,4];
	var _baseLineLen = [80,40,20,10];
	var _colors = ["#0B95B1","#ff7f0e","#aec7e8","#dddddd"];
	var _centerColors = ["#ffe9c2","#0B95B1","#ff7f0e","#aec7e8","#dddddd"];
	
	// --------- Component Interface Implementation ---------- //
	function ZoomCluster(){};
	smr.ZoomCluster = ZoomCluster; 
  
	ZoomCluster.prototype.create = function(data,config){
		var html = hrender("tmpl-ZoomCluster",{time:app.time});
		return $(html);
	}
		
	ZoomCluster.prototype.postDisplay = function(data, config) {
		var view = this;
		var $e = view.$element;
		createjs.Ticker.setFPS(1000);
		createjs.Ticker.useRAF = true;
		view.scale = 0.8;
		app.ContactDao.get().done(function(chartData){
        	view.showView(chartData);
		});
		
		$e.find(".zoom input").slider().off('slideStop').on('slideStop', function(ev){
			sliderChange.call(view,ev);
		});
		
		$e.find(".level input").slider().off('slideStop').on('slideStop', function(ev){
			levelSliderChange.call(view,ev);
		});
		
	}
	
	ZoomCluster.prototype.showView = function(data){
		var view = this;
		var $e = view.$element;
		var canvas = $e.find("canvas").get(0);
		var stage = new createjs.Stage(canvas);
		
        view.stage = stage;
        view.currentContainerName = "currentContainer";
        view.newContainerName = "newContainer";
        view.cName = "centerCircle";
        view.originPoint = {x:350,y:300};
        view.level = 2;
	      
        var container = createContainer.call(view, data, view.originPoint, view.level, 0);
        container.name = view.currentContainerName;
        stage.addChild(container);
        stage.update();		
	}
	
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Private Method --------- //
	
	function createContainer(data,centerPosition,level,exAngle){
	      var view = this;
	      if(level==view.level) view.rootName = data.name;
	      var stage = view.stage;
	      var baseLineLength = _baseLineLen[view.level - level];
	      var weightPerLength = _weightPerLength[view.level - level];
	      var centerX = centerPosition ? centerPosition.x:300;
	      var centerY = centerPosition ? centerPosition.y:400;
	      var angle = (360/data.children.length)*(Math.PI/180);
	      var container = new createjs.Container();
	      if(level==view.level) data.children.sort(weightSort);
	      $.each(data.children,function(i,cData){
	    	  	if(level!=view.level && i==0){
	    	  	}else{
			        var weight = 10 - cData.weight ;
			        var l = weight * weightPerLength + baseLineLength;
			        var cx = centerX + l * Math.sin(angle * i+exAngle);
			        var cy = centerY + l * Math.cos(angle * i+exAngle);	
			        
			        //draw the node and the line
			        var line = createLine.call(view,centerX,centerY,cx,cy,level);
			        var node = createNodeCircle.call(view,cx,cy,cData.name,level);
			        container.addChild(line);
			        container.addChild(node);
			        node.addEventListener("click",function(evt){nodeClickEvent.call(view,evt.target);});
			        
			        
			        //draw the node text
			        if(view.level-level<=1){
			        	var text = new createjs.Text(cData.name, "10px Arial", "#777");
			        	text.x = cx - 20;
			        	text.y = cy + 10;
			        	text.originPotint = {x:cx - 20,y:cy + 10};
			        	node.relatedText = text;
			        	container.addChild(text);
			        }
			        
					if((level-1)>0){
						var newData = app.transformData(app.dataSet, cData.name, data.name);
						var newContainer = createContainer.call(view, newData,{x:cx,y:cy}, level-1,(Math.PI+angle * i)+exAngle);
						node.relatedContainer = newContainer;
						container.addChild(newContainer);
					}
	    	  	}
				
	      });
	      
	      //draw the center node
	      var centerCircle = createCenterCircle.call(view,centerX,centerY,view.cName,data.id);
	      container.addChild(centerCircle);
	      if(level==view.level){
		      centerCircle.addEventListener("click",centerCircleClickEvent);
		      //draw the center node text
		      var centerText = new createjs.Text(data.name, "10px Arial", "#777");
		      centerText.x = centerX-20;
		      centerText.y = centerY+10;
		      container.addChild(centerText);
		      container.x = (1-view.scale)*view.originPoint.x;
		      container.y = (1-view.scale)*view.originPoint.y;
		      container.scaleX = container.scaleY = view.scale;
		  }
	      return container;
	}
	
	function sliderChange(slider){
		var view = this;
		var value = parseFloat(slider.value)/10;
		var stage = view.stage;
		view.scale = value;
		var bmp = stage.getChildByName(view.currentContainerName);
		bmp.scaleX = bmp.scaleY = value;
		bmp.x = (1-value)*view.originPoint.x; 
		bmp.y = (1-value)*view.originPoint.y; 
		stage.update();
		view.$element.find(".zoom-value").text(value);
	}
	
	function levelSliderChange(slider){
		var view = this;
        var value = parseFloat(slider.value);
        var stage = view.stage;
        view.level = value;
        var newData = app.transformData(app.dataSet, view.rootName);
        var newContainer = createContainer.call(view, newData, view.originPoint, view.level, 0);
        var oldContainer = stage.getChildByName(view.currentContainerName);
        newContainer.name = view.currentContainerName;
        stage.removeChild(oldContainer);
        stage.addChild(newContainer);
        stage.update();
        view.$element.find(".level-value").text(value);
	}
	
    function reDrawLine(line,offsetX,offsetY) {
        var view = this;
        var lineClone = {x0:line.x0+0, y0:line.y0+0, x1:line.x1+0, y1:line.y1+0};
        line.graphics.clear().beginStroke("#0B95B1").moveTo(lineClone.x0, lineClone.y0).lineTo(offsetX, offsetY);
        line.x1 = offsetX;
        line.y1 = offsetY;
    }
	
	
	function centerCircleClickEvent(evt) {
		var $popover = $(".popover");
		if($popover.size()==0){
			app.ContactDao.get(evt.target.nid).done(function(chartData){
				var html = hrender("tmpl-popover-right",{name:chartData.name,num:chartData.children.length,left:evt.rawX+4,top:evt.rawY-38});
	        	$(".ZoomCluster").append(html);
			});
		}else{
			$popover.remove();
		}
	}
	
	
    function createNodeCircle(cx,cy,cName,level){
    	var view = this;
        var r = 5;
        var circle = new createjs.Shape();
        var color = _colors[view.level - level];
        circle.graphics.beginFill(color).drawCircle(0, 0, r);
        circle.graphics.beginStroke("#979ca3").drawCircle(0, 0, r+1);
        circle.x = cx;
        circle.y = cy;
        circle.originPotint = {cx:cx,cy:cy};
        circle.name = cName;
        return circle;
    }
      
    function createCenterCircle(centerX,centerY,cName,nid){
	    var r = 5;
	    var circle = new createjs.Shape();
	    circle.graphics.beginStroke("#a4998e").drawCircle(0, 0, r+1);
	    circle.graphics.beginFill("#ffe9c2").drawCircle(0, 0, r);
	    circle.name = cName;
	    circle.x = centerX;
	    circle.y = centerY;
	    circle.nid = nid;
	    return circle;
   }
      
   function createLine(x0, y0, x1, y1,level){
        var line = new createjs.Shape();
        var color = "#cccccc";
        if(level==3){
        	color = "#f60";
        }else if(level==2){
        	color = "#0B95B1";
        }
        line.graphics.beginStroke(color).moveTo(x0,y0).lineTo(x1,y1);
        line.x0 = x0;
        line.y0 = y0;
        line.x1 = x1;
        line.y1 = y1;
        return line;
   }
	
   function nodeClickEvent(circleNode) {
	      var view = this;
	      var stage = view.stage;
	      var oldContainer = stage.getChildByName(view.currentContainerName);
	      var newCircle = createCenterCircle.call(view,circleNode.x,circleNode.y);
	      oldContainer.removeChild(circleNode);
	      oldContainer.addChild(newCircle);

	      var oldCenterCircle = oldContainer.getChildByName(view.cName);
	      var newCenterCircle = createNodeCircle.call(view,oldCenterCircle.x,oldCenterCircle.y,view.cName);
	      oldContainer.removeChild(oldCenterCircle);
	      oldContainer.addChild(newCenterCircle);
	      
	      var centerX = newCenterCircle.x;
	      var centerY = newCenterCircle.y;

	      //create new Container
	      var newData = app.transformData(app.dataSet, circleNode.name);
	      var newContainer = createContainer.call(view, newData, view.originPoint, view.level, 0);
	      newContainer.name = view.newContainerName;
	      newContainer.x = newContainer.x + (circleNode.x - centerX)* view.scale;
	      newContainer.y = newContainer.y + (circleNode.y - centerY)* view.scale;
	      
	      console.log(newContainer.x+"|------------------|"+newContainer.y);
	      newContainer.alpha = 0;
	      stage.addChild(newContainer);
	      stage.update();
	      
	      
	      var x0 = centerX;
	      var y0 = centerY;
	      var x1 = newCircle.x;
	      var y1 = newCircle.y;
	      //app.time = view.$timeSoa.val();
	      
	      var ox = oldContainer.x - (x1 - x0)* view.scale;
	      var oy = oldContainer.y - (y1 - y0)* view.scale;
	      createjs.CSSPlugin.install(createjs.Tween);
	      createjs.Tween.get(oldContainer).to({alpha : 0, x : ox, y : oy }, app.time, createjs.Ease.quartInOut); 
	      createjs.Tween.get(newContainer).to({alpha : 1, x : (1-view.scale)*view.originPoint.x , y : (1-view.scale)*view.originPoint.y  }, app.time, createjs.Ease.quartInOut).call(animationEnd); 
	      var $popover = $(".popover");
	      if($popover.size()>0){
	    	  var position = $popover.eq(0).position();
	    	  var popx = position.left -(x1 - x0);
	    	  var popy = position.top  -(y1 - y0);
	    	  createjs.Tween.get($popover[0]).to({opacity : 0.01, left : popx , top : popy }, app.time,createjs.Ease.quartInOut).call(function(){$popover.remove();});
	      }
	      
//	     var $contactInfo = view.$el.find(".contact-info");
//		 $contactInfo.html('<span class="label label-info">'+newData.name+": "+newData.children.length+' friends</span>')
//    	 			 .css({"top":circleNode.y-10,"left":circleNode.x+20});
//	     createjs.Tween.get($contactInfo[0]).to({left : centerX+10 , top : centerY-10 }, app.time,createjs.Ease.quartInOut);
	     
	      
	      function animationEnd(){
		        createjs.Ticker.removeEventListener("tick",view.stage);
		        var oldContainer = stage.getChildByName(view.currentContainerName);
		        var newContainer = stage.getChildByName(view.newContainerName);
		        newContainer.x = (1-view.scale)*view.originPoint.x;
		        newContainer.y = (1-view.scale)*view.originPoint.y;
		        stage.removeChild(oldContainer);
		        newContainer.name = view.currentContainerName;
		        newContainer.alpha = 1;
		        stage.update();
	      }

	      createjs.Ticker.addEventListener("tick", stage);
	}
	
	function weightSort(a,b){
		return a.weight>b.weight ? 1 :-1;
	}
	// --------- /Private Method --------- //
	
	// --------- Component Registration --------- //
	brite.registerView("ZoomCluster",{
		emptyParent: true
	},
	function(){
		return new smr.ZoomCluster();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
