(function(window) {

    var _this,
        content,
        topHeader,
        logo,
        mainNavigation,
        pageFooter,
        social,
        welcome,
        portfolio,
        contact,
        resume;

    function Site() {}

    Site.prototype.init = function() {
        _this = this;
        cacheSelectors();

        // set up routes
        crossroads.addRoute('welcome');
        crossroads.addRoute('portfolio');
        crossroads.addRoute('portfolio/{slug}', portfolioRoute);
        crossroads.addRoute('contact');
        crossroads.addRoute('resume');

        // set up Hasher
        hasher.changed.add(handleHasher);
        hasher.initialized.add(handleHasher);
        hasher.init();

        // Animate in header and footer
        TweenMax.to(topHeader, 0.5, { top : '0px', ease : Power1.easeOut } );
        TweenMax.to(pageFooter, 0.5, { bottom : '0px', ease : Power1.easeOut } );

        // Click on main nav items
        mainNavigation.find('a').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var path = $(this).attr('href');
            hasher.setHash(path);
        });

        // mouse enter on main nav items
        mainNavigation.find('a').on('mouseenter', function() {
            var prog = $(this).next().find('.prog');
            TweenMax.to(prog, 0.5, { width : '100%', ease : Expo.easeOut } );
        });

        // mouse leave on main nav items
        mainNavigation.find('a').on('mouseleave', function() {
            var prog = $(this).next().find('.prog');
            TweenMax.to(prog, 0.5, { width : '15%', ease : Expo.easeOut } );
        });

        // Click on logo. Same as "Home" click
        logo.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mainNavigation.find('a').first().click();
        });

        // all around links, this can't happen on the social feed
        $('a[href^="http"]').on('click', function() {
            if (!$(this).hasClass('social-link')) {
                window.open($(this).attr('href'), '_blank');
            }
        });
    };

    /**
     * Add "selected" class to requested nav item
     */
    var updateNavigation = function(section) {
        mainNavigation.find('li').removeClass('selected');

        mainNavigation.find('a').each(function() {
            var path = $(this).attr('href');

            if (path === section) {
                $(this).parent().addClass('selected');
            }
        });
    };

    /**
     * Handle page deep links
     * Portfolio case: hide a work (if shown) if you hit the "back" button
     * Default case: send me to the welcome page if it's not a portfolio/portfolio work
     */
    var handleHasher = function(newHash) {
        crossroads.parse(newHash);

        switch(newHash) {
            case '' :
            case 'welcome' :
            case 'welcome/' :
                switchSection('welcome');
                updateNavigation('welcome');
                break;

            case 'portfolio' :
            case 'portfolio/' :
                if (!$('#portfolio').hasClass('viewedSection')) {
                    switchSection('portfolio');
                    updateNavigation('portfolio');
                } else {
                    topHeader.click();
                }

                break;

            case 'contact' :
            case 'contact/' :
                switchSection('contact');
                updateNavigation('contact');
                break;

            case 'resume' :
            case 'resume/' :
                switchSection('resume');
                updateNavigation('resume');
                break;

            default :
                if (newHash.indexOf('portfolio') === -1) {
                    switchSection('welcome');
                    updateNavigation('welcome');
                } else {
                    if (!/portfolio\/./.test(newHash)) {
                        switchSection('welcome');
                        updateNavigation('welcome');
                    }
                }
        }
    };

    /**
     * Deep links on portfolio section
     * If you go to a work route directly, call the portfolio section manually
     */
    var portfolioRoute = function(id) {
        if (!$('#portfolio').hasClass('viewedSection')) {
            loadSection('portfolio');
            updateNavigation('portfolio');
        }

        var workData = portfolio.getWorkData(id);

        if (workData !== undefined) {
            portfolio.showWork(workData);
        }
    };

    /**
     * Fadeout any section that is currently being shown.
     * Show the requested one.
     */
    var switchSection = function(section) {
        var viewedSection = $('.viewedSection');

        if (viewedSection.length !== 0) {
            viewedSection.fadeOut('slow', function() {
                viewedSection.removeClass('viewedSection');
                loadSection(section);
            });
        }

        /**
        * First time visiting the page, no section to hide.
        * Little delay before the section starts, so the header/footer animation finishes
        */
        else {
            setTimeout(function() {
                loadSection(section);
            }, 400);
        }
    };

    /**
     * Call the requested section
     */
    var loadSection = function(section) {
        content.find('#' + section).show();

        switch (section) {
            case 'welcome' :
                welcome = new Welcome();
                welcome.init();
                break;

            case 'portfolio' :
                portfolio = new Portfolio();
                portfolio.init();
                break;

            case 'contact' :
                contact = new Contact();
                contact.init();
                break;

            case 'resume' :
                resume = new Resume();
                resume.init();
                break;
        }
    };

    /**
     * Selectors
     */
    var cacheSelectors = function() {
        content = $('#content');
        topHeader = $('#topheader');
        logo = $('#logo');
        mainNavigation = $('#main_nav');
        pageFooter = $('#pagefooter');
    };

    window.Site = Site;

}(window));
