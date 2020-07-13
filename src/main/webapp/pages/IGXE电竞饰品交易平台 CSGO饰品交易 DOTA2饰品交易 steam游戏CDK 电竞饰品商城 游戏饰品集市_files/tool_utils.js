//将form对象转成json
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a,
    function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
var tool_util = {
    "genUrl": function (url, params) {
        var new_params = {};
        for (var key in params) {
            if (params[key]) {
                new_params[key] = params[key]
            }
        }
        return url + '?' + jQuery.param(new_params)
    }
}
$(function() {
    $("body").on('focus',"input[type='password']", function () {
        $(this).removeAttr("readonly");
    });
});