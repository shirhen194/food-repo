class Renderer {
    constructor() {
      this.$recipe = $('.recipe')
      this.$recipes = $('.recipes')
      this.$recipesApi = $('.recipesApi')

    }

    renderRecipe(recipe){        
        this.$recipe.empty();
            
        const source = $('#recipe-template').html();
        const template = Handlebars.compile(source)
        const newHTML = template(recipe);
        this.$recipe.append(newHTML);
        console.log(recipe)
    }

    renderRecipesfromDb(recipes){
        this.$recipes.empty();
            
        const source = $('#recipes-template').html();
        const template = Handlebars.compile(source)
        const newHTML = template(recipes);
        this.$recipes.append(newHTML);
    }

    renderRecipesFromApi(recipes){
        this.$recipesApi.empty();
            
        const source = $('#recipesApi-template').html();
        const template = Handlebars.compile(source)
        const newHTML = template(recipes);
        this.$recipesApi.append(newHTML);
    }

    renderIngToCreatingForm(ings){
        $('#ingredients').empty();

        const source = $('#ingrediant-template').html();
        const template = Handlebars.compile(source)
        const newHTML = template({ings});
        $('#ingredients').append(newHTML);
    }
}

export default Renderer