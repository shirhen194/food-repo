class RecipesRepository {
    constructor() {
        this.recipes = []
        this.currentRecipe = {}

        //holds ingrediants only while some one is creating a new recipe
        this.ingredients = []
    }

    getAllRecipes(){
        return $.get('/recipes').then((recipes)=>{
            this.recipes = recipes;
        })
    }

    addARecipe(newRecipe){
        return $.post('/recipes', {newRecipe: newRecipe}).then((recipes)=>{
            this.recipes = recipes;
        })
    }

    getFilteredRecipesByName(recName,alergies, diets){
            let recName="name:"+recName
            let alergies="alergans:"+alergies
            let diets="diet:"+diets

            $.get(`/recipes/${recName}/${alergies}/${diets}`)
    }

    addAComment(newComment, recipeId){
        return $.post('/comments', {newComment: newComment, recipeId: recipeId}).then((recipe)=>{
        })
    }

    //these 2 functions are only for whene some one creates a recipe.
    addIng(newIng){
        this.ingredients.push(newIng)
    }

    removeIng(ingToBeRemoved){
        this.ingredients.splice(this.ingredients.indexOf(ingToBeRemoved), 1)
    }
    //when the recipe is complite and added to the data base the ingredients will be removed
    removeAllIng(){
        this.ingredients = [];
    }
}

export default RecipesRepository