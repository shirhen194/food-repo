

$.get("https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_9b5945e03f05acbf9d69625138385408&app_id=85758adc&app_key=3e6db936f012aeb14bbf9d31f821edbc&from=0&to=3")
.then((data)=>$("body").append("<div>"+data[0].label+"</div>"))