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
		view.showView();
	}
	
	D3ForceClusterChart.prototype.showView= function(json){
		var view = this;
		var $e = view.$el;
			
		var width = 960,
		    height = 500;
	
		var color = d3.scale.category20();
	
		var force = d3.layout.difinedf()
		      .charge(-240)
		      .linkDistance(40)
		      .size([width, height]);
	
		var svg = d3.select("#D3ForceClusterChart").append("svg")
		      .attr("width", width)
		      .attr("height", height);
	
		var data = getNodeDataByUserData.call(this,generateData());;

	    var n = data.nodes.length;

	    force.nodes(data.nodes).links(data.links);

	    // Initialize the positions deterministically, for better results.
	    data.nodes.forEach(function(d, i) { d.x = d.y = width / n * i; });

	    // Run the layout a fixed number of times.
	    force.start();
	    for (var i = n; i > 0; --i) force.tick();
	    force.stop();

	    // Center the nodes in the middle.
	    var ox = 0, oy = 0;
	    data.nodes.forEach(function(d) { ox += d.x, oy += d.y; });
	    ox = ox / n - width / 2, oy = oy / n - height / 2;
	    data.nodes.forEach(function(d) { d.x -= ox, d.y -= oy; });

	    var link = svg.selectAll(".link")
	        .data(data.links)
	      .enter().append("line")
	        .attr("class", "link")
	        .attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; })
	        .style("stroke-width", function(d) { return 1; });

	    var node = svg.selectAll(".node")
	        .data(data.nodes)
	      .enter().append("circle")
	        .attr("class", "node")
	        .attr("cx", function(d) { return d.x; })
	        .attr("cy", function(d) { return d.y; })
	        .attr("r", 4.5)
	        .style("fill", function(d) { return color(1); })
	        .call(force.drag);

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
		var data = [];
		for(var i=1; i<30;i++){
			var user = {id:i,name:"user"+i,friends:[]};
			for(var j = 0; j < i; j++) {
				if(Math.random() > 0.85)
					user.friends.push({id : j , weight : parseInt(Math.random()*(80-5+1) + 5)});
			}
			data.push(user)
		}
		return data;
	}
	
	/**
	 * 
	 * @return an array of nodes, like:
	 *         {
	 *         	nodes:[{name:"user1"},{...}],
	 *          links:[{"source":21,"target":16,"weight":3},{...}]
	 *         }
	 */
	function getNodeDataByUserData(userdata){
		var object = {nodes:[],links:[]};
		$.each(userdata,function(i,user){
			object.nodes.push({name:user.name});
			$.each(user.friends,function(j,friend){
				object.links.push({"source":user.id-1,"target":friend.id,"weight":friend.weight});
			});
		})
		return object;
	}
	
	/**
	 * sort node by name 
	 */
	function sortByNodesName(a,b){
		return a.name<b.name ? 1 :-1;
	}
	
	/**
	 * sort Json by links's weight
	 */
	function sortByLinksWeight(a,b){
		return a.weight<b.weight ? 1 :-1;
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
