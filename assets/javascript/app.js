var topics = ["Nature", "Fire","Water", "Wood", "Metal", "Food & Drink", "Cookies", "Cakes", "Decoration", "Reactions", "Happy", "Sad", "Science", "Decades", "60's", "70's", "80's", "90's"]

function displayTopics(){
	var maxTopics = 10;
	var selTopic = $(this).attr("data-name");		
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + selTopic + "&limit=" +maxTopics+ "&api_key=dc6zaTOxFJmzC";
	$.ajax({
	  url: queryURL,
	  method: 'GET'
	}).done(function(response) {
		for (var i = 0; i < response.data.length; i++) {
			var topicDiv = $("<div class='d-topic  col-md-4'>");
			//response.length
			var rating = response.data[i].rating;

			var pRate = $("<p>").text("Rating: " + rating);

			topicDiv.append(pRate);

			var imageurlstill = response.data[i].images.original_still.url;
			var imageurlanimated = response.data[i].images.original.url;

			var image = $('<img>')
			.attr("src", imageurlstill)
			.attr("data-state", "still")
			.attr("data-animated", imageurlanimated)
			.attr("data-still", imageurlstill).addClass('gif');

			topicDiv.append(image);
			$("#divApiImages").prepend(topicDiv);
			
		}


 		$(".gif").on("click", function(){
			var s = $(this).attr("data-state");	
			if (s === "still") {
				var currentUrl = $(this).attr("src");
				$(this).attr("src", $(this).data("animated"));
				$(this).attr("data-state", "animate");
				
			} else {
				var currentUrl = $(this).attr("src");
				$(this).attr("src", $(this).data("still"));
				$(this).attr("data-state", "still");
	

		  }
    	});
	});//end ajax function
}


function createButtons(){
	$("#divApiButtons").empty();
	for (var i = 0; i < topics.length; i++) {
		var b = $("<button>");
		b.addClass("topic-class btn btn-primary");
		b.attr("data-name", topics[i]);
		b.text(topics[i]);
		$("#divApiButtons").append(b);
	}
}//end function create buttons


$(document).ready(function(){
	$("#add-topic").on("click", function(event){
		//prevent from to refresh
		event.preventDefault();
		//we grab the info from the text box and remove 
		//any blank spaces before and after the initital 
		//and final words
		var	topic = $("#topic-input").val().trim();
		//Add the new topic in our topic array
		topics.push(topic);
		//recreate the buttons
		createButtons()
  	})//end add topic on click function

     
    $(document).on("click", ".topic-class", displayTopics);
	

	createButtons();
 


});//End document ready function