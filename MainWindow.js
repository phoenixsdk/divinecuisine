var MainWindow = FPDrawerWindow.extend({
    init: function() {
        this._super();
        var self = this;
        var uiLoader = new FPUILoader();
        uiLoader.loadXML({
            files : ["main.xml", "drawer.xml"],
            success: function(views) {
                self.setTitle("Divine Cuisine");
                self.setTheme({
                    primaryColor: "#C6393C",
                    accentColor: "#C6393C"
                });

                var drawerView = views["drawer.xml"];
                self.setDrawerLayout(drawerView);

                var dataModel = DataManager.getInstance().getDataModel();
                self.recipeController = new RecipeListViewController();
                self.recipeController.showInWindow(self, dataModel);

                // setup drawer view
                var menuListView = drawerView.getViewByName("drawer_list_view");
                var menuDataModel = new DrawerMenuDataModel();
                menuListView.setDataModel(menuDataModel);

                menuListView.addEventListener({
                    eventName: "onItemClick",
                    callback: function(item) {
                        switch (item.id) {
                            // home
                            case 0: {
                                self.recipeController.showInWindow(self, dataModel);
                                break;
                            }
                            // categories
                            case 1: {
                                if (!self.categoriesController) {
                                    self.categoriesController = new CategoriesViewController();
                                }
                                self.categoriesController.showInWindow(self);
                                break;
                            }
                            // favorites
                            case 2: {
                                if (!self.favoritesController) {
                                    self.favoritesController = new RecipeListViewController();
                                    self.favoritesDataModel = DataManager.getInstance().getFavoritesDataModel();
                                }
                                self.favoritesController.showInWindow(self, self.favoritesDataModel, "empty_favorite_view.xml");
                                break;
                            }
                        }
                    }
                });
            },
            failure: function(error) {
                alert(error);
            }
        });
    }
});