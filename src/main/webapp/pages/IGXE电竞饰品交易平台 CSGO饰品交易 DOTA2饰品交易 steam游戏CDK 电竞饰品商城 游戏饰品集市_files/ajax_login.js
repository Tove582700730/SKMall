var AjaxLogin = {
    //ajax判断是否已经登录
    "is_login": function (path) {
        var is_login = $('#is_login').val();
        if (is_login == 0) {
            var url = '/login/';
            if (path) {
                url = url + '?next=' + path;
            }else {
                url = url + '?next=' + window.location.pathname;
            }
            window.location.href = url;
            return false;
        }
        return true;
    },
    "is_login_box":function(flag){
        var is_login = $('#is_login').val()
        if(is_login == 0 && flag){
            layer.open({
                type: 1,
                title: false,
                content: $('#js-sign-by-steam'),
                area: ['750px', 'auto']
            });
            return false;
        }
        return true;
    }
}
