$(document).ready(function () {
    $('#search_handler').on('click', function (e) {
        $(this).hide();
        $('#wiki_form').fadeIn('slow');
        $('#query').focus();
        e.preventDefault();
    });
    $('#wiki_form').submit(function (e) {
        var q = $('#query').val();
        var remoteUrlWithOrigin = 'https://en.wikipedia.org/w/api.php';
        queryData = '?action=query&format=json&gsrlimit=15&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&generator=search&origin=*&gsrsearch=' + encodeURIComponent(q);
        var url = remoteUrlWithOrigin + queryData;
        console.log(url);
        $('#wiki_result').html('');
        $.getJSON(url, fetchWikiData);
        e.preventDefault();
    });
});

function fetchWikiData(wiki) {
    if (wiki.hasOwnProperty('query')) $('#search_result').css('background', '#4c4c4c').html('<h4>Top ' + Object.keys(wiki.query.pages).length + ' search results for "' + $('#query').val() + '"</h4>');
    else $('#search_result').css('background', '#4c4c4c').html('<h4>Search result not found</h4>');
    $.each(wiki, function (index, value) {
        $.each(value.pages, function (index, data) {
            $('#wiki_result').append(showWikiData(data));
        })
    });
}

function showWikiData(data) {
    var html = '<a href="https://en.wikipedia.org/?curid=' + data.pageid + '" target="_blank"><div id="pageid_' + data.pageid + '" class="wiki-container">';
    html += '<h4>' + data.title + '</h4>';
    if (data.thumbnail) {
        html += '<p><img class="img-thumbnail rounded" src="' + data.thumbnail.source + '" alt="Thumbnail" width="' + data.thumbnail.width + '" height="' + data.thumbnail.height + '">' + data.extract + '</p>';
    }
    else {
        html += '<p>' + data.extract + '</p>'
    }
    html += '</div></a>';
    return html;
}