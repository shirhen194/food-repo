class RecipesRepository {
    constructor() {
        this.recipes = []
        this.currentRecipe = {}

        //holds ingrediants only while some one is creating a new recipe
        this.ingredients = []
    }

    getAllRecipes() {
        return $.get('/recipes').then((recipes) => {
            this.recipes = recipes;
        })
    }

    addARecipe(newRecipe) {
        return $.post('/recipes', newRecipe).then((currentRecipe) => {
            this.currentRecipe = currentRecipe;
        })
    }

    getFilteredRecipesByName(recName,alergies, diets){
        return  $.get(`/recipes/${recName}/${alergies}/${diets}`)
    }

    addAComment(newComment, recipeId) {
        return $.post('/comments', {recipeId: recipeId, newComment: newComment}).then((recipe) => {
            this.currentRecipe = recipe;
        })
    }

    removeRecipe(recipeId){
        return $.ajax({
            url: '/recipes/' + recipeId,
            method: 'DELETE',
            contentType: 'application/json',
            success: (data)=> {
                console.log(data);
            },
            error: (request,msg,error)=> {
                console.log(error)
            }
        });         
    }

    removeComment(recipeId, commentId){
        return $.ajax({
            url: '/comments/' +  commentId + '/' +recipeId,
            method: 'DELETE',
            contentType: 'application/json',
            success: (recipe)=> {
                this.currentRecipe = recipe;
            },
            error: (request,msg,error)=> {
                console.log(error)
            }
        });         
    }

    //these 2 functions are only for whene some one creates a recipe.
    addIng(newIng) {
        this.ingredients.push(newIng)
    }

    removeIng(ingToBeRemoved) {
        for (let i of this.ingredients) {
            if (i.name == ingToBeRemoved.name && i.portion == ingToBeRemoved.portion) {
                this.ingredients.splice(this.ingredients.indexOf(i), 1)
            }
        }
    }
    //when the recipe is complite and added to the data base the ingredients will be removed
    removeAllIng() {
        this.ingredients = [];
    }
}

export default RecipesRepository