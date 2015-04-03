var DataManager = (function () {
    var instance;
    function init() {
        // private
        var dataModel = new DataModel();
        var categoryDataModel = null;
        var favoritesDataModel = null;

        function checkIfUpdateRequired() {
            var url = "http://divinecuisine.recipes/wrappers/getposts.php&count_only=1";
            xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange=function() {
                if (xhr.readyState==4) {
                    response = JSON.parse(xhr.responseText);
                    if (response.count != dataModel.count) {
                        loadFromInternet();
                    }
                }
            }
            xhr.send(null);
        }

        function loadFromInternet(){
            var url = "http://divinecuisine.recipes/wrappers/getposts.php";
            xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange=function() {
                if (xhr.readyState==4) {
                    items = JSON.parse(xhr.responseText);
                    dataModel.setData(items);
                }
            }
            xhr.send(null);
        }
        if (dataModel.count == 0) {
            loadFromInternet();
        } else {
            checkIfUpdateRequired();
        }
        return {
            // public
            getDataModel: function (filter) {
                return dataModel;
            },
            getFavoritesDataModel: function() {
                if (null == favoritesDataModel) {
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
                if (null == categoryDataModel) {
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
    };
    return {
        getInstance: function () {
            if ( !instance ) {
                instance = init();
            }
            return instance;
        }
    };
})();
