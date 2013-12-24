(function(window) {

    // all areas
    var resume,
        overview,
        specialties,
        experience,
        up_arrow,
        down_arrow,

        // all logic
        sections = [],

        // overview area
        overviewTitle,
        johnCircle,

        // experience area
        experienceTitle,
        pastExperience1,
        pastExperience2,

        // Specialties area
        specialtiesTitle,
        skillsRow1,
        skillsRow2,
        width = 96,
        height = 96,
        speed = 1.6,
        centerX = width * 0.5,
        doublePI = Math.PI * 2,
        halfPI = Math.PI / 2,

        // specialties circles
        circles = [
            { id : 'html5_circle', color : '#f16529', startPercent : 0, endPercent : 99.2, paper : null },
            { id : 'css3_circle', color : '#2c92d6', startPercent : 0, endPercent : 99.2, paper : null },
            { id : 'js_circle', color : '#ff006c', startPercent : 0, endPercent : 99.2, paper : null },
            { id : 'as3_circle', color : '#80ad3b', startPercent : 0, endPercent : 99.2, paper : null },
            { id : 'fl_circle', color : '#e3030c', startPercent : 0, endPercent : 99.2, paper : null },
            { id : 'php_circle', color : '#566fd8', startPercent : 0, endPercent : 99.2, paper : null },
            { id : 'mysql_circle', color : '#0784aa', startPercent : 0, endPercent : 99.2, paper : null }
        ];

    function Resume() { }

    Resume.prototype.init = function() {
        cacheSelectors();
        resume.addClass('viewedSection');

        sections = [overview, specialties, experience];

        up_arrow.on('click', upArrowClicked);
        down_arrow.on('click', downArrowClicked);

        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            section.removeClass('current_view');
            section.hide();
        }

        initOverview();
    };

    /**
     * Click on arrows
     */
    var upArrowClicked = function(e) {
        e.preventDefault();

        var currentSection,
            prevSection;

        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];

            if (TweenMax.isTweening(section)) {
                return false;
            }

            if (section.hasClass('current_view')) {
                currentSection = section;

                if (i === 0) {
                    prevSection = sections[sections.length - 1];
                } else {
                    prevSection = sections[i - 1];
                }
            }
        }

        currentSection.removeClass('current_view');

        prevSection.css( { top : '-50%' } );
        prevSection.addClass('current_view');
        prevSection.show();

        TweenMax.to(currentSection, 1, { top : '150%', opacity : 0, ease : Expo.easeOut } );
        TweenMax.to(prevSection, 1, { top : '50%', opacity : 1, ease : Expo.easeOut } );

        switch (prevSection.attr('id')) {
            case 'overview' :
                startOverview(true);
                resetCircles();
                break;

            case 'specialties' :
                startSpecialties(true);
                break;

            case 'experience' :
                startExperience(true);
                resetCircles();
                break;
        }
    };

    var downArrowClicked = function(e) {
        e.preventDefault();

        var currentSection,
            nextSection;

        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];

            if (TweenMax.isTweening(section)) {
                return false;
            }

            if (section.hasClass('current_view')) {
                currentSection = section;

                if (sections.length - 1 === i) {
                    nextSection = sections[0];
                } else {
                    nextSection = sections[i + 1];
                }
            }
        }

        currentSection.removeClass('current_view');

        nextSection.css( { top : '100%' } );
        nextSection.addClass('current_view');
        nextSection.show();

        TweenMax.to(currentSection, 1, { top : '-50%', opacity : 0, ease : Expo.easeOut } );
        TweenMax.to(nextSection, 1, { top : '50%', opacity : 1, ease : Expo.easeOut } );

        switch (nextSection.attr('id')) {
            case 'overview' :
                startOverview(false);
                resetCircles();
                break;

            case 'specialties' :
                startSpecialties(false);
                break;

            case 'experience' :
                startExperience(false);
                resetCircles();
                break;
        }
    };

    /**
     * Init the overview area (the first time)
     */
    var initOverview = function() {
        overview.addClass('current_view');
        overview.show();
        overview.css( { opacity : 1, top : '50%' } );

        // Reset the specialties circles fills each time you visit!
        resetCircles();

        // Developer that...
        var developerThat = overview.find('p').first();
        var developerThatChild = developerThat.children().remove();
        Utils.spanText(developerThat);
        developerThat.append(developerThatChild);

        // 4 years of experience...
        var yearsOfExp = overview.find('p').eq(1);
        var yearsOfExpChild = yearsOfExp.children().remove();
        Utils.spanText(yearsOfExp);
        yearsOfExp.append(yearsOfExpChild);

        // animation
        var timeline = new TimelineMax();
        timeline.from(johnCircle, 1, { opacity : 0, ease : Expo.easeOut } );
        timeline.from(overviewTitle, 1, { opacity : 0, left: '-60px', ease : Expo.easeOut }, '-=0.8');
        timeline.staggerFrom(developerThat.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.02, '-=0.8');
        timeline.staggerFrom(yearsOfExp.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.02, '-=0.8');
    };

    /**
     * Each time you go to the overview
     */
    var startOverview = function(fromTop) {
        if (fromTop) {
            TweenMax.from(overviewTitle, 2, { top : '-40px', ease : Expo.easeOut } );
            TweenMax.from(johnCircle, 2, { marginTop : '-60px', ease : Expo.easeOut } );
            TweenMax.from(overview.find('p').first(), 2, { marginTop : '-60px', ease : Expo.easeOut } );
            TweenMax.from(overview.find('p').eq(1), 2, { marginTop : '-80px', ease : Expo.easeOut } );
        } else {
            TweenMax.from(overviewTitle, 2, { top : '40px', ease : Expo.easeOut } );
            TweenMax.from(johnCircle, 2, { marginTop : '60px', ease : Expo.easeOut } );
            TweenMax.from(overview.find('p').first(), 2, { marginTop : '60px', ease : Expo.easeOut } );
            TweenMax.from(overview.find('p').eq(1), 2, { marginTop : '80px', ease : Expo.easeOut } );
        }
    };

    /**
     * Each time you go to the specialties
     */
    var startSpecialties = function(fromTop) {
        setAllCircles();
        TweenMax.ticker.addEventListener('tick', ticked);

        if (fromTop) {
            TweenMax.from(specialtiesTitle, 2, { top : '-50px', ease : Expo.easeOut } );
            TweenMax.from(specialties.find('.special_slogan'), 2, { top : '-70px', ease : Expo.easeOut } );
            TweenMax.from(specialties.find('h3').first(), 2, { top : '-100px', ease : Expo.easeOut } );
            TweenMax.staggerFrom(specialties.find('.circle'), 2, { marginTop : '-50px', ease : Expo.easeOut }, 0.05);
        } else {
            TweenMax.from(specialtiesTitle, 2, { top : '50px', ease : Expo.easeOut } );
            TweenMax.from(specialties.find('.special_slogan'), 2, { top : '70px', ease : Expo.easeOut } );
            TweenMax.from(specialties.find('h3').first(), 2, { top : '100px', ease : Expo.easeOut } );
            TweenMax.staggerFrom(specialties.find('.circle'), 2, { marginTop : '50px', ease : Expo.easeOut }, 0.05);
        }
    };

    /**
     * Each time you go to the experience
     */
    var startExperience = function(fromTop) {
        if (fromTop) {
            TweenMax.from(experienceTitle, 2, { top : '-50px', ease : Expo.easeOut } );
            TweenMax.from(experience.find('p').first(), 2, { top : '-70px', ease : Expo.easeOut } );

            TweenMax.from(pastExperience1.find('.circle').first(), 2, { top : '-40px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience1.find('h4'), 2, { top : '-30px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience1.find('.position'), 2, { top : '-30px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience1.find('.timeframe'), 2, { top : '-40px', ease : Expo.easeOut } );

            TweenMax.from(pastExperience2.find('.circle').first(), 2, { top : '-50px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience2.find('h4'), 2, { top : '-40px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience2.find('.position'), 2, { top : '-30px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience2.find('.timeframe'), 2, { top : '-30px', ease : Expo.easeOut } );
        } else {
            TweenMax.from(experienceTitle, 2, { top : '50px', ease : Expo.easeOut } );
            TweenMax.from(experience.find('p').first(), 2, { top : '70px', ease : Expo.easeOut } );

            TweenMax.from(pastExperience1.find('.circle').first(), 2, { top : '40px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience1.find('h4'), 2, { top : '30px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience1.find('.position'), 2, { top : '30px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience1.find('.timeframe'), 2, { top : '40px', ease : Expo.easeOut } );

            TweenMax.from(pastExperience2.find('.circle').first(), 2, { top : '50px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience2.find('h4'), 2, { top : '40px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience2.find('.position'), 2, { top : '30px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience2.find('.timeframe'), 2, { top : '30px', ease : Expo.easeOut } );
        }
    };

    /**
     * Set the RaphaelJS "canvas" on each circle.
     */
    var setAllCircles = function() {
        for (var i = 0; i < circles.length; i++) {
            var circle = circles[i];
            var paper = new Raphael(circle.id, width, height);
            circle.paper = paper;
        }
    };

    /**
     * Reset circle fills back to the beginning
     */
    var resetCircles = function() {
        TweenMax.ticker.removeEventListener('tick', ticked);

        for (var i = 0; i < circles.length; i++) {
            var circle = circles[i];

            if (circle.paper) {
                circle.paper.remove();
                circle.paper = null;
            }

            circle.startPercent = 0;
        }
    };

    /**
     * Animate each circle fill.
     */
    var ticked = function() {
        for (var i = 0; i < circles.length; i++) {
            var circle = circles[i];

            if (circle.startPercent >= circle.endPercent) {
                circle.startPercent = circle.endPercent;
            } else {
                circle.startPercent += speed;
                circle.paper.clear();

                var angle = doublePI * circle.startPercent / 100 - halfPI;
                var x = Math.cos(angle) * centerX + centerX;
                var y = Math.sin(angle) * centerX + centerX;
                var largeArcFlag = (circle.startPercent <= (100 * 0.5)) ? 0 : 1;

                var path = 'M' + centerX + ',' + centerX + ' L' + centerX + ',0 ';
                path += 'A' + centerX + ',' + centerX + ' 0 ' + largeArcFlag + ',1 ' + x + ',' + y + ' ';
                path += 'L' + centerX + ',' + centerX + 'Z';

                var circlePath = circle.paper.path(path);
                circlePath.attr({ fill : circle.color, 'stroke-width' : 0 });
            }
        }
    };

    /**
     * Selectors
     */
    var cacheSelectors = function() {
        // all areas
        resume = $('#resume');
        overview = $('#overview');
        specialties = $('#specialties');
        experience = $('#experience');
        up_arrow = $('.up_arrow');
        down_arrow = $('.down_arrow');

        // overview area
        overviewTitle = overview.find('.title');
        johnCircle = overview.find('.circle').eq(0);

        // experience area
        experienceTitle = experience.find('.title');
        pastExperience1 = $('.past_experience1');
        pastExperience2 = $('.past_experience2');

        // Specialties area
        specialtiesTitle = specialties.find('.title');
        skillsRow1 = $('.skills_row1');
        skillsRow2 = $('.skills_row2');
    };

    window.Resume = Resume;

}(window));
