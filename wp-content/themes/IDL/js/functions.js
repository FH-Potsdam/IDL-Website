// remap jQuery to $
(function($){})(window.jQuery);

var $header,
    $headerMenu;

var $window,
    $scrollElement,
    siteStrings,

    windowWidth,
    windowHeight;

var mobileHeaderWidth = 520,
    headerTop = 60,
    showFixedHeaderScrollTop = 100;

//////////////
// onScroll
//////////////


function onScroll() {

    scrollTop = $window.scrollTop();

    // console.log("scroll: " + scrollTop);

    if (scrollTop > headerTop) {

      if (!$header.hasClass('overlay')) {
        $header.addClass('overlay');
      }

    } else if (scrollTop <= headerTop) {

      if ($header.hasClass('overlay')) {
        $header.removeClass('overlay');
      }
    }
}

function scrollToSection(target) {

    //var sectionTop = (windowWidth > mobileHeaderWidth) ? $(target).offset().top - headerHeight : $(target).offset().top

    var offsetTop = $(target).offset().top,
        sectionTop = offsetTop - 90;
        // sectionTop = (windowWidth > mobileHeaderWidth) ? offsetTop - fixedHeaderHeight - 40 : offsetTop;

    $scrollElement.stop().animate({
        'scrollTop': sectionTop
    }, 750, 'easeInOutQuad'/*, function() {
        window.location.hash = target;
    }*/);
}

////////////////
// Navigation
////////////////

function initSiteNavigation() {

  var $contentNav = $('.content-nav li a');

  $contentNav.click(function(e) {
    scrollToSection(this.hash);
    e.preventDefault();
    return false;
  });
}


/////////////
// Resize
/////////////

function resizeSite() {

    windowWidth  = $window.width();
    windowHeight = $window.height();

    checkFixedHeader();

}

///////////////////
// Mobile Header
///////////////////

function initMobileHeader() {

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

//////////////////
// Fixed Header
//////////////////

var $fixedHeader;

function initFixedHeader() {

    $fixedHeader = $('#header-fixed');

    // Fixed header height
    fixedHeaderHeight = $fixedHeader.height();

    // Point in which the fixed header will be shown / hidden
    //showFixedHeaderScrollTop = $header.outerHeight(true) - fixedHeaderHeight;

    // Scroll
    if (!siteVars.isMobile) {
        $window.scroll(checkFixedHeader).trigger("scroll");
    }
}

function checkFixedHeader() {

    if (windowWidth > mobileHeaderWidth) {

        // console.log("windowwidth: " + windowWidth);

        // Show header
        if ($window.scrollTop() > showFixedHeaderScrollTop) {

            if ($fixedHeader.is(':hidden')) {

                $fixedHeader.stop().css({display: 'block', opacity: 0, top: -fixedHeaderHeight})
                            .animate({opacity: 1, top: 0}, 250, 'easeOutQuad');
            }

        // Hide header
        } else {

            if ($fixedHeader.is(':visible')) {

                $fixedHeader.stop()
                    .animate({opacity: 0, top: -fixedHeaderHeight}, 250, 'easeOutQuad', function() {
                        $fixedHeader.css({display: 'none'});
                    });
            }

        }

    } else if ($fixedHeader.is(':visible')) {

        $fixedHeader.hide();
    }
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

////////////////////////
// Persistent Headers
////////////////////////

function initPersistentHeaders() {
  var clonedHeaderRow;

   $(".persist-area").each(function() {
       clonedHeaderRow = $(".persist-header", this);
       clonedHeaderRow
         .before(clonedHeaderRow.clone())
         .css("width", clonedHeaderRow.width())
         .addClass("floating-header");
   });

   $(window)
    .scroll(updatePersistentHeaders)
    .trigger("scroll");
}

function updatePersistentHeaders() {

   $(".persist-area").each(function() {

       var el             = $(this),
           offset         = el.offset(),
           scrollTop      = $(window).scrollTop(),
           $floatingHeader = $(".floating-header", this),
           $persistHeader = $(".persist-header", this);

       if (scrollTop > offset.top) {
      //  if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
          $floatingHeader.show();
          // $persistHeader.hide();
          //  floatingHeader.css({
          //   "visibility": "visible"
          //  });
       } else {
          $floatingHeader.hide();
          // $persistHeader.show();
          //  floatingHeader.css({
          //   "visibility": "hidden"
          //  });
       };
   });
}

////////////
// onLoad
////////////

function onLoad() {

    // Grid
    initGrid();
}

//////////////////
// Publications
//////////////////

function initPublicationsAbstract() {

  $('.publications-list .show-content').click(function(e) {
    console.log("click");

    var $more = $(this),
        $pub = $more.parents('.publication'),
        $pubContent = $pub.find('.entry-content');

    $pub.toggleClass('show-content');
    $pubContent.slideToggle(200);

    e.preventDefault();
    return false;
  });
}

/////////////
// onReady
/////////////

$(document).ready(function (){

    $window         = $(window);
    $scrollElement  = $('html, body').scrollTop(0);
    $wrapper        = $('#wrap');

    initFixedHeader();

    // // Resize
    resizeSite();

    if ( siteVars.isMobile ) {
        window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', resizeSite, false);
    }
    else {
        $(window).resize(resizeSite);
    }

    $header           = $('header');
    $headerMenu       = $header.find('#header-menu');

    // Header
    initMobileHeader();

    // // Init onScroll handler
    // $(window).scroll(onScroll).trigger("scroll");

    // // Load
    $(window).load(onLoad);

    // // Strings
    // siteStrings = $.parseJSON(siteVars.siteStrings);

    initSiteNavigation();
    initPublicationsAbstract();

    initPersistentHeaders();
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
