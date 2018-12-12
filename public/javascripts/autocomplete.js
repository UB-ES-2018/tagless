$(document).ready(function () {

    let typeahead_config = {
        hint: true,
        highlight: true,
        minLength: 3
    };

    let bloodhound_thread = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: '/search/thread_title?phrase=%QUERY',
            wildcard: '%QUERY',
            transform: function (response) {
                /** something **/
                return response;
            }
        }
    });

    let autocomplete_thread = {
        name: 'thread',
        source: bloodhound_thread,
        display: function (item) {
            return item._source.title;
        },
        templates: {
            header: '<h4 class="header-name">Threads</h4>',
            suggestion: function (suggestion) {
                return "<div><strong>" + suggestion._source.title + "</strong></div>";
            },
            pending: function () {
                return "<div>Searching...</div>"
            },
            empty: function () {
                return "No results found";
            }
        }
    };
    let datasets = [];
    datasets.push(autocomplete_thread);

    $('#autocomplete').typeahead(
        typeahead_config, datasets
    ).on("typeahead:select", function (e, datum) {
        window.location.href = "/c/"+ datum._source.comunityName +"/" + datum._source.id + "/comments";
    });
});