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
            brite.display("ZoomCluster",view.$container);
            $e.find("li.D3JS").hide();
        },
        
        events:{
	        	"btap; .nav li.nav-menu":function(e){
	    		var view = this;
	    		var $e = view.$el;
	    		var $li = $(e.currentTarget);
	    		$e.find("li.nav-menu").removeClass("active");
	    		$li.addClass("active");
	    		var menu = $li.attr("data-nav");
	    		
	    		if(menu == "D3JS"){
	    			$e.find("li.EaselJS").hide();
	    		  	$e.find("li.D3JS").show();
	        		brite.display("ContactCluster",view.$container);
	        		$e.find(".nav > li").removeClass("active");
	        		$e.find(".nav > li.menu[data-nav='ContactCluster']").addClass("active");
	    		}else if(menu == "EaselJS"){
	    			$e.find("li.EaselJS").show();
	    		  	$e.find("li.D3JS").hide();
	        		brite.display("ZoomCluster",view.$container);
	        		$e.find(".nav > li").removeClass("active");
	        		$e.find(".nav > li.menu[data-nav='ZoomCluster']").addClass("active");
	    		}
	    		$li.closest(".dropdown").find(".dropDownTitle").html(menu);
	    	},
	    	
        	"btap; .MainScreen-header .navbar-inner .nav > li.menu":function(event){
        		var view = this;
        		var $this = $(event.currentTarget);
        		var chart = $this.attr("data-nav");
        		$this.addClass("active").siblings().removeClass("active");
        		brite.display(chart,view.$container);
        	}
        }
        
    });
})(jQuery);

