class EventsHandler {
    constructor(recipesRepository, renderer, recipesApiRepository) {
        this.recipesRepository = recipesRepository;
        this.render = renderer;
        this.recipesApiRepository = recipesApiRepository;
    }

    addRecipe() {

        $('#addRecipe').on('click', () => {
            //finds all the checkboxes
            let dieats = [$('#veganCreate'), $('#vegetarianCreate'), $('#high-proteinCreate'), $('#low-sugarCreate')];
            let alergies = [$('#gluten-freeCreate'), $('#dairy-freeCreate'), $('#peanutsCreate'), $('#treenutsCreate')];

            let youtubeUrl = $('#youtubeUrlCreate').val()
            let embedYoutube = youtubeUrl.replace('watch?v=', 'embed/')
            console.log(embedYoutube);
            //creats object with all the variables
            let recipe = {
                name: $('#recipeNameCreate').val(),
                img: $('#imgCreate').val(),
                ingridiant: this.recipesRepository.ingredients,
                directions: $('#directionsCreate').val(),
                prepTime: JSON.parse($('#prepTimeCreate').val()),
                cookingTime: JSON.parse($('#cookingTimeCreate').val()),
                youtubeUrl: embedYoutube,
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
            console.log(recipe)

            this.recipesRepository.addARecipe(recipe).then(()=>{
            this.render.renderRecipes(this.recipesRepository.recipes);
            this.recipesRepository.removeAllIng();
            console.log(this.recipesRepository.recipes)
            })
        })
    }

    ToggleIngredients() {
        $(".add-ingredients").on('click', '.toggle-comments', (event) => {
            $(".toggle-ingredients-input").toggleClass('show');
        });
    }

    sendCriterias() {
        $(".Get-recipes").on('click', function () {
            let url = "https://api.edamam.com/search?app_id=85758adc&app_key=3e6db936f012aeb14bbf9d31f821edbc&q="
            //first we take the q input! which is the recipe name:
            q = $("#recipe-input").val()
            if ($('input[value="gluten"]').is(':checked')) {
                url += "&Health=" + gluten - free
            }
            if ($('input[value="tree-nut"]').is(':checked')) {
                url += "&Health=" + tree - nut - free
            }
            if ($('input[value="peanuts"]').is(':checked')) {
                url += "&Health=" + peanut - free
            }
            if ($('input[value="dairy"]').is(':checked')) {
                url += "&Health=" + dairy - free
            }
            if ($('input[value="vegan"]').is(':checked')) {
                url += "&Health=" + vegan
            }
            if ($('input[value="vegetarian"]').is(':checked')) {
                url += "&health=" + vegetarian
            }
            if ($('input[value="high-protein"]').is(':checked')) {
                url += "&Diet=" + high - protein
            }
            if ($('input[value="low-sugar"]').is(':checked')) {
                url += "&Health=" + low - sugar
            }

            let ingredients = $(".toggle-ingredients-input").val()

            //חפשי במרכיבים אם יש משהו שמכיל את מה שצריך
            this.recipesApiRepository.getRecipesApi(url).then((recipeis) => { })
        })
    }

    //while creating recepie you need to be able to add multiple ingredients with different pmeasurmments to each one
    addIngWhileCreatingRecipe() {
        $('#addIngredients').on('click', () => {
            let ingName = $('#ingridientCreate');
            let ingPortion = $('#ingridientPortionCreate');

            let newIng = { name: ingName.val(), portion: ingPortion.val() };
            this.recipesRepository.addIng(newIng);

            this.render.renderIngToCreatingForm(this.recipesRepository.ingredients);
            ingName.val("");
            ingPortion.val("")
        })
    }

    removeIngWhileCreatingRecipe() {
        $('#ingridients').on('click', '.removeIng', (event) => {
            let ingName = $(event.currentTarget).closest('.ingridient').find('.ingName');
            let ingPortion = $(event.currentTarget).closest('.ingridient').find('.ingPortion');

            let ingToRemove = { name: ingName.text(), portion: ingPortion.text() };
            this.recipesRepository.removeIng(ingToRemove);

            this.render.renderIngToCreatingForm(this.recipesRepository.ingredients);
        })
    }

}

export default EventsHandler