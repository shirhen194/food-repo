
// $.get("https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_9b5945e03f05acbf9d69625138385408&app_id=85758adc&app_key=3e6db936f012aeb14bbf9d31f821edbc&from=0&to=3")
// .then((data)=>$("body").append("<div>"+data[0].label+"</div>"))
import EventsHandler from './eventHandler.js';
import RecipesRepository from './RecipesRepository.js';
import Renderer from './renderer.js';
import RecipesApiRepository from './recepies-api-repository.js';

let recipesRepository = new RecipesRepository();
let recipesApiRepository = new RecipesApiRepository();
let renderer = new Renderer();
let eventsHandler = new EventsHandler(recipesRepository, renderer, recipesApiRepository);

eventsHandler.handleRemovecomment()
eventsHandler.handleRemoveRecipe()
eventsHandler.handleAddAComment()
eventsHandler.ToggleIngredients();
eventsHandler.addRecipe();
eventsHandler.addIngWhileCreatingRecipe()
eventsHandler.removeIngWhileCreatingRecipe()
// eventsHandler.getRecipies()