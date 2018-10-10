class Renderer {
    constructor() {
      this.$recipe = $('.recipe')
    }

    renderRecipe(recipe){        
        this.$recipe.empty();
            
        const source = $('#recipe-template').html();
        const template = Handlebars.compile(source)
        const newHTML = template(recipe);
        this.$recipe.append(newHTML);
        console.log(recipe)
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