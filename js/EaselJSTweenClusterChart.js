var smr = smr || {};

(function($){
		
	// --------- Component Interface Implementation ---------- //
	function EaselJSTweenClusterChart(){};
	smr.EaselJSTweenClusterChart = EaselJSTweenClusterChart; 
  
	EaselJSTweenClusterChart.prototype.create = function(data,config){
		var html = hrender("tmpl-EaselJSTweenClusterChart",{time:app.time});
		return $(html);
	}
		
	EaselJSTweenClusterChart.prototype.postDisplay = function(data, config) {
		var view = this;
		var $e = view.$element;
		view.$timeSoa = $e.find(".btn-soa input"); 
		createjs.Ticker.setFPS(55);
		createjs.Ticker.useRAF = true;
		$e.find(".btn-raf .btn[data-on="+createjs.Ticker.useRAF+"]").addClass("active").siblings().removeClass("active");
		app.ContactDao.get().done(function(chartData){
        	view.showView(chartData);
		});
	}
	
	EaselJSTweenClusterChart.prototype.showView = function(data){
		var view = this;
		var $e = view.$element;
		var canvas = $e.find("canvas").get(0);
		var stage = new createjs.Stage(canvas);
		
        view.stage = stage;
        view.currentContainerName = "currentContainer";
        view.newContainerName = "newContainer";
        view.cName = "centerCircle";
	      
        var container = createContainer.call(view,data);
        container.name = view.currentContainerName;
        stage.addChild(container);
        stage.update();		
	}
	
	EaselJSTweenClusterChart.prototype.events = {
			
		"click ; .btn-raf .btn" :function(event){
			var $this = $(event.currentTarget);
			var onOff = $this.attr("data-on");
			$this.addClass("active").siblings().removeClass("active");
			if(onOff=="true"){
				createjs.Ticker.useRAF = true;
			}else{
				createjs.Ticker.useRAF = false;
			}
		}
	}
	
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Private Method --------- //
	
	function createContainer(data){
	      var view = this;
	      var stage = view.stage;
	      var baseLineLength = 20;
	      var centerX = 400;
	      var centerY = 300;
	      var angle = (360/data.children.length)*(Math.PI/180);
	      var container = new createjs.Container();
	      data.children.sort(weightSort);
	      $.each(data.children,function(i,cData){
		        var weight = cData.weight > 4 ? cData.weight : cData.weight;
		        var l = weight * baseLineLength;
		        var cx = centerX + l * Math.sin(angle * i);
		        var cy = centerY + l * Math.cos(angle * i);	
		        
		        //draw the node and the line
		        var line = createLine.call(view,centerX,centerY,cx,cy);
		        var node = createNodeCircle.call(view,cx,cy,cData.name);
		        container.addChild(line);
		        container.addChild(node);
		        node.addEventListener("click",function(evt){nodeClickEvent.call(view,evt.target);});
		        
		        //draw the node text
				var text = new createjs.Text(cData.name, "10px Arial", "#777");
				text.x = cx - 20;
				text.y = cy + 10;
				container.addChild(text);
	      });
	      
	      //draw the center node
	      var centerCircle = createCenterCircle.call(view,centerX,centerY,view.cName,data.id);
	      container.addChild(centerCircle);
	      centerCircle.addEventListener("click",centerCircleClickEvent);
	      
		  //draw the center node text
		  var centerText = new createjs.Text(data.name, "10px Arial", "#777");
		  centerText.x = centerX-20;
		  centerText.y = centerY+10;
		  container.addChild(centerText);
		  
	      return container;
	}
	
	
	function centerCircleClickEvent(evt) {
		var $popover = $(".popover");
		if($popover.size()==0){
			app.ContactDao.get(evt.target.nid).done(function(chartData){
				var html = hrender("tmpl-popover-right",{name:chartData.name,num:chartData.children.length,left:evt.rawX+4,top:evt.rawY-38});
	        	$(".EaselJSTweenClusterChart").append(html);
			});
		}else{
			$popover.remove();
		}
	}
	
	
    function createNodeCircle(cx,cy,cName){
        var r = 7;
        var circle = new createjs.Shape();
        circle.graphics.beginFill("#d9eefe").drawCircle(0, 0, r);
        circle.graphics.beginStroke("#979ca3").drawCircle(0, 0, r+1);
        circle.x = cx;
        circle.y = cy;
        circle.name = cName;
        return circle;
    }
      
    function createCenterCircle(centerX,centerY,cName,nid){
	    var r = 7;
	    var circle = new createjs.Shape();
	    circle.graphics.beginStroke("#a4998e").drawCircle(0, 0, r+1);
	    circle.graphics.beginFill("#ffe9c2").drawCircle(0, 0, r);
	    circle.name = cName;
	    circle.x = centerX;
	    circle.y = centerY;
	    circle.nid = nid;
	    return circle;
   }
      
   function createLine(x0, y0, x1, y1){
        var line = new createjs.Shape();
        line.graphics.beginStroke("#cccccc").moveTo(x0,y0).lineTo(x1,y1);
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
	      var newContainer = createContainer.call(view, newData);
	      newContainer.name = view.newContainerName;
	      newContainer.x = circleNode.x - centerX;
	      newContainer.y = circleNode.y - centerY;
	      newContainer.alpha = 0;
	      stage.addChild(newContainer);
	      stage.update();
	      
	      
	      var x0 = centerX;
	      var y0 = centerY;
	      var x1 = newCircle.x;
	      var y1 = newCircle.y;
	      app.time = view.$timeSoa.val();
	      
	      var ox = oldContainer.x - (x1 - x0);
	      var oy = oldContainer.y - (y1 - y0);
	      createjs.CSSPlugin.install(createjs.Tween);
	      createjs.Tween.get(oldContainer).to({alpha : 0, x : ox, y : oy }, app.time, createjs.Ease.quartInOut); 
	      createjs.Tween.get(newContainer).to({alpha : 1, x : 0 , y : 0  }, app.time, createjs.Ease.quartInOut).call(animationEnd); 
	      var $popover = $(".popover");
	      if($popover.size()>0){
	    	  var position = $popover.eq(0).position();
	    	  var popx = position.left -(x1 - x0);
	    	  var popy = position.top  -(y1 - y0);
	    	  createjs.Tween.get($popover[0]).to({opacity : 0.01, left : popx , top : popy }, app.time,createjs.Ease.quartInOut).call(function(){$popover.remove();});
	      }
	      
	     var $contactInfo = view.$el.find(".contact-info");
		 $contactInfo.html('<span class="label label-info">'+newData.name+": "+newData.children.length+' friends</span>')
    	 			 .css({"top":circleNode.y-10,"left":circleNode.x+20});
	     createjs.Tween.get($contactInfo[0]).to({left : centerX+10 , top : centerY-10 }, app.time,createjs.Ease.quartInOut);
	     
	      
	      function animationEnd(){
		        createjs.Ticker.removeEventListener("tick",view.stage);
		        var oldContainer = stage.getChildByName(view.currentContainerName);
		        var newContainer = stage.getChildByName(view.newContainerName);
		        newContainer.x = 0;
		        newContainer.y = 0;
		        stage.removeChild(oldContainer);
		        newContainer.name = view.currentContainerName;
		        newContainer.alpha = 1;
	      }

	      createjs.Ticker.addEventListener("tick", stage);
	}
	
	function weightSort(a,b){
		return a.weight>b.weight ? 1 :-1;
	}
	// --------- /Private Method --------- //
	
	// --------- Component Registration --------- //
	brite.registerView("EaselJSTweenClusterChart",{
		emptyParent: true
	},
	function(){
		return new smr.EaselJSTweenClusterChart();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
