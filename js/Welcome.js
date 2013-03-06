(function ($) {
    brite.registerView("Welcome",  {
		emptyParent : true,
		parent:".MainScreen-main"
	}, {
    	create:function (data, config) {
            var html = hrender("tmpl-Welcome",{});
            return html;
        },
        postDisplay:function (data, config) {
            var view = this;
            var $e = view.$el;
            
            d3.select(".Welcome")
		      .style("width", "0%")
		      .text("Welcome to the D3JS Chart Demo!")
	    	  .transition()
		      .ease("bounce")
		      .duration(2000)
		      .style("width", "100%");
		}
    });
    
})(jQuery);

