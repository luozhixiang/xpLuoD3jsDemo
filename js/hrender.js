var hrender;

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