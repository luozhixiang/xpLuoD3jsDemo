var hrender;

Handlebars.registerHelper('each', function(context, options) {
	  var ret = "";
	  for(var i=0, j=context.length; i<j; i++) {
	    ret = ret + options.fn(context[i]);
	  }
	  return ret;
});

(function() {
	
	hrender = function(idSelector, data) {
		var tmpl = Handlebars.templates[idSelector];
		if (tmpl){
		      return tmpl(data);
	    }else{
	      return "<small>Error: could not find template: " + idSelector + "</small>";
	    }
	}

})();