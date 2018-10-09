class EventsHandler {
    constructor(recipesRepository, renderer, recipesApiRepository) {
        this.recipesRepository = recipesRepository;
        this.render = renderer;
        this.recipesApiRepository=recipesApiRepository;
    }

    ToggleIngredients() {
        $(".add-ingredients").on('click', '.toggle-comments', (event) => {
            $(".toggle-ingredients-input").toggleClass('show');
        });
    }

    sendCriterias(){    
        $(".Get-recipes").on('click',function(){
        let url="https://api.edamam.com/search?app_id=85758adc&app_key=3e6db936f012aeb14bbf9d31f821edbc&q="
        //first we take the q input! which is the recipe name:
        q=$("#recipe-input").val()
        if ( $('input[value="gluten"]').is(':checked') ) {
            url+="&Health="+gluten-free
        } 
        if ( $('input[value="tree-nut"]').is(':checked') ) {
            url+="&Health="+tree-nut-free
        } 
        if ( $('input[value="peanuts"]').is(':checked') ) {
            url+="&Health="+peanut-free	
        } 
        if ( $('input[value="dairy"]').is(':checked') ) {
            url+="&Health="+dairy-free	
        } 
        if ( $('input[value="vegan"]').is(':checked') ) {
            url+="&Health="+vegan
        } 
        if ( $('input[value="vegetarian"]').is(':checked') ) {
            url+="&health="+vegetarian
        } 
        if ( $('input[value="high-protein"]').is(':checked') ) {
            url+="&Diet="+high-protein
        } 
        if ( $('input[value="low-sugar"]').is(':checked') ) {
            url+="&Health="+low-sugar	
        }

        let ingredients=$(".toggle-ingredients-input").val()

        //חפשי במרכיבים אם יש משהו שמכיל את מה שצריך
        this.recipesApiRepository.getRecipesApi(url).then((recipeis)=> {})
    })}



}

export default EventsHandler