var CategoriesDataModel = FPDataModel.extend({
    init: function(dataModel) {
        this._super();
    	var self = this;
    	this.loadFromDataModel(dataModel);
    	dataModel.addEventListener({
    		eventName: "onDataSetChanged",
    		callback: function() {
    			self.loadFromDataModel(dataModel);
    		}
    	});
    },
    loadFromDataModel: function(dataModel) {
    	var categories = [];
    	var categoriesMap = {};

    	var items = dataModel.getData();
    	if (!items || items.length == 0) return;

	    items.forEach(function(element) {
	        var category = element.category;
	        var array = categoriesMap[category];
	        if (array == undefined) {
	            array = [];
	        }
	        array.push(element);
	        categoriesMap[category] = array;
	    });

	    var keys = Object.keys(categoriesMap);
	    keys.forEach(function(key) {
	        var category = {};
	        category.title = key;
	        category.images = categoriesMap[key][0].images;
	        categories.push(category);
	    });

    	this.setData(categories);
    }
});