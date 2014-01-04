(function(window) {

    var _this,
        portfolio,
        works,
        orderedWorks,
        shuffledWorks;

    var lightbox,
        project,
        closeProject,
        projectImage,
        projectHeading,
        projectInfo,
        projectLink,
        header,
        footer,
        workTimeline,
        closeTimeline;

    function Portfolio() { }

    Portfolio.prototype.init = function() {
        _this = this;
        cacheSelectors();
        portfolio.addClass('viewedSection');

        // shuffle works before animating
        orderedWorks = works.find('.work');
        shuffledWorks = orderedWorks.sort(function() {
            return 0.5 - Math.random();
        });

        // animate thumbs
        TweenMax.staggerFrom(shuffledWorks, 2, { opacity : 0, ease : Expo.easeOut }, 0.2);

        // click on thumbs
        works.find('a').on('click', onWorkClick);
    };

    /**
     * Click on a work thumbnail
     */
    var onWorkClick = function(e) {
        e.preventDefault();

        var target = $(e.currentTarget);
        var id = parseInt(target.parent().data('id'), 10);
        var workData = _this.getWorkData(id);

        History.pushState(workData, 'Jonathan Torres Portfolio', Utils.slug(workData.name));
    };

    /**
     * Get data for a portfolio work
     * You can get the data by it's id or the slug
     */
    Portfolio.prototype.getWorkData = function(id) {
        var selectedWork,
            workID;

        for (var i = 0; i < this.worksData.length; i++) {
            workID = (typeof id === 'number') ? parseInt(this.worksData[i].id, 10) : Utils.slug(this.worksData[i].name);

            if (id === workID) {
                selectedWork = this.worksData[i];
            }
        }

        return selectedWork;
    };

    /**
     * Animates and shows the selected work
     */
    Portfolio.prototype.showWork = function(data) {
        // fill data
        var work = data;
        projectImage.attr('src', work.project_image);
        projectHeading.text(work.name);
        projectInfo.text(work.description);
        projectLink.attr('href', work.url);

        // reset positions and show the necessary items first
        lightbox.show();
        project.show();
        resetPositions();

        // project name
        var projectHeadingChild = projectHeading.children().remove();
        Utils.spanText(projectHeading);
        projectHeading.append(projectHeadingChild);

        // project info
        var projectInfoChild = projectInfo.children().remove();
        Utils.spanText(projectInfo);
        projectInfo.append(projectInfoChild);

        // animate work elements
        workTimeline = new TimelineMax();
        workTimeline.from(lightbox, 1, { opacity : 0, ease : Expo.easeOut });
        workTimeline.from(project, 1, { height : '0%', ease : Expo.easeOut }, '-=0.8');
        workTimeline.from(closeProject, 1, { opacity : 0, ease : Expo.easeOut }, '-=0.5');
        workTimeline.from(projectImage, 1, { opacity : 0, ease : Expo.easeOut }, '-=1.0');
        workTimeline.staggerFrom(projectHeading.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05, '-=0.6');
        workTimeline.staggerFrom(projectInfo.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.01, '-=0.4');
        workTimeline.from(projectLink, 1, { opacity : 0, ease : Expo.easeOut }, '-=0.2');

        // close project
        closeProject.on('click', closeWork);
        lightbox.on('click', closeWork);
        header.on('click', closeWork);
        footer.on('click', closeWork);
    };

    /**
     * Closes the project being viewed
     */
    var closeWork = function(e) {
        e.preventDefault();

        if (project.is(':visible')) {
            var projectElements = [projectLink, projectInfo, projectHeading, projectImage, closeProject];

            closeTimeline = new TimelineMax();
            closeTimeline.to(projectElements, 1, { opacity : 0, ease : Expo.easeOut });
            closeTimeline.to(project, 1, { height : '0%', ease : Expo.easeOut }, '-=0.6');
            closeTimeline.to(lightbox, 1, { opacity : 0, ease : Expo.easeOut, onComplete : closeTimelineFinished }, '-=0.6');
        }
    };

    /**
     * Hide lightbox when the closing work animation finishes
     */
    var closeTimelineFinished = function() {
        lightbox.hide();
        project.hide();
    };

    /**
     * Reset project items back to position to be animated again.
     */
    var resetPositions = function() {
        lightbox.css({ opacity : 1 });
        project.css({ height : '100%' });
        closeProject.css({ opacity : 1 });
        projectImage.css({ opacity : 1 });
        projectHeading.css({ opacity : 1 });
        projectInfo.css({ opacity : 1 });
        projectLink.css({ opacity : 1 });
    };

    /**
     * jQuery selectors
     */
    var cacheSelectors = function() {
        portfolio = $('#portfolio');
        works = $('#works');
        lightbox = $('.lightbox');
        project = $('.project-view');
        closeProject = project.find('.close-project');
        projectImage = project.find('.project-img');
        projectHeading = project.find('h3');
        projectInfo = project.find('p');
        projectLink = project.find('.visit-project');
        header = $('#topheader');
        footer = $('#pagefooter');
    };

    window.Portfolio = Portfolio;

}(window));
