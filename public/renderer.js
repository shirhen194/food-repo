class Renderer {
    constructor() {
     
    }

    renderRecipes(recipes){
        
            $('#recipes').empty();
            
            const source = $('#recipe-template').html();
            const template = Handlebars.compile(source)
            const newHTML = template({recipes});
            $('#recipes').append(newHTML);
        
    }
}

export default Renderer