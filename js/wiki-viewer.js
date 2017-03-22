'use strict';


function searchArticlesV2() {
    var searchString = $("#search").val();
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        data: {
            "action": "query",
            "format": "json",
            "prop": "info",
            "list": "search",
            "meta": "",
            "formatversion": "2",
            "origin": "*",
            "srsearch": searchString
        },
        dataType: 'json',
        method: "GET",
        success: function(result) {

            var html = '';
            var snippetStr;

            for (var i = 0; i < result.query.search.length; i++) {
                snippetStr = undefined;
                if (result.query.search[i].hasOwnProperty("snippet")) {
                    snippetStr = result.query.search[i].snippet
                }
                html += makeArticleCard({
                    title: result.query.search[i].title,
                    snippet: snippetStr,
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
