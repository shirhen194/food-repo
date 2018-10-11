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
            let directionsArr = directions.match(/\S.*?(?![^.!?]).!??/g);
           
            let youtubeUrl = $('#youtubeUrlCreate').val()
            let embedYoutube = youtubeUrl.replace('watch?v=', 'embed/')
            let haveYoutube;

            if (youtubeUrl == "") haveYoutube = false;
            else haveYoutube = true;

            console.log(embedYoutube);
            //creats object with all the variables
            let recipe = {
                name: $('#recipeNameCreate').val(),
                img: $('#imgCreate').val(),
                ingredients: this.recipesRepository.ingredients,
                directions: directionsArr,
                prepTime: parseInt($('#prepTimeCreate').val()),
                cookingTime: parseInt($('#cookingTimeCreate').val()),
                youtubeUrl: embedYoutube,
                diet: [],
                alergans: [],
                haveYoutube: haveYoutube
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
            //get ingredients from client
            let ingredients = $(".toggle-ingredients-input").val()
            let ingredientsArr = ingredients.split(',');
            for (let ingredient of ingredientsArr){
                q+=" "+ingredient
            }


            let url = "https://api.edamam.com/search?app_id=85758adc&app_key=3e6db936f012aeb14bbf9d31f821edbc&q=" + q

            let health = [$('input[value="tree-nut-free"]'), $('input[value="peanut-free"]'),
            $('input[value="vegan"]'), $('input[value="vegetarian"]'),
            $('input[value="sugar-conscious"]')]

            for (let i of health) {
                if (i.is(':checked')) {
                    url += "&health=" + i.val()
                }
            }

            if ($('input[value="high-protein"]').is(':checked')) {
                url += "&diet=high-protein"
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



            //לעשות דברים קולים עם המרכיבים שמקבלים מהapi
            // let ingredientCount = 0
            // function getIngredients(recipes) {

            //     for (let i in recipes.hits) {
            //         let apiIngredientsArr = recipes.hits[i].recipe.ingredientLines
            //         console.log(apiIngredientsArr)
            //         for (let ingredientfromApi of apiIngredientsArr) {
            //             for (let ingredientRecipe of ingredientsArr) {
            //                 ingredientfromApi.toLowerCase();
            //                 ingredientRecipe.toLowerCase();
            //                 if (ingredientfromApi.search(ingredientRecipe) !== -1) {
            //                     ingredientCount++
            //                 }
            //             }
            //         }

            //         if (ingredientCount != ingredientsArr.length) {
            //             recipes.hits.splice(i, 1)
            //         }

            //         ingredientCount=0
            //     }

            //     return recipes
            // }


            // חפשי במרכיבים אם יש משהו שמכיל את מה שצריך
            this.recipesApiRepository.getRecipesApi(url).then((recipes) => {
                    this.renderer.renderRecipesFromApi(recipes)
            }).fail(() => console.log("didnt get from api or the function didnt work"))
            this.recipesRepository.getFilteredRecipesByName(recName, stringAlergans, stringDiet, ingredientsArr).then((recipes) => { this.renderer.renderRecipesfromDb(recipes) }).fail(() => console.log("didnt get from api")).fail(() => console.log("didnt get from database"))
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

    handleAddAComment() {
        $('.recipe').on('click', '.addComment', (event) => {
            let $commentUserName = $(event.currentTarget).closest('.commentsForm').find('.commentsUserName')
            let $commentText = $(event.currentTarget).closest('.commentsForm').find('.commentsText')
            let $commentRating = $(event.currentTarget).closest('.commentsForm').find('.commentsRating')
            let recipeId = $(event.currentTarget).closest('.currentRecipe').data().id

            let comment = {
                userName: $commentUserName.val(),
                text: $commentText.val(),
                rating: parseInt($commentRating.val()),
                recipe: recipeId
            }

            let stryngifyComment = JSON.stringify(comment)

            this.recipesRepository.addAComment(stryngifyComment, recipeId).then(() => {
                this.renderer.renderRecipe(this.recipesRepository.currentRecipe)
                $commentUserName.val("")
                $commentText.val("")
                $commentRating.val("")
            })
        })
    }

    handleRemoveRecipe() {
        $('.recipe').on('click', '.removeRecipe', (event) => {
            let recipeId = $(event.currentTarget).closest('.currentRecipe').data().id

            this.recipesRepository.removeRecipe(recipeId).then((data)=>{
                this.renderer.$recipe.empty()
            })
        })
    }

    handleRemovecomment(){
        $('.recipe').on('click', '.removeComment', (event) => {
            let recipeId = $(event.currentTarget).closest('.currentRecipe').data().id
            let commentId = $(event.currentTarget).closest('.commentsContent').data().id

            this.recipesRepository.removeComment(recipeId, commentId).then(()=>{
                this.renderer.renderRecipe(this.recipesRepository.currentRecipe)
            })
        })
    }
}

export default EventsHandler