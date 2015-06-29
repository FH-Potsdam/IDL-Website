// remap jQuery to $
(function($){})(window.jQuery);

var $header,
    $headerMenu;
    
// var $window,
//     $scrollElement,
//     siteStrings,

//     windowWidth,
//     windowHeight;

//////////////
// onScroll
//////////////

// function onScroll() {

//     scrollTop = $window.scrollTop();
// }

/////////////
// Resize
/////////////

// function resizeSite() {

//     windowWidth  = $window.width();
//     windowHeight = $window.height();

// }

///////////////////
// Mobile Header
///////////////////

////////////////
// Navigation 
////////////////

function initMobileHeader() {

    $header           = $('#header');
    $headerMenu       = $header.find('#header-menu');

    $('#menu-button').click(function(e) {

        $header.toggleClass('opened');
        $headerMenu.slideToggle(200, function() {
            
            if ($headerMenu.is(":hidden")) {
                $headerMenu.removeAttr('style');
            }   
        });

        e.preventDefault();
        return false;
    });
}

//////////
// Grid
//////////

function initGrid() {

    $postsGrid = $('.grid');

    if ($postsGrid.length > 0 && $postsGrid.find('.box').length > 0) {

        $postsGrid.isotope({
            itemSelector : '.box',
            //filter: initSelector,
            animationEngine : 'best-available',
            transformsEnabled: false,
            //visibleStyle : { opacity : 1 },
            animationOptions: {
                duration: 250,
                easing: 'linear',
                queue: false
            },
            masonry: {
                columnWidth: 1
            }
        });
          
        $(window).resize(function() {

            $postsGrid.isotope({
                itemSelector : '.box',
                animationEngine : 'best-available',
                transformsEnabled: false,
                //visibleStyle : { opacity : 1 },
                animationOptions: {
                    duration: 250,
                    easing: 'linear',
                    queue: false
                },
                masonry: {
                    columnWidth: 1
                }
            });
        });

        // Filtering
        var $sortFilters = $('.sort-filters a'),
            $filter,
            filterValue,
            filterType,
            filterSelector,
            categoryFilter = '',
            tagFilterArray = new Array();

        $sortFilters.click(function() {

            $filter     = $(this);
            filterValue = $filter.data('filter');
            filterType  = $filter.data('type');

            // Category
            if (filterType == 'single') {

                // Deactivate old filter
                $filter.parents('ul').find('li.active').removeClass('active')
                                     .find('a').data('isActive', false);

                // Activate new filter
                $filter.data('isActive', true)
                       .parent().addClass('active');

                // Update category filter
                categoryFilter = (filterValue != '*') ? filterValue : '';

            // Tags
            } else {

                // Add new tag
                if (!$filter.data('isActive')) {

                    // All marked
                    if ($filter.parent('li').hasClass('all')) {

                        // Remove all active filters
                        $filter.parents('ul').find('li.active').removeClass('active')
                                             .find('a').data('isActive', false);

                        // Update filter
                        $filter.data('isActive', true)
                               .parent().addClass('active');

                        // Reset array
                        tagFilterArray = new Array();

                    // Normal filter was marked
                    } else {

                        // Remove all
                        $filter.parents('ul').find('li.all').removeClass('active')
                                             .find('a').data('isActive', false);
                        // Mark tag
                        $filter.data('isActive', true)
                               .parent().addClass('active');

                        tagFilterArray.push(filterValue);
                    }

                // Remove tag
                } else {

                    // Avoid unmark ALL 
                    if (!$filter.parent('li').hasClass('all')) {

                        $filter.data('isActive', false)
                               .parent().removeClass('active');

                        var index = tagFilterArray.indexOf(filterValue);
                        if (index > -1) {
                            tagFilterArray.splice(index, 1);
                        }

                        // If no tag selected, mark "all"
                        if (tagFilterArray.length == 0) {
                            $filter.parents('ul').find('li.all').addClass('active')
                                                 .find('a').data('isActive', true);
                        }
                    }
                }
            }

            // Create filter selector
            filterSelector = '';

            // Tags selected
            if (tagFilterArray.length > 0) {
                for (i=0; i<tagFilterArray.length; i++) {
                    if (filterSelector != '') filterSelector += ', ';
                    filterSelector += categoryFilter + tagFilterArray[i];
                }

            // Only category
            } else {
                filterSelector = (categoryFilter != '') ? categoryFilter : '*';
            }

            //console.log("sel: " + filterSelector);

            $postsGrid.isotope({ filter: filterSelector });

            return false;
        });
    }
}


////////////
// onLoad
////////////

function onLoad() {

    // Grid
    initGrid();
}

/////////////
// onReady
/////////////

$(document).ready(function (){

    // $window         = $(window);
    // $scrollElement  = $('html, body').scrollTop(0);
    // $wrapper        = $('#wrap');

    // // Resize
    // resizeSite();

    // if ( isMobile ) {
    //     window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', resizeSite, false);
    // }
    // else {
    //     $(window).resize(resizeSite);
    // }

    // Header
    initMobileHeader();

    // // Init onScroll handler
    // $(window).scroll(onScroll).trigger("scroll");

    // // Load
    $(window).load(onLoad);

    // // Strings
    // siteStrings = $.parseJSON(siteVars.siteStrings);
});


////////////
// Utils
////////////

function mapInRange(value, min, max, a, b) {
    return (((b - a)*(value - min) ) / (max - min)) + a;
}

////////////////////////////
// Custom Easing Extends
////////////////////////////

$.extend($.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        return $.easing[$.easing.def](x, t, b, c, d);
    },

    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    }
});