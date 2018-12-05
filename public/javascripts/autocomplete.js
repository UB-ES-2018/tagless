$(document).ready(function () {

    let typeahead_config = {
        hint: true,
        highlight: true,
        minLength: 1
    };

    let bloodhound_thread = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: location.protocol + '//' + document.domain + '/api_public/search/beach?key=%QUERY',
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
            return item.name;
        },
        templates: {
            header: '<h4 class="header-name">Threads</h4>',
            suggestion: function (suggestion) {
                return "<div><strong>" + suggestion.name + "</strong></div>";
            },
            pending: function () {
                return "<div>Loading...</div>"
            },
            empty: function () {
                return "¯\\_(ツ)_/¯";
            }
        }
    };
    let datasets = [];
    datasets.push(autocomplete_thread);

    $('#autocomplete').typeahead(
        typeahead_config, datasets
    );
});