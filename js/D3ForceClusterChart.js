var smr = smr || {};

(function($){
	
	// --------- Component Interface Implementation ---------- //
	function D3ForceClusterChart(){};
	smr.D3ForceClusterChart = D3ForceClusterChart; 
  
	D3ForceClusterChart.prototype.create = function(data,config){
		var html = hrender("tmpl-D3ForceClusterChart",{});
		return html;
	}
		
	D3ForceClusterChart.prototype.postDisplay = function(data, config) {
		var view = this;
		view.dataSet = generateData();
		var fisrtData = getClusterDataByUser(view.dataSet[0],view.dataSet);
		view.showView(fisrtData);
	}
	
	D3ForceClusterChart.prototype.showView= function(json){
		
		var view = this;
		var $e = view.$el;
		
		var w = 1080,
		    h = 600,
		    rx = w / 2,
		    ry = h / 2,
		    rotate = 0;

		var radialGradients=[{id:"radialGradientNodes",endColor:"#F8F28A",startColor:"#F8F28A",r:8},
							 {id:"radialGradientOrigin",endColor:"#F8F28A",startColor:"#F8F28A",r:8}];
		
		var cluster = d3.layout.cluster()
		    .size([360, ry - 120])
		    .sort(function(a, b){return d3.descending(a.weight, b.weight);});
	
		var svg = d3.select("#D3ForceClusterChart").append("div")
		    .style("width", w + "px")
		    .style("height", 800 + "px")
		    .style("overflow", "auto")
		    .append("svg:svg")
		    .attr("width", w)
		    .attr("height", 800);
		
		var vis = svg.append("svg:g")
		    .attr("transform", "translate(" + 200 + "," + 250 + ")");
		
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
		
		
		  var nodes = cluster.nodes(json);
		 	  
		  function xs(d) { return (d.depth>0?(d.y-150+(d.weight*5)):d.y) * Math.cos((d.x - 90) / 180 * Math.PI); }
		  function ys(d) { return (d.depth>0?(d.y-150+(d.weight*5)):d.y) * Math.sin((d.x - 90) / 180 * Math.PI); }	  

		  renderNodeAndLinks(vis,nodes,nodes);

	        
	      function getNodeTranslate(d){
	        	var translate = (d.depth>0?(d.y-150+(d.weight*5)):d.y);
	        	if(smr.isFirefox || smr.isOpera){
	        		return translate <=180 ? translate+15 : translate;
	        	}else{
	        		return translate;
	        	}
	      }
	        
	        function nodeClickMethod(){
	        	  var _data = this.__data__;
	        	  
	        	  var d3this = d3.select(this);
	        	  var d3origin = d3.select("ellipse.origin");
	        	  var d3originData = d3origin[0][0].__data__;
	        	  d3originData.weight = _data.weight;
	        	  
	        	  var thisUser = getUserByID(_data.id,view.dataSet);
	        	  var parent = getUserByID(d3originData.id,view.dataSet);
	        	  thisUser.friends.push({id:d3originData.id,name:d3originData.name,weight:_data.weight})

	        	  var nodess = cluster.nodes(getClusterDataByUser(thisUser,view.dataSet));
	        	  
	        	  var midNode = {};
	        	  $.each(nodess,function(i,it){if(it.id==parent.id)midNode = it;});
	        	  
	        	  d3this
	        	  	.attr("class","origin")
					.transition()
				    .ease("linear")
				    .duration(1000)
	  			    .attr("cx", 0)
	  			    .attr("cy", 0);
	  			   
	        	  
	        	  d3origin.transition()
				    .ease("linear")
				    .duration(1000)
					.attr("cx", function(d) { return xs(midNode); })
					.attr("cy", function(d) { return ys(midNode); });
				  
				  vis.selectAll("g.link")
				     .select("line")
				  	 .transition()
				     .ease("linear")
				     .duration(1000)
	   	             .attr("x1",0)
	   	             .attr("y1",0);
   	             
	              vis.selectAll("g.link")
	                 .transition()
			         .ease("linear")
			         .duration(1000).remove();
				  
	              vis.selectAll("g.node")
		              .transition()
		              .ease("linear")
		              .duration(1000)
		              .style("opacity",0)
				      .remove();
	              
	              vis.selectAll("ellipse.nodes")
	                 .transition()
			         .ease("linear")
			         .duration(1000)
			         .attr("rx",0)
			         .attr("ry",0)
			         .remove();
	              d3origin.attr("class","nodes");
	              
	              var newNodes = [];
	              $.each(nodess,function(i,n){
	            	  if(n.id!=thisUser.id && n.id!=parent.id) newNodes.push(n);
	              });
	              
	              window.setTimeout(function(){renderNodeAndLinks(vis,nodess,newNodes)},1100);
				  
	        }
	        
	        function renderNodeAndLinks(vis,_nodes,newNodes){
		         var link = vis.selectAll("g.link")
			          .data(_nodes)
			          .enter()
			          .append("svg:g")
			          .attr("class", "link")
			          .append("line")
			          .attr("x2", function(d) { return xs(_nodes[0]); })
			          .attr("y2", function(d) { return ys(_nodes[0]); })
			          .attr("x1", function(d) { return newNodes?0:xs(d); })
			          .attr("y1", function(d) { return newNodes?0:ys(d); });
		         
				 var dot = vis.selectAll(".dot")
				  .data(newNodes||_nodes)
				.enter().append("ellipse")
				  .attr("class", function(d){ return (d.depth==0) ? "origin" : "nodes";})
				  .attr("cx", function(d) { return newNodes?0:xs(d); })
				  .attr("cy", function(d) { return newNodes?0:ys(d); })
				  .attr("n-id", function(d) { return d.id; })
				  .attr("rx", 8)
				  .attr("ry", 8)
				  .attr("style",function(d){return "fill:url(#radialGradientOrigin)"})
				  .on("click",nodeClickMethod);
				  
		         if(newNodes){
		        	 vis.selectAll("g.link").select("line").transition().ease("linear").duration(1000)
				         .attr("x1", function(d) { return xs(d); })
				         .attr("y1", function(d) { return ys(d); });
		        	 dot.transition().ease("linear").duration(1000)
						.attr("cx", function(d) { return xs(d); })
						.attr("cy", function(d) { return ys(d); });
		         }

				  var node = vis.selectAll("g.node")
				      .data(_nodes)
				    .enter().append("g")
				      .attr("class", "node")
				      .style("opacity",0)
				      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + getNodeTranslate(d) + ")"; })
				    .append("svg:text")
				      .attr("dx", function(d) { return d.x < 180 ? 12 : -18; })
				      .attr("dy", ".31em")
				      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
				      .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
				      .text(function(d) { return d.name; });
				  
		          vis.selectAll("g.node")
		              .transition()
		              .ease("linear")
		              .duration(1000)
		              .style("opacity",1);
	        }
	        
	        
	}
	
	// --------- /Component Interface Implementation ---------- //
	
	// ----------------- Private Method ----------------------- //
	/**
	 * Create a random dataset that can be use for rendering
	 * @return an array of users, like:
	 *         [{
	 *         	 id:1, 
	 *         	 name:"user1",
	 *           friends:[{id:..,weight:..},{...}]
	 *          }, 
	 *          {...}]
	 */
	function generateData(){
		function RandomData(fromNum,toNum){ 
			return parseInt(Math.random()*(toNum-fromNum) + fromNum); 
		}
		var dataSet = [];
		var friends = 1;
		
		for(var i = 1; i <= 30;i++){
			var data = {};
			data.id = i;
			data.name = "User" + i;
			var friendsNum = RandomData(4,8);
			var friendsArr = [];
			for(var j = 0; j < friendsNum;j++){
				var friend = {};
				friend.id = RandomData(1,30);
				if(friend.id!=data.id){
					friend.weight = RandomData(6,20);
					friendsArr.push(friend);
				}
			}
			data.friends = friendsArr;
			dataSet.push(data);
		}
		return dataSet;
	}
	
	/**
	 * 
	 * @return an array of cluster, like:
	 *         {
	 *         	name:"user1",
	 *          children:[{name:"user2",weight:3},{...}]
	 *         }
	 */
	function getClusterDataByUser(user,dataSet){
		var object = {name:"",children:[]};
		object.name = user.name;
		object.id = user.id;
		var friendFlag = {};
		$.each(user.friends,function(i,friend){
			if(!friendFlag["f"+friend.id]){
				friendFlag["f"+friend.id]= true;
				var user1 = getUserByID(friend.id,dataSet);
				object.children.push({id:user1.id,name:user1.name,weight:friend.weight});
			}else{
				delete friend;
			}
		});
		return object;
	}

	
	function getUserByID(id,dataSet){
		var object ={};
		$.each(dataSet,function(i,user){
			if(user.id == id){
				object = user;
			}
		});
		return object;
	}
	
	// -----------------/Private Method ----------------------- //
	
	// --------- Component Registration --------- //
	brite.registerView("D3ForceClusterChart",{
		emptyParent: true,
		loadTmpl: false
	},
	function(){
		return new smr.D3ForceClusterChart();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
