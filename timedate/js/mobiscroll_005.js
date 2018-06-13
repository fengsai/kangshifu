(function ($) {
    var rootfont=document.documentElement;
    var fontsize=parseFloat(rootfont.style.fontSize);
    var ww=210/64*fontsize;
    var hh=72/64*fontsize;
    var theme = {
        defaults: {
            dateOrder: 'Mddyy',
            mode: 'mixed',
             rows: 5,
             width: ww,
             height: hh,
            showLabel: true,
            useShortLabels: true
        }
    }

    $.mobiscroll.themes['android-ics'] = theme;
    $.mobiscroll.themes['android-ics light'] = theme;

})(jQuery);

