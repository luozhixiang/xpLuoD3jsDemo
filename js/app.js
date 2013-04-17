var app = app || {};

(function($) {
	
	//control the speed of animation
	app.time = 500;
	
	app.scale = 0.8;
	
	app.level = 1;
	
	//create the data set
	app.dataSet = sampledata.data01;
	
	app.ContactDao = brite.registerDao(new brite.dao.ContactDaoHandler("Contact"));
	
	app.render = function(templateName,data){
		return hrender(templateName.data);
	}
	

})(jQuery);
