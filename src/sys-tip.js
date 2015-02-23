var $ = require('jquery');
var Widget = require('arale-widget');
var Sticky = require('arale-sticky');
var undef;

var ID = 'sys_global_tip';
var _config = {
    template: '<div class="alert sys-tip"><strong></strong></div>',
    top: 53
};
var Tip = Widget.extend({
    attrs: {
        template: _config.template,
        top: _config.top,
        id: {
            value: ID,
            readOnly: true
        }
    },
    events: {
        'click [data-action=close]': function (e) {
            this.hide();
            return false;
        }
    },
    initialize: function (config) {
        if (!$('#' + this.get('id'))[0]) {
            Tip.superclass.initialize.call(this, config);
        }
    },
    setup: function () {
        Tip.superclass.setup.call(this);
        Sticky.fix(this.element);
        this.timer = this.hideTimer = null;
    },
    /**
     * 显示tip
     * @param text 文本
     * @param cls 样式
     * @param pos 位置
     */
    show: function (params) {
        params = params || {};
        var that = this;
        var text = params.text; // 必须
        var timer = params.timer || 0; // 可选，默认立即显示
        var hideTimer = params.hideTimer || 3000; // 可选，默认显示后3秒后隐藏
        var cls = params.cls || 'alert-success'; // 可选，默认成功样式，错误可以设置为 alert-danger
        var pos = params.position;
        var always = params.always === true;

        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
        }

        var t = setTimeout(function () {
            that.element.children('strong:first').text(text);
            if (pos) {
                that.element.css(pos);
                if (pos.left === undef) {
                    that.element.css('left', ($(window).width() - that.element.width()) / 2);
                }
            } else {
                that.element.css({
                    left: ($(window).width() - that.element.width()) / 2,
                    top: that.get('top')
                });
            }
            that.element.removeClass().addClass('alert sys-tip ' + cls);
            that.element.show();

            that.hideTimer = setTimeout(function () {
                that.element.hide();
            }, hideTimer);
        }, timer);

        if (!always) {
            this.timer = t;
        }

        return this;
    },
    /**
     * 隐藏
     */
    hide: function (force) {
        if (this.timer || force === true) {
            clearTimeout(this.timer);
            this.timer = null;
            this.element.hide();
            if (this.hideTimer) {
                clearTimeout(this.hideTimer);
            }
        }
        return this;
    },
    /**
     * 成功消息可调用这个
     * @param text
     * @param always 是否始终显示，不受hide影响
     */
    success: function (text, always) {
        return this.show({
            text: text,
            always: always !== false
        });
    },
    /**
     * 失败消息可调用这个
     * @param text
     */
    error: function (text) {
        return this.show({
            text: text,
            cls: 'alert-danger'
        });
    }
});

var getInstance = function () {
    if (!$('#' + ID)[0]) {
        return new Tip(_config).render();
    } else {
        return Widget.query('#' + ID);
    }
};

Tip.config = function(config) {
    $.extend(_config, config);
};
Tip.show = function (params) {
    return getInstance().show(params);
};
Tip.hide = function (force) {
    return getInstance().hide(force);
};
Tip.success = function (text, always) {
    return getInstance().success(text, always);
};
Tip.error = function (text) {
    return getInstance().error(text);
};

module.exports = Tip;
