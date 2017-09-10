$(document).ready(function() {

    var sports = ["volleyball", "football", "basketball", "baseball", "soccer"];
    var search = "";
    for(var i = 0; i < sports.length; i++) {
        var newButton = $("<button>");
        newButton.text(sports[i])
            .attr("id", sports[i])
            .on("click", function() {
            search = this.id;
            var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ search +"&api_key=198ada0e52ad45b6ac0db3bb03bd0649&limit=10";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                for(var x = 0; x < response.data.length; x++) {
                    console.log(response.data[x].url);
                    var image = $("<img>");
                    image.attr("src", response.data[x].images.fixed_height_still.url)
                        .attr("id", search)
                        .attr("index", x)
                        .on("click", function () {
                            // image.attr("src", response.data[x].images.fixed_height.url);
                            animateGif(image);
                        });
                    $("#sports").append(image);
                }
            });
        });
        $("#sports-buttons").append(newButton);
    };

    function animateGif(image) {
        search = image.attr("id");
        index = image.attr("index");
        console.log(search);
        console.log(image.attr("index"));
        var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ search +"&api_key=198ada0e52ad45b6ac0db3bb03bd0649&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            image.attr("src", response.data[index].images.fixed_height.url);
            $("#sports").append(image);
        });
    };
});