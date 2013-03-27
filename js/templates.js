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

// template --- tmpl-MainScreen ---
Handlebars.templates['tmpl-MainScreen'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"MainScreen\">\n	    <div class=\"MainScreen-header\">\n			<div class=\"navbar  navbar-inverse navbar-fixed-top\">\n			  <div class=\"navbar-inner\">\n			    <a class=\"brand\" href=\"#\">D3JS Demo</a>\n			    <ul class=\"nav\">\n			      <li data-nav=\"Welcome\" class=\"menu active\">Welcome</li>\n			      <li data-nav=\"EaseljsClusterChart\" class=\"menu\">EaelJSContactCluster</li>\n			      <li data-nav=\"ContactCluster\" class=\"menu\">D3ContactCluster</li>\n			      <li data-nav=\"D3ForceClusterChart\" class=\"menu\">ForceClusterChart</li>\n			      <li data-nav=\"D3ForceChart\" class=\"menu\">ForceChart</li>\n			    </ul>\n			  </div>\n			</div>\n	    </div>\n	    <div class=\"MainScreen-main\"></div>\n    </div>";}
);

// template --- tmpl-Welcome ---
Handlebars.templates['tmpl-Welcome'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"Welcome\">\n		\n	</div>";}
);
