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
                recipePhoto.setUrl(item.attachments[0].url);

                // title
                var recipeTitle = recipeLayout.getViewByName("recipe_title");
                recipeTitle.setTitle(item.title);

                // description
                var recipeDescription = recipeLayout.getViewByName("recipe_description");
                recipeDescription.setTitle(item.content);

                var ingredients = [];

                // ingredients
                var ingredients_container = recipeLayout.getViewByName("ingredients_container");
                for (var ingredient in item.ingredients) {
                    var ingredientLabel = new FPLabel();
                    var title = item.ingredients[ingredient]["text"];
                    ingredientLabel.isHeader = false;
                    if (title.indexOf(": -") > -1) {
                        ingredientLabel.isHeader = true;
                        // remove space and '-' chars from the end of the string
                        title = title.substring(0, title.indexOf(": -"));
                    }
                    ingredientLabel.setAttributes({
                                    typeface: ingredientLabel.isHeader ? "bold" : "normal",
                                    title: title,
                                    textSize: 18,
                                    margin: ingredientLabel.isHeader ? "20 0 10 0" : "40 0 10 0"
                    });
                    ingredients.push(ingredientLabel);
                }

                ingredients_container.addViews(ingredients);

                var mail_ingredients_button = recipeLayout.getViewByName("mail_ingredients_button");
                mail_ingredients_button.addEventListener({
                    eventName: "onClick",
                    callback: function() {
                        if (ingredients.length === 0) {
                            alert("No ingredients to send");
                        } else {
                            var ingredientsList = "<html><body><ul>";
                            var ingredientsCount = 0;
                            ingredients.forEach(function (ingredientLabel) {
                                ingredientsList += "<li>";
                                ingredientsList += ingredientLabel.isHeader ? "<b>" : "";
                                ingredientsList += ingredientLabel.isHeader ? "" : ++ingredientsCount + ". ";
                                ingredientsList += ingredientLabel.getTitle();
                                ingredientsList += ingredientLabel.isHeader ? ":</b>" : "";
                                ingredientsList += "</li><br>";
                                if (ingredientLabel.isHeader) {
                                    ingredientsCount = 0;
                                }
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
                var instructions = "";
                for (instruction in item.instructions) {
                    instructions += item.instructions[instruction]["text"];
                    instructions += "\n";
                }
                recipeInstructions.setTitle(instructions);

            },
            failure: function(error) {
                alert(error);
            }
        });
    }
});