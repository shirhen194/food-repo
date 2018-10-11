class RecipesApiRepository {
    constructor() {
        this.apiRecipes = []
        this.currentRecipe = {}
    }

    getRecipesApi(url){
        return $.get(url)
    }


}

export default RecipesApiRepository