class Renderer {
    constructor() {
      this.$recipes = $('.recipes')
    }

    renderRecipes(recipes){        
        this.$recipes.empty();
            
        const source = $('#recipe-template').html();
        const template = Handlebars.compile(source)
        const newHTML = template({recipes});
        this.$recipes.append(newHTML);
    }

    renderIngToCreatingForm(ings){
        $('#ingridients').empty();

        const source = $('#ingrediant-template').html();
        const template = Handlebars.compile(source)
        const newHTML = template({ings});
        $('#ingridients').append(newHTML);
    }
}

export default Renderer