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
		var dataSet = app.createDataSet(3000);
		view.dataSet = dataSet;
		data = app.transformData(dataSet);
		view.showView(data);
		createjs.Ticker.useRAF = true;
		createjs.Ticker.setFPS(55);
	}
	
	EaseljsClusterChart.prototype.showView = function(data){
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
	
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Private Method --------- //
	
	function createContainer(data){
	      var view = this;
	      var stage = view.stage;
	      var baseLineLength = 20;
	      var centerX = 400;
	      var centerY = 400;
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
				var deviation = getDeviationForNodeText(data.children.length,i);
				text.x = cx + deviation.mx;
				text.y = cy + deviation.my;
				container.addChild(text);
	      });
	      
	      //draw the center node
	      var centerCircle = createCenterCircle.call(view,centerX,centerY,view.cName);
	      container.addChild(centerCircle);
	      
		  //draw the center node text
		  var centerText = new createjs.Text(data.name, "10px Arial", "#777");
		  centerText.x = centerX+10;
		  centerText.y = centerX+10;
		  container.addChild(centerText);
		  
	      return container;
	}
	
	
    function createNodeCircle(cx,cy,cName){
        var r = 7;
        var circle = new createjs.Shape();
        circle.graphics.beginRadialGradientFill(["#FCA000","#F8F28A"],[0,1], 0, 0, r, 0, 0, 0).drawCircle(0, 0, r);
        circle.graphics.beginStroke("#FB4100").drawCircle(0, 0, r+1);
        circle.x = cx;
        circle.y = cy;
        circle.name = cName;
        return circle;
    }
      
    function createCenterCircle(centerX,centerY,cName){
	    var r = 10;
	    var circle = new createjs.Shape();
	    circle.graphics.beginStroke("#cccccc").drawCircle(0, 0, r+1);
	    circle.graphics.beginLinearGradientFill(["#006400","#6DA202"],[0,1], 0, 0, r, 0, 0, 0).drawCircle(0, 0, r);
	    circle.name = cName;
	    circle.x = centerX;
	    circle.y = centerY;
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
	      var newData = app.transformData(view.dataSet, circleNode.name);
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
	      
	      function tick(event) {
		        var oldContainer = stage.getChildByName(view.currentContainerName);
		        var newContainer = stage.getChildByName(view.newContainerName);
		        oldContainer.alpha = oldContainer.alpha - 0.05;
		        newContainer.alpha = newContainer.alpha + 0.05;
		        oldContainer.x =  oldContainer.x - ((x1 - x0) /20);
		        oldContainer.y =  oldContainer.y - ((y1 - y0) /20);
		        newContainer.x =  newContainer.x - ((x1 - x0) /20);
		        newContainer.y =  newContainer.y - ((y1 - y0) /20);
		        stage.update(event);
		        
		        if(oldContainer.alpha <= 0){
		          animationEnd.call(view);
		          stage.update(event);
		        }
	      }
	      
	      function animationEnd(){
		        createjs.Ticker.removeEventListener("tick",tick);
		        var oldContainer = stage.getChildByName(view.currentContainerName);
		        var newContainer = stage.getChildByName(view.newContainerName);
		        newContainer.x = 0;
		        newContainer.y = 0;
		        stage.removeChild(oldContainer);
		        newContainer.name = view.currentContainerName;
		        newContainer.alpha = 1;
	      }

	      createjs.Ticker.addEventListener("tick", tick);
	}
   
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
