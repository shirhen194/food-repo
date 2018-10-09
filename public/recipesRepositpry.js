class RecipesRepository {
    constructor() {
        this.recipes = []
        this.currentRecipe = {}
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

    addAComment(newComment, recipeId){
        return $.post('/comments', {newComment: newComment, recipeId: recipeId}).then((recipe)=>{
            this.currentRecipe = recipe;
        })
    }
}

export default RecipesRepository