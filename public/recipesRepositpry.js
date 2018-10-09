class RecipesRepository {
    constructor() {
        this.recipes = []
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

    addAComment(newComment){
        return $.post('/comments', {newComment: newComment}).then((recipes)=>{
            this.recipes = recipes;
        })
    }
}

export default RecipesRepository