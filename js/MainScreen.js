(function ($) {
    brite.registerView("MainScreen",  {}, {
    	
        create:function (data, config) {
            var html = hrender("tmpl-MainScreen",{});
            return html;
        },
        
        postDisplay:function (data, config) {
            var view = this;
            var $e = view.$el;
            view.$container = $e.find(".MainScreen-main");
            brite.display("Welcome");
        },
        
        events:{
        	"click; .MainScreen-header .navbar-inner .nav li":function(event){
        		var view = this;
        		var $this = $(event.currentTarget);
        		var chart = $this.attr("data-nav");
        		$this.addClass("active").siblings().removeClass("active");
        		brite.display(chart,view.$container);
        	}
        }
        
    });
})(jQuery);

