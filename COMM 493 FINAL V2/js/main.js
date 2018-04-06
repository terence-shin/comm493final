/*
handle the submission of the analyze comment form
when the button with th eid 'analyze_text' is clicked, this code will run
*/

$("#analyze_text").on("click", function(){
    // take the contents of the textarea with the ID comment_query and assign it to the comment_text var
    var comment_text = $("#comment_query").val();
    //validate that the comment_text is not emtpy; if it is, then return false to quit the submission immediately
    if (comment_text.length <= 0) return false;
    // the comment appears to be present; we will send the ajax request here
    $.ajax( {
        url: 'analyze',
        method: 'POST',
        data: {'text': comment_text},
        beforeSend: function() {
            // this code will run b4 the request is sent to our python code
            // w'll simply display some "loading" objects
            $("#loader").fadeIn();
        },
        success: function(response) {
            $("#loader").fadeOut();
            // this code will trigger after the response is returned from the python code,
            // in here we'll display th eresponse in the manner that we decide
            // the classes will be returned a 'classes' property on the response object
            // all 6 classes will be present (index 0...5) along with a corresponding confidence
            // the confidence scores will sum to ~1 (probability)
            // for now we'll simply append the results the body in a results list
            // for now, simply 'alert' the response so that we can ensure it is working.
            $("#results").html(""); // this removes any current txt in the list w/ id "results"
            $("result_text").html(""); // removes any current txt in the result "result_text" container

            // add the main sentence to the "reuslt_text" container
            $("#result_text").html("<p>Watson is <span class='confidence'>"+ // add the main reuslt txt line
                                    (response['classes'][0]['confidence']*100).toFixed(2)+  // generate % confience
                                    "%</span> confident that this comment is: <span clas='class_name'>"+
                                    response['classes'][0]['class_name']+ // add the class name
                                    "</span></p>");

            // add the full prediction set to the list
            response['classes'].forEach(function(element, index) {
                // this loops through each of the class ele
                // index is the number 0...5 that corresponds to the given class
                $("#results").append(
                    "<a class='list-group-item' href='#'>"+ // add a list item anchor tag to the list
                        element['class_name']+ // include the txt of the class name
                        " ("+
                            (element['confidence']*100).toFixed(2)+
                        "%)</a>");
            });

            // scroll the page to the top of the holder so that the user can see the results immediately
            $(window).scrollTop($("#results").offset().top);
        }
    });
    // return false prevents the default behavior from engaging 
    return false;
});
