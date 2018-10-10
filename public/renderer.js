class Renderer {
    constructor() {
      this.$recipes = $('.recipes')
    }

    renderRecipes(recipes){        
        this.$recipes.empty();
            
        const source = $('#recipe-template').html();
        const template = Handlebars.compile(source)
        const newHTML = template(recipes);
        this.$recipes.append(newHTML);
        console.log(recipes)
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