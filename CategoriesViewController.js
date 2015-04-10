var CategoriesViewController = FPObject.extend({
    init: function() {
        this._super();
        var dataModel = DataManager.getInstance().getDataModel();
        this.categoriesModel = new CategoriesDataModel(dataModel);
    },
    showInWindow: function(wnd) {
        var self = this;
        if (!self.categoriesView) {
            var uilLoader = new FPUILoader();
            uilLoader.loadXML({
                files: ["categories.xml"],
                success: function (views) {
                    self.categoriesView = views["categories.xml"];
                    wnd.setLayout(self.categoriesView);
                    var categoriesListView = self.categoriesView.getViewByName("categories_list_view");
                    categoriesListView.setDataModel(self.categoriesModel);
                    categoriesListView.addEventListener({
                        eventName: "onItemClick",
                        callback: function(item) {
                            var filteredModel = DataManager.getInstance().getCategoryDataModel(item.title);
                            var categoryWindow = new FPWindow();
                            categoryWindow.setTitle(item.title);
                            var recipeController = new RecipeListViewController();
                            recipeController.showInWindow(categoryWindow, filteredModel);
                            wnd.transitionToWindow(categoryWindow);
                        }
                    });
                }
            });
        } else {
            wnd.setLayout(self.categoriesView);
        }
    }
});