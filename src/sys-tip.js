var $ = require('jquery');
var Toastr = require('toastr');
Toastr.config = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: 'toast-top-center',
    preventDuplicates: false,
    onclick: null,
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 3000,
    extendedTimeOut: 1000,
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
};

var Tip = {
    show: function (params) {
        var text = params.text;
        return Toastr.success(text, '', $.extend(Toastr.config, params));
    },
    hide: function () {
        return Toastr.remove();
    },
    success: function (text, params) {
        return Toastr.success(text, '', $.extend(Toastr.config, params));
    },
    error: function (text, params) {
        return Toastr.error(text, '', $.extend(Toastr.config, params));
    }
};


module.exports = Tip;
