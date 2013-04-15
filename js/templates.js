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

// template --- tmpl-DragForceDirectedCluster ---
Handlebars.templates['tmpl-DragForceDirectedCluster'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"DragForceDirectedCluster\">\n		<canvas width=\"800\" height=\"800\"></canvas>\n		<div class=\"contact-info\"></div>\n	</div>";}
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

// template --- tmpl-EaselJSTweenClusterChart ---
Handlebars.templates['tmpl-EaselJSTweenClusterChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"EaselJSTweenClusterChart\">\n		<canvas width=\"800\" height=\"800\"></canvas>\n		<div class=\"customize-info\">\n			<div class=\"customize-item\">\n				<span>Use RequestAnimationFrame:</span>\n				<div class=\"btn-group btn-raf\">\n				  <button class=\"btn\" data-on=\"true\">On</button>\n				  <button class=\"btn\" data-on=\"false\">Off</button>\n				</div>\n			</div>\n			<div class=\"customize-item\">\n				<span>Speed Of Animation(Integer):</span>\n				<div class=\"btn-group btn-soa\">\n	                  <input type=\"text\" id=\"soa\" value=\"";
  foundHelper = helpers.time;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.time; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" >\n	            </div>\n			</div>\n		</div>\n		<div class=\"contact-info\"></div>\n	</div>";
  return buffer;}
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

// template --- tmpl-ForceDirectedCluster ---
Handlebars.templates['tmpl-ForceDirectedCluster'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"ForceDirectedCluster\">\n		<canvas width=\"800\" height=\"800\"></canvas>\n		<div class=\"contact-info\"></div>\n	</div>";}
);

// template --- tmpl-MainScreen ---
Handlebars.templates['tmpl-MainScreen'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"MainScreen\">\n	    <div class=\"MainScreen-header\">\n			<div class=\"navbar navbar-inverse\" style=\"position: static;\">\n	        	<div class=\"navbar-inner\">\n	            	<div class=\"container\">\n	                  	<a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".navbar-inverse-collapse\">\n	                    	<span class=\"icon-bar\"></span>\n	                    	<span class=\"icon-bar\"></span>\n	                    	<span class=\"icon-bar\"></span>\n	                  	</a>\n	                  	<a class=\"brand\" href=\"#\">D3JS Vs EaselJS Demo</a>\n	                  	<div class=\"nav-collapse collapse navbar-inverse-collapse\">\n	                    	<ul class=\"nav\">\n	                      		<li class=\"dropdown\">\n		                       		<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">D3JS Demo <b class=\"caret\"></b></a>\n		                        	<ul class=\"dropdown-menu\">\n									    <li data-nav=\"D3JS\" class=\"nav-menu menu\"><a href=\"#\">D3JS Demo</a></li>\n									    <li data-nav=\"EaselJS\" class=\"nav-menu menu\"><a href=\"#\">EaselJS Demo </a></li>\n		                        	</ul>\n	                      		</li>\n	                      		\n							    <li data-nav=\"D3ForceChart\" class=\"D3JS menu\"><a href=\"#\">ForceChart</a></li>\n							    <li data-nav=\"D3ForceClusterChart\" class=\"D3JS menu\"><a href=\"#\">ForceClusterChart</a></li>\n                  				<li data-nav=\"ContactCluster\" class=\"D3JS menu\"><a href=\"#\">D3ContactCluster</a></li>\n							    \n					    		<li data-nav=\"EaseljsClusterChart\" class=\"EaselJS menu\"><a href=\"#\">EaelJSCluster</a></li>\n							    <li data-nav=\"EaselJSTweenClusterChart\" class=\"EaselJS menu\"><a href=\"#\">TweenContactCluster</a></li>\n							    <li data-nav=\"ForceDirectedCluster\" class=\"EaselJS menu\"><a href=\"#\">ForceDirectedCluster</a></li>\n							    <li data-nav=\"DragForceDirectedCluster\" class=\"EaselJS menu\"><a href=\"#\">DragForceDirectedCluster</a></li>\n                  				<li data-nav=\"ZoomCluster\" class=\"EaselJS menu active\"><a href=\"#\">EaselJS Zoom-Slider</a></li>\n					    		\n	                    	</ul>\n	                  	</div><!-- /.nav-collapse -->\n	                </div>\n	            </div><!-- /navbar-inner -->\n	        </div><!-- /navbar -->\n	    </div>\n	    <div class=\"MainScreen-main\"></div>\n    </div>";}
);

// template --- tmpl-Welcome ---
Handlebars.templates['tmpl-Welcome'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"Welcome\">\n		\n	</div>";}
);

// template --- tmpl-ZoomCluster ---
Handlebars.templates['tmpl-ZoomCluster'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"ZoomCluster\">\n		<canvas width=\"800\" height=\"800\"></canvas>\n		<div class=\"contact-info\"></div>\n		<div class=\"slider-container\">\n			<label>Level: <span class=\"level-value\">1</span></label>\n			<div class=\"toolbar-item-content level\"></div>\n			<label>Zoom: <span class=\"zoom-value\">1.0</span></label> \n			<div class=\"toolbar-item-content zoom\"></div>\n		</div>\n	</div>";}
);
