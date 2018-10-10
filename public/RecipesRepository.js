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
            console.log(newRecipe)
            console.log(recipe)
        })
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
        for(let i of this.ingredients){
            if(i.name == ingToBeRemoved.name && i.portion == ingToBeRemoved.portion){
                this.ingredients.splice(this.ingredients.indexOf(i), 1)
            }    
        }
    }
    //when the recipe is complite and added to the data base the ingredients will be removed
    removeAllIng(){
        this.ingredients = [];
    }
}

export default RecipesRepository