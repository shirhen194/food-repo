class EventsHandler {
    constructor(recipesRepository, renderer, recipesApiRepository) {
        this.recipesRepository = recipesRepository;
        this.renderer = renderer;
        this.recipesApiRepository = recipesApiRepository;
    }

    addRecipe() {

        $('#addRecipe').on('click', () => {
            //finds all the checkboxes
            let dieats = [$('#veganCreate'), $('#vegetarianCreate'), $('#high-proteinCreate'), $('#low-sugarCreate')];
            let alergies = [$('#gluten-freeCreate'), $('#dairy-freeCreate'), $('#peanutsCreate'), $('#treenutsCreate')];

            //creats object with all the variables
            let recipe = {
                name: $('#recipeNameCreate').val(),
                img: $('#imgCreate').val(),
                ingredients: this.recipesRepository.ingredients,
                directions: $('#directionsCreate').val(),
                prepTime: parseInt($('#prepTimeCreate').val()),
                cookingTime: parseInt($('#cookingTimeCreate').val()),
                youtubeUrl: $('#youtubeUrlCreate').val(),
                diet: [],
                alergans: []
            }

            //adds total time to the object
            recipe.totalTime = recipe.prepTime + recipe.cookingTime

            //adds to the object only if the checkbox was checked    
            for (let i of dieats) {
                if (i.prop('checked')) {
                    recipe.diet.push(i.val())
                }
            }

            for (let i of alergies) {
                if (i.prop('checked')) {
                    recipe.alergans.push(i.val())
                }
            }

            let newRecipe = JSON.stringify(recipe)

            this.recipesRepository.addARecipe({ newRecipe: newRecipe }).then(() => {
                this.renderer.renderRecipe(this.recipesRepository.currentRecipe);
                this.recipesRepository.removeAllIng();
            })
        })
    }

    ToggleIngredients() {
        $(".add-ingredients").on('click', (event) => {
            $(".toggle-ingredients-input").toggleClass('show');
        });
    }

    sendCriterias() {
        $(".Get-recipes").on('click', () => {
            //filter Api
            //first we take the q input! which is the recipe name:
            let q = $("#recipe-input").val()
            let url = "https://api.edamam.com/search?app_id=85758adc&app_key=3e6db936f012aeb14bbf9d31f821edbc&q=" + q


            let health = [$('input[value="tree-nut-free"]'), $('input[value="peanut-free"]'),
            $('input[value="vegan"]'), $('input[value="vegetarian"]'),
            $('input[value="sugar-conscious"]')]

            for (let i of health) {
                if (i.is(':checked')) {
                    url += "&Health=" + i.val()
                }
            }

            if ($('input[value="high-protein"]').is(':checked')) {
                url += "&Diet=high-protein"
            }

            url += "&from=0&to=10&app_id=85758adc&app_key=3e6db936f012aeb14bbf9d31f821edbc"

            //filter database
            let alergansFilter = []
            let dietFilter = []
            let recName = $("#recipe-input").val()

            let diets = [$('#vegan-checkbox'), $('#vegetarian-checkbox'), $('#high-protein-checkbox'), $('#sugar-conscious-checkbox')];
            let alergies = [$('#tree-nut-checkbox'), $('#peanuts-checkbox')];

            for (let i of alergies) {
                if (i.is(':checked')) {
                    alergansFilter.push("" + i.val() + "")
                }
            }

            for (let i of diets) {
                if (i.is(':checked')) {
                    dietFilter.push("" + i.val() + "")
                }
            }

            //stringify for the get request parameter
            let stringDiet = JSON.stringify(dietFilter)
            let stringAlergans = JSON.stringify(alergansFilter)

            //get ingredients from client
            let ingredients = $(".toggle-ingredients-input").val()
            let ingredientsArr = ingredients.split(/\s+/);

            //לעשות דברים קולים עם המרכיבים שמקבלים מהapi
            let ingredientCount = 0
            function getIngredients(recipes) {

                for (let i in recipes.hits) {
                    let apiIngredientsArr = recipes.hits[i].ingredientLines.split(/\s+/);
                    for (let ingredientRecipe of apiIngredientsArr) {
                        for (let ingredientSearched of ingredientsArr) {
                            if (ingredientSearched == ingredientRecipe) {
                                ingredientCount++
                            }
                        }
                    }

                    if (ingredientCount != ingredientsArr.length) {
                        recipes.hits.splice(i, 1)
                    }

                    ingredientCount=0
                }

                return recipes
            }


            // חפשי במרכיבים אם יש משהו שמכיל את מה שצריך
            this.recipesApiRepository.getRecipesApi(url).then((recipes) => {
                if(ingredients){
                    let recipesFiltered= getIngredients(recipes)
                    this.renderer.renderRecipesFromApi(recipesFiltered)
                }
                else{
                    this.renderer.renderRecipesFromApi(recipes)
                }
               

            }).fail(() => console.log("didnt get from api"))
            this.recipesRepository.getFilteredRecipesByName(recName, stringAlergans, stringDiet).then((recipes) => { this.renderer.renderRecipesfromDb(recipes) }).fail(() => console.log("didnt get from api")).fail(() => console.log("didnt get from database"))
        console.log(url)
        })
    }

    //while creating recepie you need to be able to add multiple ingredients with different pmeasurmments to each one
    addIngWhileCreatingRecipe() {
        $('#addIngredients').on('click', () => {
            let ingName = $('#ingridientCreate');
            let ingPortion = $('#ingridientPortionCreate');

            let newIng = { name: ingName.val(), portion: ingPortion.val() };
            this.recipesRepository.addIng(newIng);

            this.renderer.renderIngToCreatingForm(this.recipesRepository.ingredients);
            ingName.val("");
            ingPortion.val("")
        })
    }

    removeIngWhileCreatingRecipe() {
        $('#ingredients').on('click', '.removeIng', (event) => {
            let ingName = $(event.currentTarget).closest('.ingredient').find('.ingName');
            let ingPortion = $(event.currentTarget).closest('.ingredient').find('.ingPortion');

            let ingToRemove = { name: ingName.text(), portion: ingPortion.text() };
            this.recipesRepository.removeIng(ingToRemove);

            this.renderer.renderIngToCreatingForm(this.recipesRepository.ingredients);
        })
    }

}

export default EventsHandler