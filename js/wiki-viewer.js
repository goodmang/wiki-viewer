'use strict';

// $.ajax({
//   url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchTerm + "&limit=20&callback=?",
//   method: "GET",
//   dataType: "jsonp",
//   success: function(data) {
//     $("#output").html(""); // clears out contents from earlier searches
//     $("#output").append("<h5>Click to open in Wikipedia:</h5>")
//     for (var i = 0; i < data[1].length; i++) {
//       $("#output").append("<a href='" + data[3][i] + "' target='_blank'><div class='card horizontal hoverable'><div class='row'><div id='image" + i + "' class='card-image col s3 valign-wrapper'></div><div class='card-stacked col s9'><div class='card-content'><span class='card-title truncate'>" + data[1][i] + "</span><p>" + data[2][i] + "&nbsp;</p></div></div></div></div></a>");
//     }


function searchArticlesV2() {
    var searchString = $("#search").val();
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchString + "&limit=20&callback=?",
        // data: {
            // "action": "opensearch",
            // "format": "json",
            // "prop": "info",
            // "list": "search",
            // "meta": "",
            // "formatversion": "2",
            // "origin": "*",
            // "srsearch": searchString
        // },
        dataType: 'json',
        method: "GET",
        success: function(result) {

            var html = '';

            for (var i = 0; i < result[1].length; i++) {
                html += makeArticleCard({
                    title: result[1][i],
                    snippet: result[2][i],
                    link: result[3][i]
                });
            }

            var elem = document.getElementById('searchResults');
            elem.innerHTML = html;
        },
        error: function(textStatus, errorThrown) {
            console.log('Error:');
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}


function searchArticles() {
    var searchString = $("#search").val();
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&list=&meta=&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=300&pilimit=10&wbptterms=description&gpslimit=10&gpssearch=' + encodeURI(searchString + "&origin=*"),
        //     url: 'https://en.wikipedia.org/w/api.php',
        //     data: {
        //     //   action: "query",
        //     //   // formatversion: 2,
        //     //   list: "search",
        //     //   format: "json",
        //     //   prop: "info",
        //     //   srsearch: searchString
        //     "action": "query",
        //     "format": "json",
        //     "prop": "pageimages|pageterms",
        //     "generator": "prefixsearch",
        //     "redirects": 1,
        //     "formatversion": "2",
        //     "piprop": "thumbnail",
        //     "pithumbsize": "300",
        //     "pilimit": "10",
        //     "wbptterms": "description",
        //     "gpssearch": searchString,
        //     "origin": "*",
        //     "gpslimit": "10"
        // },
        dataType: 'json',
        method: "GET",
        success: function(result) {
            var html = '';
            var snippetStr;

            for (var i = 0; i < result.query.pages.length; i++) {
                snippetStr = undefined;
                if (result.query.pages[i].hasOwnProperty("terms")) {
                    if (result.query.pages[i].terms.hasOwnProperty("description")) {
                        snippetStr = result.query.pages[i].terms.description
                    }
                }
                html += makeArticleCard({
                    title: result.query.pages[i].title,
                    snippet: snippetStr,
                    image: (result.query.pages[i].hasOwnProperty("thumbnail")) ? result.query.pages[i].thumbnail.source : undefined
                });
            }

            var elem = document.getElementById('searchResults');
            elem.innerHTML = html;
        },
        error: function(textStatus, errorThrown) {
            console.log('Error:');
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function createLink(title) {
    // Creates a link to the article based on the title
    return "https://en.wikipedia.org/wiki/" + encodeURI(title);
}

function makeArticleCard(article) {
    var html = '<div class="card article">';

    // if (article.image) {
    //     html += '<img class="card-img-top img-fluid" src="' + article.image + '" alt="Image of ' + article.title + '">';
    // }
    html += '<div class="card-block">';
    html += '<h4 class="card-title">' + article.title + '</h4>';
    if (article.snippet) {
        html += '<p class="card-text">' + article.snippet + '</p>';
    }
    html += '<a href="' + createLink(article.title) + '" class="card-link">Read Article</a>';
    html += '</div></div>'
    return html;
}


$(document).ready(function() {
    $("#search").on("search", searchArticlesV2);
});
