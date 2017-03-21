'use strict';

function searchArticles() {
  var searchString = $("#search").val();
  $.ajax( {
      url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + searchString + '&format=json',
//       data: {
//         "action": "query",
//         "list": "search",
//         "format": "json",
//         "prop": "info",
      //   "srsearch": searchString
      // },
      dataType: 'json',
      // type: 'POST',
      // headers: { 'Api-User-Agent': 'wiki-viewer/1.0' },
      success: function(data) {
         var html = '<div class="card-columns">';

         for (var i = 0; i < data.search.length; i++) {
           html += makeArticleCard({
             "title": data.search[i].title,
             "snippet": data.search[i].snippet
           });
         }

         html += '</div>';
         $("#searchResults").text() = html;
      }
  } );
}

function makeArticleCard(article) {
    var html = '<div class="card"><div class="card-block"><h4 class="card-title">';
    html += article.title;
    html += '</h4><p class="card-text">';
    html += article.snippet;
    html += '</p></div></div>'
    return html;

}

function init() {
    $("#search").on("search", searchArticles);
}


$(document).ready(function() {
    init();
});
