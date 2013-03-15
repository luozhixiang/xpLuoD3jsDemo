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

		  renderNodeAndLinks(vis,nodes);

	        
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
	        	  
	        	  var thisUser = getUserByID(_data.id,view.dataSet);
	        	  var parent = getUserByID(_data.parent.id,view.dataSet);
	        	  var flag = true;
	        	  $.each(thisUser.friends,function(i,friend){
	        		  if(parent.id == friend.id){
	        			  flag=false;
	        			  friend.weight = _data.weight;
	        		  }
	        	  });
	        	  if(flag){
	        		  thisUser.friends.push({id:parent.id,name:parent.name,weight:_data.weight});
	        	  }
	        	  

	        	  var nodess = cluster.nodes(getClusterDataByUser(thisUser,view.dataSet));
	        	  var midNode = {};
	        	  $.each(nodess,function(i,it){
	        		  if(it.id==parent.id){
	        			  midNode = it;
	        		  }
	        	  });
	        	  
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
		              .duration(1000).remove();
	              
	              vis.selectAll("ellipse.nodes")
	                 .transition()
			         .ease("linear")
			         .duration(1000)
			         .style("display","none")
			         .remove();
	              
	              window.setTimeout(function(){vis.selectAll("ellipse").remove();renderNodeAndLinks(vis,nodess)},1010);
				  
	        }
	        
	        function renderNodeAndLinks(vis,nodes){
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
					.enter().append("ellipse")
					  .attr("class", function(d){ return (d.depth==0) ? "origin" : "nodes";})
					  .attr("cx", function(d) { return xs(d); })
					  .attr("cy", function(d) { return ys(d); })
					  .attr("rx", 8)
					  .attr("ry", 8)
					  .attr("style",function(d){return (d.depth==0) ? "fill:url(#radialGradientOrigin)" : "fill:url(#radialGradientNodes)";})
					  .on("click",nodeClickMethod);
				  
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
		$.each(user.friends,function(i,friend){
			var user1 = getUserByID(friend.id,dataSet);
			object.children.push({id:user1.id,name:user1.name,weight:friend.weight});
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
