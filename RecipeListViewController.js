var RecipeListViewController = FPObject.extend({
    init: function() {
        this._super();
    },
    showInWindow: function(wnd, dataModel, emptyViewFile) {
        var self = this;
        if (!self.mainView) {
            var uiLoader = new FPUILoader();
            if (typeof emptyViewFile == "undefined") {
                emptyViewFile = "empty_view.xml";
            }
            uiLoader.loadXML({
                files : ["main.xml", emptyViewFile],
                success: function(views) {
                    self.mainView = views["main.xml"];
                    var emptyView = views[emptyViewFile];
                    wnd.setLayout(self.mainView);
                    var mainListView = self.mainView.getViewByName("recipes_list_view");
                    mainListView.setEmptyView(emptyView);
                    mainListView.setDataModel(dataModel);
                    mainListView.addEventListener({
                        eventName: "onItemClick",
                        callback: function(item) {
                            var recipeWindow = new RecipeWindow(item);
                            wnd.transitionToWindow(recipeWindow);
                        }
                    });
                    mainListView.addEventListener({
                        eventName: "onRowItemAction",
                        callback: function(viewId) {
                            var dataModel = DataManager.getInstance().getDataModel();
                            var items = dataModel.getData();
                            items.forEach(function(item){
                                if (item.id == viewId) {
                                    if (!item.favorite) {
                                        item.favorite = true;
                                        item.favorite_image = "ic_menu_favorited";
                                    } else {
                                        item.favorite = false;
                                        item.favorite_image = "ic_menu_favorite";
                                    }
                                }
                            });
                            dataModel.setData(items);
                        }
                    });
                }
            });
        } else {
            wnd.setLayout(self.mainView);
        }
    }
});