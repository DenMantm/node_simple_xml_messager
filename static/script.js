var userName;
    var loadPage = function(url,div){
    $.ajax({url: url, success: function(result){
        $(div).html(result);
    }});
};

