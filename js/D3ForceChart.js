var smr = smr || {};

(function($){
	
	// --------- Component Interface Implementation ---------- //
	function D3ForceChart(){};
	smr.D3ForceChart = D3ForceChart; 
  
	D3ForceChart.prototype.create = function(data,config){
		var html = hrender("tmpl-D3ForceChart",{});
		return html;
	}
		
	D3ForceChart.prototype.postDisplay = function(data, config) {
		var view = this;
		view.dataSet = generateData();
		var fisrtData = getClusterDataByUser(view.dataSet[0],view.dataSet);
		view.showView(fisrtData);
	}
	
	D3ForceChart.prototype.showView= function(json){
		var view = this;
		var w = 1280,
		    h = 800,
		    node,
		    link,
		    root;
		var user = getUserByID(json.id,view.dataSet);
	
		var force = d3.layout.force()
		    .on("tick", tick)
		    .charge(function(d) { return d._children ? -d.size / 100 : -30; })
		    .linkDistance(function(d) { return 100; })
		    .size([w, h - 160]);
	
		var vis = d3.select("#D3ForceChart").append("svg:svg")
		    .attr("width", w)
		    .attr("height", h);
	
		  root = json;
		  root.fixed = true;
		  root.x = w / 2;
		  root.y = h / 2 - 80;
		  update();
	
		function update() {
		  var nodes = flatten(root),
		      links = d3.layout.tree().links(nodes);
	
		  // Restart the force layout.
		  force.nodes(nodes)
		       .links(links)
		       .start();
	
		  // Update the links¡­
		  link = vis.selectAll("line.link")
		      .data(links, function(d) { return d.target.id; });
	
		  // Enter any new links.
		  link.enter().insert("svg:line", ".node")
		      .attr("class", "link")
		      .attr("x1", function(d) { return d.source.x; })
		      .attr("y1", function(d) { return d.source.y; })
		      .attr("x2", function(d) { return d.target.x; })
		      .attr("y2", function(d) { return d.target.y; });
	
		  // Exit any old links.
		  link.exit().remove();
	
		  // Update the nodes¡­
		  node = vis.selectAll("circle.node")
		      .data(nodes, function(d) { return d.id; })
		      .style("fill", color);
	
		  node.transition()
		      .attr("r", function(d) { return 4.5; });
	
		  // Enter any new nodes.
		  node.enter().append("svg:circle")
		      .attr("class", "node")
		      .attr("cx", function(d) { return d.x; })
		      .attr("cy", function(d) { return d.y; })
		      .attr("r",5)
		      .style("fill", color)
		      .on("click", click)
		      .call(force.drag);
	
		  // Exit any old nodes.
		  node.exit().remove();
		}
	
		function tick() {
		  link.attr("x1", function(d) { return d.source.x; })
		      .attr("y1", function(d) { return d.source.y; })
		      .attr("x2", function(d) { return d.target.x; })
		      .attr("y2", function(d) { return d.target.y; });
	
		  node.attr("cx", function(d) { return d.x; })
		      .attr("cy", function(d) { return d.y; })
		      .attr("r", function(d) { return 4.5; });
		}
	
		// Color leaf nodes orange, and packages white or blue.
		function color(d) {
		  return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
		}
	
		// Toggle children on click.
		function click(d) {
		  if (d.children) {
		    d._children = d.children;
		    d.children = null;
		  } else {
		    d.children = d._children;
		    d._children = null;
		  }
		  update();
		}
	
		// Returns a list of all nodes under the root.
		function flatten(root) {
		  var nodes = [], i = 0;
	
		  function recurse(node) {
		    if (node.children) node.size = node.children.reduce(function(p, v) { return p + recurse(v); }, 0);
		    if (!node.id) node.id = ++i;
		    nodes.push(node);
		    return node.size;
		  }
	
		  root.size = recurse(root);
		  return nodes;
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
	
	function getWeightByUser(user,friendid){
		var weight = 0;
		$.each(user.friends,function(i,friend){
			if(friend.id == friendid) weight = friend.weight;
		});
		return weight;
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
	brite.registerView("D3ForceChart",{
		emptyParent: true,
		loadTmpl: false
	},
	function(){
		return new smr.D3ForceChart();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
