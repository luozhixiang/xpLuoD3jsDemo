var app = app || {};

(function($) {
	
	//control the speed of animation
	app.time = 500;
	
	//create the data set
	app.dataSet = app.createDataSet(300,3,5);
	
	app.ContactDao = brite.registerDao(new brite.dao.ContactDaoHandler("Contact"));
	
	app.render = function(templateName,data){
		return hrender(templateName.data);
	}
	

})(jQuery);
