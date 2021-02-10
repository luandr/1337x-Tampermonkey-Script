// ==UserScript==
// @name         1337 Search Generator + Subtitle Generator for TVTime
// @version      1.1
// @description  this script create a href element inside www.tvtime.com to access subtitle website for each episode directly in www.legendario.org
// @author       github.com/luandr | gitlab.com/luandr
// @match        https://www.tvtime.com/*
// @require https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function () {
    'use strict';
    /* global $ */
    String.prototype.replaceArray = function (find, replace) {
        let replaceString = this;
        for (let i = 0; i < find.length; i++) {
            replaceString = replaceString.replace(new RegExp(find[i], 'g'), replace[i]);
        }
        return replaceString;
    };
    String.prototype.simplyReplace = function(find, replace){
        let replaceString = this;
        for (let i = 0; i < find.length; i++) {
            replaceString = replaceString.replace(find[i], replace[i]);
        }
        return replaceString;
    };
    const blacklist = ['Churchill\'s Secret Agents: The New Recruits']
    const replaceArray = ["S.H.I.E.L.D.", "& ", " ", "\'"];
    const replaceArrayValue = ["s-h-i-e-l-d", "", "-", "-"];
    const replaceFixQuotelArray = ["marvel-s", "dc-s"];
    const replaceFixQuoteValue = ["marvels", "dcs"];
    const replaceSimplyArray = ['-(2014)'];
    const replaceSimplyValue = [''];
    const quality = '1080p'; // Change here you quality preference or make null for full search
    // You can add search params on above field by separating spaces using "+". (e.g. 720p+SVA+eztv)
    // More parameters = accurate searches (less content)
    $('#to-watch > ul > li > .episode-details').each((i, obj) => {
        let episodio = /(S\d{2}E\d{2})/g.exec($(obj).find('h2').text())[1].toLowerCase();
        const nomeSerie = $(obj).find('a:nth-child(2)');
        let serie = nomeSerie.text().replace(/(S\d{2}E\d{2})/g, "");
        console.info(serie);
        if (blacklist.indexOf(serie) < 0) {
            serie = serie.replaceArray(replaceArray, replaceArrayValue).toLowerCase();
            console.info(serie);
            const serieTorrent = serie.replaceArray(replaceFixQuotelArray, replaceFixQuoteValue); // Adjust for search the torrent
            serie = serie.simplyReplace(replaceSimplyArray, replaceSimplyValue); // Adjust for search the subtitle
            nomeSerie.text(nomeSerie.text().substring(0, 26)); //Line wrap cuz disappears the torrent link if is a big name
            $(obj).find('a:nth-child(2)').parent().css('height', 64).append(`<br><a href="https://solegendas.net/${serie}-${episodio}" class="secondary-link" target="_blank">Legenda</a>`)
                .append(`<br><a href="https://www.1337x.to/search/${serieTorrent}+${episodio}+${quality}/1/" target="_blank" class="secondary-link">Procurar Torrent</a>`);
        }
    })
})();
