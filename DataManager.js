var DataManager = (function () {
    var instance;
    function init() {
        // private
        var dataModel = new DataModel();
        var categoryDataModel = null;
        var favoritesDataModel = null;

        function checkIfUpdateRequired() {
            var url = "http://divinecuisine.recipes/mobile/posts.php?count_only=1";
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.count !== dataModel.count) {
                        loadFromInternet();
                    }
                }
            };
            xhr.send(null);
        }

        function loadFromInternet() {
            var url = "http://divinecuisine.recipes/mobile/posts.php";
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    var items = JSON.parse(xhr.responseText);
                    dataModel.setData(items);
                }
            };
            xhr.send(null);
        }
        if (dataModel.count === 0) {
            loadFromInternet();
        } else {
            checkIfUpdateRequired();
        }
        return {
            // public
            getDataModel: function () {
                return dataModel;
            },
            getFavoritesDataModel: function() {
                if (null === favoritesDataModel) {
                    favoritesDataModel = new FPDataModel();
                    favoritesDataModel.setData(dataModel.getData());
                    favoritesDataModel.setFilter({
                        "favorite_image": "ic_menu_favorited"
                    });
                    dataModel.addEventListener({
                        eventName: "onDataSetChanged",
                        callback: function() {
                            favoritesDataModel.setData(dataModel.getData());
                        }
                    });
                }
                return favoritesDataModel;
            },

            getCategoryDataModel: function(category) {
                if (null === categoryDataModel) {
                    categoryDataModel = new FPDataModel();
                    categoryDataModel.setData(dataModel.getData());
                    dataModel.addEventListener({
                        eventName: "onDataSetChanged",
                        callback: function() {
                            categoryDataModel.setData(dataModel.getData());
                        }
                    });
                }
                categoryDataModel.setFilter({
                    "category": category
                });
                return categoryDataModel;
            }
        };
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
