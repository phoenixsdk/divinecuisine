var RecipeWindow = FPWindow.extend({
    init: function(item) {
        this._super();
        var self = this;
        this.setTitle("Divine Cuisine");
        var uiLoader = new FPUILoader();
        uiLoader.loadXML({
            files : ["recipe.xml"],
            success: function(views) {
                var recipeLayout = views["recipe.xml"];
                self.setLayout(recipeLayout);
                // photo
                var recipePhoto = recipeLayout.getViewByName("recipe_photo");
                recipePhoto.setUrl(item.images.large.url);

                // title
                var recipeTitle = recipeLayout.getViewByName("recipe_title");
                recipeTitle.setTitle(item.title);

                // description
                var recipeDescription = recipeLayout.getViewByName("recipe_description");
                recipeDescription.setTitle(item.description);

                var checkBoxes = [];

                // ingredients
                var ingredients_container = recipeLayout.getViewByName("ingredients_container");
                for (var ingredient in item.ingredients) {
                    var v = new FPCheckBox();
                    v.setAttributes({
                                    checked: true,
                                    title:item.ingredients[ingredient],
                                    margin:"20 0 10 0"
                    });
                    checkBoxes.push(v);
                }

                ingredients_container.addViews(checkBoxes);

                var mail_ingredients_button = recipeLayout.getViewByName("mail_ingredients_button");
                mail_ingredients_button.addEventListener({
                    eventName: "onClick",
                    callback: function() {
                        var selectedIngredients = [];
                        checkBoxes.forEach(function(checkBox) {
                            if (checkBox.isChecked()) {
                                selectedIngredients.push(checkBox.getTitle());
                            }
                        });
                        if (selectedIngredients.length === 0) {
                            alert("You need to select at least one ingredient");
                        } else {
                            var ingredientsList = "<html><body><ul>";
                            var ingredientsCount = 0;
                            selectedIngredients.forEach(function (ingredient) {
                                ingredientsList += "<li>" + ++ingredientsCount + ". " + ingredient.trim() + ".</li><br>";
                            });
                            ingredientsList += "</ul></body></html>";
                            var composer = new FPMailComposer();
                            composer.compose({
                                body: ingredientsList,
                                subject: "Shopping List",
                                format: "html"
                            });
                            composer.present();
                        }
                    }
                });
                
                // instructions
                var recipeInstructions = recipeLayout.getViewByName("recipe_instructions");
                recipeInstructions.setTitle(item.instructions);

            },
            failure: function(error) {
                alert(error);
            }
        });
    }
});