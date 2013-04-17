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
            
            createjs.Ticker.setFPS(800);
            createjs.Ticker.useRAF = true;
            
            $e.find("li.D3JS").hide();
    		$e.find(".speed-value").text(app.time);
    		$e.find(".raf-value").attr("checked",createjs.Ticker.useRAF);
    		$e.find(".level").slider({
    			value: 1,  min: 1,  max: 4,  step: 1,
    			slide: function(event, ui) {
    			    app.level = ui.value;
    				view.$el.trigger("DO_SLIDE_LEVEL",{level:ui.value});
    				view.$el.find(".slider-level-value").text(ui.value);
    			}
    		});
    		$e.find(".zoom").slider({
    			value: 0.8, min: 0.1, max:1.5, step: 0.1,
    			slide: function(event, ui) {
    			 	app.scale = ui.value;
    				view.$el.trigger("DO_SLIDE_ZOOM",{scale:ui.value});
    				view.$el.find(".slider-zoom-value").text((ui.value==1?"1.0":ui.value));
    			}
    		});
    		
            brite.display("ZoomCluster",view.$container);
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
        	},
        	
        	//event for animation speed control
    		"btap; .ControlBar .control-item .speed-value":function(event){
    			var $span = $(event.currentTarget);
    			if(!$span.hasClass("editing")){
    				var text = $span.text();
    				var $updateHelperHtml = $(updateHelperHtml).val(text);
    				$span.html($updateHelperHtml);
    				$span.addClass("editing");
    				$updateHelperHtml.focus();
    				$updateHelperHtml.on("keyup", function(event){
    					if (event.which === 13){
    						app.time = this.value;
    						$span.removeClass("editing").html(this.value);
    					}else if (event.which === 27) {
    						$span.removeClass("editing").html(text);
    					}
    				});
    			}
    		},
    		
    		//event for if use RAF
    		"change; .ControlBar .control-item .raf-value":function(event){
    			var $this = $(event.currentTarget);
    			if($this.attr("checked")){
    				$this.removeAttr("checked");
    				createjs.Ticker.useRAF = false;
    			}else{
    				$this.attr("checked",true);
    				createjs.Ticker.useRAF = true;
    			}
    		},
    		
        	"btap; .ControlBar .control-item .new-data-btn":function(e){
        		app.ContactDao.update(app.createDataSet(30,3,6));
        	}
        }
        
    });
    

	var updateHelperHtml = '<input class="speed-change-input"/>';
})(jQuery);

