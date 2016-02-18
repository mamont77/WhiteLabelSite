(function () {

    /********************************** 
    CONFIGURATION AND CUSTOMISATION
    YOU SHOULD READ THE README.txt FILE BEFORE CONFIGURING YOUR WHITE LABEL SITE
    **********************************/

    //var apiKey = '6f7a1c66-1a06-4059-b7f4-7df5f252330b';
    //var apiKey = 'e7d540bb-5bb7-4892-9801-ed6d906eea07';
    /**
     * Name: Ruslan Piskarev
     Organisation: Southern Grampians Australia
     Email: ruslan.piskarev@gmail.com
     API Key: 82b2df29-9e8a-4a55-86e3-62eda60da18a
     WLS Domain: http://www.visitgreaterhamilton.com.au/
     */
    var apiKey = '82b2df29-9e8a-4a55-86e3-62eda60da18a';
    //var apiKey = 'a2b551a9-853a-4dd3-9de2-9ce1ae94746d'; //from http://www.outandaboutwinetours.com.au/whitelabel/whitelabel.js

    var urlBase = 'http://www.visitgreaterhamilton.com.au/WhiteLabelSite/';
    var searchURL = 'search.htm';
    var eventURL = 'event.htm';

    var locations = {};
    locations.postcodes = [];
    locations.councils = ['SGRA'];
    locations.regions = [];

    var usernames = [];
    
    var categories = [];

    var defaultDateRange = "All";

    var eventSettings = {};

    var searchIOSettings = {};

    var searchSettings = {};

    /********************************** 
    END OF CONFIGURATION SECTION
    ********************************** /

    /********************************** 
    ADVANCED USERS ONLY BELOW THIS LINE
    **********************************/

    var web_service_url = 'http://www.eventsvictoria.com';

    //var wlsDir = web_service_url + '/Scripts/atdw-dist-min/V1.1/wls/';
    var wlsDir = web_service_url + '/Scripts/atdw-distribution/V1-1/';

    function main() {

        var s = document.createElement('script');
        s.setAttribute("type", "text/javascript");
        s.setAttribute("src", wlsDir + 'wls.js');
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(s);

        if (s.readyState) {
            s.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    configure();
                }
            };
        } else { // Other browsers
            s.onload = configure;
        }
    };

    function configure() {
        window.atdw.myevents.distribution.setBaseUrl(web_service_url);

        if (isSearchPage()) {

            window.atdw.myevents.search.settings.apiKey = apiKey;
            window.atdw.myevents.search.setBaseUrl(web_service_url);
            window.atdw.myevents.search.settings.locations = locations;
            window.atdw.myevents.search.settings.eventPageURL = urlBase + eventURL;

            searchSettings.defaultDateRange = defaultDateRange;
            searchSettings.username = usernames;
            searchSettings.categories = categories;

            window.atdw.myevents.search.start(searchIOSettings, searchSettings);
        } else if (isEventPage()) {

            window.atdw.myevents.event.apiKey = apiKey;
            window.atdw.myevents.event.setBaseUrl(web_service_url);
            window.atdw.myevents.event.searchPageURL = urlBase + searchURL;

            eventSettings.defaultDateRange = defaultDateRange;

            window.atdw.myevents.event.start(eventSettings);
        }

        // remove this script from the head
        $('script').filter(function () { return $(this).attr('src').indexOf('whitelabel.js') > -1; }).remove();
    };

    function isEventPage() {
        return window.location.pathname.indexOf(eventURL) > -1;
    };
    function isSearchPage() {
        return !isEventPage();
    };

    main();

})();
