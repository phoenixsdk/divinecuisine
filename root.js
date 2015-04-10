include([
	"ui.js",
	"MainWindow.js",
	"DataModel.js",
	"DrawerMenuDataModel.js",
	"CategoriesDataModel.js",
	"DataManager.js",
	"RecipeWindow.js",
	"RecipeListViewController.js",
	"CategoriesViewController.js"],
	function() {
		var mainWindow = new MainWindow();
		mainWindow.presentAsRootWindow();
});
