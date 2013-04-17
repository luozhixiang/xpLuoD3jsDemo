Handlebars.templates = Handlebars.templates || {};


// template --- tmpl-ContactCluster ---
Handlebars.templates['tmpl-ContactCluster'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"ContactCluster\">\n		<div class=\"ContactClusterSummary\"></div>\n	</div>";}
);

// template --- tmpl-D3ForceChart ---
Handlebars.templates['tmpl-D3ForceChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"D3ForceChart\">\n		<div id=\"D3ForceChart\"></div>\n	</div>";}
);

// template --- tmpl-D3ForceClusterChart ---
Handlebars.templates['tmpl-D3ForceClusterChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"D3ForceClusterChart\">\n		<div id=\"D3ForceClusterChart\"></div>\n	</div>";}
);

// template --- tmpl-EaseljsClusterChart ---
Handlebars.templates['tmpl-EaseljsClusterChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"EaseljsClusterChart\">\n		<canvas id=\"EaseljsClusterCanvas\" width=\"800\" height=\"800\"></canvas>\n	</div>";}
);

// template --- tmpl-popover-right ---
Handlebars.templates['tmpl-popover-right'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"popover fade right in\" style=\"top: ";
  foundHelper = helpers.top;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.top; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px; left: ";
  foundHelper = helpers.left;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.left; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px; display: block;\">\n	<div class=\"arrow\"></div>\n	<h3 class=\"popover-title\">Name:";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h3>\n	<div class=\"popover-content\">Friends Number:";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n</div>";
  return buffer;}
);

// template --- tmpl-EaselJSForceClusterSlider2 ---
Handlebars.templates['tmpl-EaselJSForceClusterSlider2'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"EaselJSForceClusterSlider2 easelJSContainer\">\n		<div class=\"clusterChart\"></div>\n		<div class=\"contact-info\"></div>\n	</div>";}
);

// template --- tmpl-EaselJSTweenClusterChart ---
Handlebars.templates['tmpl-EaselJSTweenClusterChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"EaselJSTweenClusterChart\">\n		<div class=\"canvas-container\">\n			<canvas></canvas>\n		</div>\n		<div class=\"contact-info\"></div>\n	</div>";}
);

// template --- tmpl-popover-right ---
Handlebars.templates['tmpl-popover-right'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"popover fade right in\" style=\"top: ";
  foundHelper = helpers.top;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.top; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px; left: ";
  foundHelper = helpers.left;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.left; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px; display: block;\">\n	<div class=\"arrow\"></div>\n	<h3 class=\"popover-title\">Name:";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h3>\n	<div class=\"popover-content\">Friends Number:";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n</div>";
  return buffer;}
);

// template --- tmpl-MainScreen ---
Handlebars.templates['tmpl-MainScreen'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"MainScreen\">\n	    <div class=\"MainScreen-header\">\n			<div class=\"navbar navbar-inverse\" style=\"position: static;\">\n	        	<div class=\"navbar-inner\">\n	            	<div class=\"container\">\n	                  	<a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".navbar-inverse-collapse\">\n	                    	<span class=\"icon-bar\"></span>\n	                    	<span class=\"icon-bar\"></span>\n	                    	<span class=\"icon-bar\"></span>\n	                  	</a>\n	                  	<a class=\"brand\" href=\"#\">D3JS Vs EaselJS Demo</a>\n	                  	<div class=\"nav-collapse collapse navbar-inverse-collapse\">\n	                    	<ul class=\"nav\">\n	                      		<li class=\"dropdown\">\n		                       		<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">D3JS Demo <b class=\"caret\"></b></a>\n		                        	<ul class=\"dropdown-menu\">\n									    <li data-nav=\"D3JS\" class=\"nav-menu menu\"><a href=\"#\">D3JS Demo</a></li>\n									    <li data-nav=\"EaselJS\" class=\"nav-menu menu\"><a href=\"#\">EaselJS Demo </a></li>\n		                        	</ul>\n	                      		</li>\n	                      		\n							    <li data-nav=\"D3ForceChart\" class=\"D3JS menu\"><a href=\"#\">ForceChart</a></li>\n							    <li data-nav=\"D3ForceClusterChart\" class=\"D3JS menu\"><a href=\"#\">ForceClusterChart</a></li>\n                  				<li data-nav=\"ContactCluster\" class=\"D3JS menu\"><a href=\"#\">D3ContactCluster</a></li>\n							    \n					    		<li data-nav=\"EaseljsClusterChart\" class=\"EaselJS menu\"><a href=\"#\">EaelJSCluster</a></li>\n							    <li data-nav=\"EaselJSTweenClusterChart\" class=\"EaselJS menu\"><a href=\"#\">TweenContactCluster</a></li>\n                  				<li data-nav=\"ZoomCluster\" class=\"EaselJS menu active\"><a href=\"#\">EaselJS Zoom-Slider</a></li>\n                  				<li data-nav=\"EaselJSForceClusterSlider2\" class=\"EaselJS menu\"><a href=\"#\">EaselJS Slider2</a></li>\n					    		\n	                    	</ul>\n	                  	</div><!-- /.nav-collapse -->\n	                </div>\n	            </div><!-- /navbar-inner -->\n	        </div><!-- /navbar -->\n	         \n	        <div class=\"ControlBar\">\n				<div class=\"control-item\">\n					<label>Level(<span class=\"slider-level-value\">1</span>):</label>\n					<div class=\"toolbar-item-content slider level\"></div>\n				</div>\n				<div class=\"control-item\">\n					<label>Zoom(<span class=\"slider-zoom-value\">0.8</span>):</label> \n					<div class=\"toolbar-item-content slider zoom\"></div>\n				</div>\n				<div class=\"control-item\">\n					<label>Use RAF:</label> \n					<div class=\"toolbar-item-content raf\"><input type=\"checkbox\" class=\"raf-value\"/></div>\n				</div>\n				<div class=\"control-item width170\">\n					<label>Animation Speed:</label> \n					<div class=\"toolbar-item-content speed\"><span class=\"speed-value\">500</span></div>\n				</div>\n				<div class=\"control-item\">\n					<div class=\"toolbar-item-content new-data\"><button class=\"btn btn-small new-data-btn\" type=\"button\">New Data</button></div>\n				</div>\n		   </div>\n	         \n	    </div>\n	    \n	    <div class=\"MainScreen-main\"></div>\n    </div>";}
);

// template --- tmpl-Welcome ---
Handlebars.templates['tmpl-Welcome'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"Welcome\">\n		\n	</div>";}
);

// template --- tmpl-ZoomCluster ---
Handlebars.templates['tmpl-ZoomCluster'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"ZoomCluster\">\n		<div class=\"canvas-container\">\n			<canvas></canvas>\n		</div>\n		<div class=\"contact-info\"></div>\n	</div>";}
);
