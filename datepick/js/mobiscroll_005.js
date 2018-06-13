(function ($) {
    var s1=window.innerWidth;
    var bili=70;

    var s=70/320;

    var theme = {
        defaults: {
            dateOrder: 'Mddyy',
            mode: 'mixed',
            rows: 5,
            width: s1*s,
            height: 36,
            showLabel: true,
            useShortLabels: true
        }
    }

    $.mobiscroll.themes['android-ics'] = theme;
    $.mobiscroll.themes['android-ics light'] = theme;

})(jQuery);

