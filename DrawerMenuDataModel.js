var DrawerMenuDataModel = FPDataModel.extend({
    init: function() {
        this._super();
        this.setData([
            {
                title: "Home",
                icon: "ic_home",
                id: 0
            }, {
                title: "Categories",
                icon: "ic_categories",
                id: 1
            }, {
                title: "Favorites",
                icon: "ic_favorites",
                id: 2
            }
        ]);
    }
});