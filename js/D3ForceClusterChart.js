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
		
		json = json || getNodeDataByUserData.call(this,generateData());
		view.json = json;
		
		$("#D3ForceClusterChart").empty();
		
		var width = 960,
		    height = 600;
		    var color = d3.scale.category20();

		var svg = d3.select("#D3ForceClusterChart").append("svg")
		    .attr("width", width)
		    .attr("height", height);

		var force = d3.layout.force()
		    .gravity(.05)
		    .charge(-100)
		    .size([width, 400]);


		  force.nodes(json.nodes)
		       .links(json.links)
		       .distance(100)
		       .start();

		  var link = svg.selectAll(".link")
		      .data(json.links)
		    .enter().append("line")
		      .attr("class", "link");

		  var node = svg.selectAll(".node")
		      .data(json.nodes)
		    .enter().append("g")
		      .attr("class", "node");
//		      .call(force.drag);

		  node.append("circle")
		      .attr("class", "circle")
		      .attr("x", -8)
		      .attr("y", -8)
		      .attr("r", 4.5)
		      .style("fill", function(d) { return color(d.group); });

		  node.append("text")
		      .attr("dx", 12)
		      .attr("dy", ".35em")
		      .text(function(d) { return d.name });

		  force.on("tick", function() {
		    link.attr("x1", function(d) { return d.source.x; })
		        .attr("y1", function(d) { return d.source.y; })
		        .attr("x2", function(d) { return d.target.x; })
		        .attr("y2", function(d) { return d.target.y; });

		    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

		  });
		  
		  $e.delegate("circle","click",function(){
			  view.showView(view.json);
		  });
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
				if(Math.random() > 0.90)
					user.friends.push({id : j , weight : parseInt(Math.random()*(20-5+1) + 5)});
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
