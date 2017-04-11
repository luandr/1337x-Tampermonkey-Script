// ==UserScript==
// @name         1337x.to auto downloader
// @version      1
// @author       @luandr
// @namespace    http://www.1337x.to
// @match        http://www.1337x.to/torrent/*
// ==/UserScript==

$(document).ready(function (){
    mag = $('.btn-magnet');
    mag.html('<span class="icon"><i class="flaticon-magnet"></i></span>Downloading...');
    window.open(mag.attr('href'), '_self');
});
