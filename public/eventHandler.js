class EventsHandler {
    constructor(recipesRepository, renderer) {
        this.recipesRepository = recipesRepository;
        this.renderer = renderer;
    }

    addRecipe() {
        //finds all the checkboxes
        let dieats = [$('#veganCreate'), $('#vegetarianCreate'), $('#high-proteinCreate'), $('#low-sugarCreate')];
        let alergies = [$('#gluten-freeCreate'), $('#dairy-freeCreate') ,$('#peanutsCreate'), $('#treenutsCreate')];
    
        //creats all the variables
        let recipe = {
            name: $('#recipeNameCreate').val(),
            img: $('#imgCreate').val(),
            ingridiant: $('#ingridiantCreate').val(),
            directions: $('#directionsCreate').val(),
            prepTime: JSON.parse($('#prepTimeCreate').val()),
            cookingTime: JSON.parse($('#cookingTimeCreate').val()),
            youtubeUrl: $('#youtubeUrlCreate').val(),
            diets: [],
            alergies: []
        }

        //adds total time to the object
        recipe.totalTime = recipe.prepTime + recipe.cookingTime

        //adds to the object only if the checkbox was checked    
        for(let i of dieats){
            if(i.prop('checked')){
                recipe.diets.push(i.val())
            }
        }
    
        for(let i of alergies){
            if(i.prop('checked')){
                recipe.alergies.push(i.val())
            }
        }
    
        this.recipesRepository.addARecipe(resipes).then(()=>{this.renderer.renderRecipes(this.recipesRepository.recipes)})
    }
    
}

export default EventsHandler