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
            
            let directions = $('#directionsCreate').val();
            let directionsArr = directions.explode("\n");


            //creats object with all the variables
            let recipe = {
                name: $('#recipeNameCreate').val(),
                img: $('#imgCreate').val(),
                ingredients: this.recipesRepository.ingredients,
                directions: directionsArr,
                prepTime: parseInt($('#prepTimeCreate').val()),
                cookingTime: parseInt($('#cookingTimeCreate').val()),
                youtubeUrl: $('#youtubeUrlCreate').val(),
                diet: [],
                alergans: []
            }
            console.log(recipe.directions)
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

            this.recipesRepository.addARecipe({newRecipe: newRecipe}).then(()=>{
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
        $(".Get-recipes").on('click', function () {
            //filter Api
            //first we take the q input! which is the recipe name:
            let q = $("#recipe-input").val()
            let url = "https://api.edamam.com/search?app_id=85758adc&app_key=3e6db936f012aeb14bbf9d31f821edbc&q="+q


            let health=[$('input[value="gluten-free"]'),$('input[value="tree-nut-free"]'),$('input[value="peanut-free"]'),
            $('input[value="dairy-free"]'),$('input[value="vegan"]'), $('input[value="vegetarian"]'),
            $('input[value="low-sugar"]')]

            for (let i of health) {
                if (i.is(':checked')) {
                    url += "&Health="+i.val()
                }
            }

            if ($('input[value="high-protein"]').is(':checked')) {
                url += "&Diet=high-protein"
            }


            let ingredients = $(".toggle-ingredients-input").val()

            //filter database
            let alergansFilter =[]
            let dietFilter=[]
            let recName = $("#recipe-input").val()

            let diets = [$('#vegan-checkbox'), $('#vegetarian-checkbox'), $('#high-protein-checkbox'), $('#low-sugar-checkbox')];
            let alergies = [$('#gluten-checkbox"'), $('#tree-nut-checkbox'), $('#peanuts-checkbox'), $('#dairy-checkbox')];

            for (let i of alergies) {
                if (i.checked) {
                    alergansFilter.push(""+i.val()+"")
                }
            }

            for (let i of diets) {
                if (i.checked) {
                    dietFilter.push(""+i.val()+"")
                }
            }
        
            //חפשי במרכיבים אם יש משהו שמכיל את מה שצריך
            // this.recipesApiRepository.getRecipesApi(url).then((recipes) => {this.renderer.renderRecipe(recipes)})
            this.recipesRepository.getFilteredRecipesByName(recName,alergansFilter,dietFilter).then((recipes) => {this.renderer.renderRecipe(recipes)})
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