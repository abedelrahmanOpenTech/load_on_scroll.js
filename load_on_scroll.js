function load_on_scroll(options = {}) {

    if (options.target == undefined) {
        options.target = window;
    }
    if (options.method == undefined) {
        options.method = "post";
    }
    if (options.data == undefined) {
        options.data = {};
    }

    if (options.data.page == undefined) {
        options.data.page = 1;
    }

    if (options.offset == undefined) {
        options.offset = 20;
    }

    var xhr;
    function load(options = {}) {
        if (xhr != null) {
            xhr.abort();
        }
        xhr = $.ajax({
            type: options.method,
            url: options.url,
            data: options.data,
            success: function (response) {
                if (options.success != undefined) {
                    options.success(response);
                }
            },
            error: function (response) {
                if (options.error != undefined) {
                    options.error(response)
                }
            },
            complete: function (response) {
                if (options.complete != undefined) {
                    options.complete()
                }
            }
        });
    }

    load(options);
    var $element = $(options.target);
    $element.off("scroll").scroll(function () {
        var is_window = (options.target === window);
        var scroll_top = $(this).scrollTop();
        var div_height = $(this).height();
        var scroll_height = is_window ? $(document).height() : $(this).prop('scrollHeight');
        if (is_window && (scroll_top + div_height+options.offset >= scroll_height)) {
            options.data.page++;
            load(options);
        } else if (!is_window && (scroll_top + div_height+options.offset >= scroll_height)) {
            options.data.page++;
            load(options);
        }

    });





}