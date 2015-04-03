var DataModel = FPDataModel.extend({
    count: 0,
    itemsCache: null,
    init: function() {
        this._super();
        this.loadFromCache();
    },
    setData: function(newItems) {
        var oldItems = this.getData();
        if (oldItems && oldItems.constructor === Array && oldItems.length > 0) {
            var newItemsMap = {};
            var oldItemsMap = {};
            oldItems.forEach(function(item){
                oldItemsMap[item.id] = item;
            });
            var index = 0;
            newItems.forEach(function(item){
                if (!item.index) {
                    item.index = index++;
                }
                newItemsMap[item.id] = item;
            });
            var result = [];
            for (var id in newItemsMap) {
                var item = newItemsMap[id];
                if (oldItemsMap[id].favorite) {
                    item.favorite = oldItemsMap[id].favorite;
                    item.favorite_image = oldItemsMap[id].favorite_image;
                }
                result.push(item);
            }
            newItems = result;
            newItems.sort(function(a, b){
                return a.index - b.index;
            });
        }
        this.itemsCache = newItems;
        this.cacheData();
        this._super(newItems);
    },

    getData: function() {
        if (null == this.itemsCache) {
            this.itemsCache = this._super();
        }
        return this.itemsCache;
    },

    cacheData: function() {
        var items = this.getData();
        if (items) {
            localStorage.setItem('recipes', JSON.stringify(items)); 
        }
    },

    loadFromCache: function() {
        var json = localStorage.getItem('recipes');
        var items = null;
        try {
            items = JSON.parse(json);
        } catch(ignored) {}
        if (items && items.constructor === Array && items.length > 0) {
            this.setData(items);
        }
    }
});