var $ = require('jquery');
var Tip = require('gazira-sys-tip');

$('#btn1').click(function() {
    Tip.success('hello');
});

$('#btn2').click(function() {
    Tip.error('error: sunny day');
});
