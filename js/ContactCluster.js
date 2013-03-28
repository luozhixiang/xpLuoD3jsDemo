(function ($) {
    brite.registerView("ContactCluster",  {
		emptyParent : true,
		parent:".MainScreen-main"
	}, {
    	create:function (data, config) {
            var html = hrender("tmpl-ContactCluster");
            return html;
        },
        postDisplay:function (data, config) {
            var view = this;
            var $e = view.$el;
            var dataSet = createDataSet(30);
			var chartData = transformData(dataSet);
			view.dataSet = dataSet;
            
            view.showView(chartData);
		},
		showView:function(data,transform){
			var view = this;
            var $e = view.$element;
            view.curData = data;
            
			var $container = $e.find(".ContactClusterSummary");
			$container.append("<div class='fstCon'></div>");
            
            var w = 1000,
			    h = 800,
			    rx = w / 2,
			    ry = 300,
			    rysize = h / 2,
			    rotate = 0;
            
            if(!transform){
            	transform ={rx:0,ry:0};
            }
			
			var radialGradients=[{id:"radialGradientNodes",endColor:"#FCA000",startColor:"#F8F28A",r:8},
							     {id:"radialGradientOrigin",endColor:"#006400",startColor:"#6DA202",r:12}];
			
			var cluster = d3.layout.cluster()
			    .size([360, rysize - 120])
			    .sort(function(a, b){return d3.ascending(a.weight, b.weight);});
			
			var vis = d3.select(".fstCon").append("svg:svg")
			    .attr("width", w)
			    .attr("height", w)
			    .style("position", "absolute")
			    .style("z-index", 1)
			    .append("svg:g")
			    .style("opacity",0)
			    .attr("class","transg")
			    .attr("transform", "translate(" + (rx+parseFloat(transform.rx)) + "," + (ry+parseFloat(transform.ry)) + ")");
			    
			var defs = vis.append("defs");
		
			var radialGradient = defs.selectAll("radialGradient")
				.data(radialGradients)
			  	.enter()
				.append("radialGradient")
				.attr("id",function(d){return d.id})
				.attr("r","70%")
				.attr("cx", "50%")
			    .attr("cy", "50%")
			    .attr("rx", "50%")
			    .attr("ry", "50%");
			
			radialGradient.append("stop")
				.attr("offset","0%")
				.style("stop-color",function(d){return d.startColor})
				.style("stop-opacity","1");
			radialGradient.append("stop")
				.attr("offset","100%")
				.style("stop-color",function(d){return d.endColor})
				.style("stop-opacity","1");

			
			function xs(d) { return (d.depth>0?(d.y-150+((10-d.weight)*10)):d.y) * Math.cos((d.x - 90) / 180 * Math.PI); }
		 	function ys(d) { return (d.depth>0?(d.y-150+((10-d.weight)*10)):d.y) * Math.sin((d.x - 90) / 180 * Math.PI); }
		 	
			var nodes = cluster.nodes(data);
			
			var link = vis.selectAll("g.link")
		    		.data(nodes)
		         	.enter()
		          	.append("svg:g")
		          	.attr("class", "link")
		          	.append("line")
		          	.attr("x1", function(d) { return xs(d); })
		          	.attr("y1", function(d) { return ys(d); })
		          	.attr("x2", function(d) { return xs(nodes[0]); })
		          	.attr("y2", function(d) { return ys(nodes[0]); });
			
			vis.selectAll(".dot")
					.data(nodes)
					.enter().append("circle")
				  	.attr("class", function(d){ return (d.depth==0) ? "origin" : "nodes";})
				  	.attr("cx", function(d) { return xs(d); })
				  	.attr("cy", function(d) { return ys(d); })
				  	.attr("r", function(d){ return (d.depth==0) ? 12 : 8; })
				  	.attr("style",function(d){return (d.depth==0) ? "fill:url(#radialGradientOrigin)" : "fill:url(#radialGradientNodes)";})
				  	.on("click", click);
				  	
			vis.selectAll("circle").append("title").text(function(d) { return "Weight: " + d.weight; });
				  
//			vis.selectAll("g.link").select("line").transition().ease("linear").duration(400).style("opacity",1);
//	        vis.selectAll("circle").transition().ease("linear").duration(400).style("opacity",1);
			  
			var node = vis.selectAll("g.node")
			    	.data(nodes)
			    	.enter().append("g")
			      	.attr("class", "node")
			      	.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + getNodeTranslate(d) + ")"; })
			    	.append("svg:text")
			      	.attr("dx", function(d) { return d.x < 180 ? 12 : -18; })
			      	.attr("dy", ".31em")
			      	.attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
			      	.attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
			      	.text(function(d) { return d.name; });
			
			vis.transition().ease("linear").duration(450)
						    .attr("transform", "translate(" + rx + "," + ry + ")")
						    .style("opacity",1);
			      	
			function getNodeTranslate(d){
	        	var translate = (d.depth>0?(d.y-150+((10-d.weight)*10)):d.y);
	        	return translate;
	        }
	        
	        function click(d){
	        	var userName = d.name;
	        	
	        	var thisCircle = d3.select(this);
	        	var cxVal = thisCircle.attr("cx");
	        	var cyVal = thisCircle.attr("cy");
	        	var transformc = {rx:cxVal,ry:cyVal};
	        	if(view.curData.name != userName){
	        		var parentName = d.parent.name;
	        		var userData = transformData(view.dataSet,userName);
	        		view.showView(userData,transformc);
	        		
	        		var svg= d3.select($(".fstCon").find("svg").eq(0).get(0));
	        		svg.select("g.transg")
	        		  .transition().ease("linear").duration(400)
	        		  .attr("transform", "translate(" + (rx-parseFloat(transformc.rx)) + "," + (ry-parseFloat(transformc.ry)) + ")")
	        		  .style("opacity",0);
	        		window.setTimeout(function(){svg.remove()},410);
	        		
			   		
			   		vis.select("circle.origin").attr("class","nodes")
			   			.attr("style","fill:url(#radialGradientNodes)")
			   			.attr("r", 8);
			   		
			   		thisCircle.attr("class","origin")
			   			.attr("style","fill:url(#radialGradientOrigin)")
						.attr("r", 12);
	        	}
	        }

		}
    });
    
    // --------- Private Method --------- //
    /**
	 * Create a random dataset that can be use for rendering
	 * @return an array of users, like:
	 *         [{id:..,
	 *           name:..,
	 *           friends:[{id:..,name:..,weight:..},{..}]
	 *          },
	 *          {..}]
	 */
	function createDataSet(dataSize){
		var dataSet = [];
		dataSize = dataSize || 10;
		
		for(var i = 1; i <= dataSize;i++){
			var data = {};
			data.id = i;
			data.name = "User" + i;
			
			//each user have 5 to 10 friends
			var friendsNum = RandomData(5,10);
			var friendsArr = [];
			for(var j = 1; j < friendsNum;j++){
				var friend = {};
				if(j == i) continue;
				friend.id = j;
				friend.name = "User" + j;
				friend.weight = RandomData(1,10);
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
	
	/**
	 * Transform the data get the dataSet by name ,default the first one
	 * @return  like:
	 *         {id:..,
	 *           name:..,
	 *           children:[{id:..,name:..,weight:..},{..}]
	 *          }  
	 */
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
	// --------- /Private Method --------- //
    
})(jQuery);

