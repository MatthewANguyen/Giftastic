$(document).ready(function() {

    var sports = ["volleyball", "football", "basketball", "baseball", "soccer"];
    var search = "";
    function displayButtons() {
    for(var i = 0; i < sports.length; i++) {
        var newButton = $("<button>");
        newButton.text(sports[i])
            .attr("id", sports[i])
            .on("click", function() {
                $("#sports").empty();
                search = this.id;
                var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ search +"&api_key=198ada0e52ad45b6ac0db3bb03bd0649&limit=10&rating=g";
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).done(function(response) {
                    for(var x = 0; x < response.data.length; x++) {
                        var newDiv = $("<div>");
                        var image = $("<img>");
                        image.attr("src", response.data[x].images.fixed_height_still.url)
                            .attr("data-alt", response.data[x].images.fixed_height.url)
                            .on("click", function() {
                                var oldsrc = $(this).attr("src");
                                $(this).attr("src", $(this).data("alt"))
                                        .data("alt", oldsrc);
                            });
                        console.log(response.data[x].rating);
                        newDiv.addClass("gif")
                            .append($("<div>").text("Rating: " + response.data[x].rating).addClass("rating"))
                            .prepend(image);
                        $("#sports").append(newDiv);
                        };
                    }); 
                });
            $("#sports-buttons").append(newButton);
            };
        }

    $("#add-sport").on("click", function() {
        event.preventDefault();
        var newSport = $("#sport-input").val().trim();
        sports.push(newSport);
        $("#sports-buttons").empty();
        displayButtons();
        console.log(sports);
        
    });
    displayButtons();
});