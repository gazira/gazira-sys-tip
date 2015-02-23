var $ = require('jquery');
var Tip = require('gazira-sys-tip');
Tip.config({
    top: 20
});

$('#btn1').click(function() {
    Tip.success('hello');
});

$('#btn2').click(function() {
    Tip.error('error: sunny day');
});
