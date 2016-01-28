function onScroll(){scrollTop=$window.scrollTop(),scrollTop>headerTop?$header.hasClass("overlay")||$header.addClass("overlay"):scrollTop<=headerTop&&$header.hasClass("overlay")&&$header.removeClass("overlay")}function scrollToSection(e){var i=$(e).offset().top,t=i-90;$scrollElement.stop().animate({scrollTop:t},750,"easeInOutQuad")}function initSiteNavigation(){var e=$(".content-nav li a");e.click(function(e){return scrollToSection(this.hash),e.preventDefault(),!1})}function resizeSite(){windowWidth=$window.width(),windowHeight=$window.height(),checkFixedHeader()}function initMobileHeader(){$("#menu-button").click(function(e){return $header.toggleClass("opened"),$headerMenu.slideToggle(200,function(){$headerMenu.is(":hidden")&&$headerMenu.removeAttr("style")}),e.preventDefault(),!1})}function initFixedHeader(){$fixedHeader=$("#header-fixed"),fixedHeaderHeight=$fixedHeader.height(),siteVars.isMobile||$window.scroll(checkFixedHeader).trigger("scroll")}function checkFixedHeader(){windowWidth>mobileHeaderWidth?$window.scrollTop()>showFixedHeaderScrollTop?$fixedHeader.is(":hidden")&&$fixedHeader.stop().css({display:"block",opacity:0,top:-fixedHeaderHeight}).animate({opacity:1,top:0},250,"easeOutQuad"):$fixedHeader.is(":visible")&&$fixedHeader.stop().animate({opacity:0,top:-fixedHeaderHeight},250,"easeOutQuad",function(){$fixedHeader.css({display:"none"})}):$fixedHeader.is(":visible")&&$fixedHeader.hide()}function initGrid(){if($postsGrid=$(".grid"),$postsGrid.length>0&&$postsGrid.find(".box").length>0){$postsGrid.isotope({itemSelector:".box",animationEngine:"best-available",transformsEnabled:!1,animationOptions:{duration:250,easing:"linear",queue:!1},masonry:{columnWidth:1}}),$(window).resize(function(){$postsGrid.isotope({itemSelector:".box",animationEngine:"best-available",transformsEnabled:!1,animationOptions:{duration:250,easing:"linear",queue:!1},masonry:{columnWidth:1}})});var e=$(".sort-filters a"),t,a,n,s,o="",r=new Array;e.click(function(){if(t=$(this),a=t.data("filter"),n=t.data("type"),"single"==n)t.parents("ul").find("li.active").removeClass("active").find("a").data("isActive",!1),t.data("isActive",!0).parent().addClass("active"),o="*"!=a?a:"";else if(t.data("isActive")){if(!t.parent("li").hasClass("all")){t.data("isActive",!1).parent().removeClass("active");var e=r.indexOf(a);e>-1&&r.splice(e,1),0==r.length&&t.parents("ul").find("li.all").addClass("active").find("a").data("isActive",!0)}}else t.parent("li").hasClass("all")?(t.parents("ul").find("li.active").removeClass("active").find("a").data("isActive",!1),t.data("isActive",!0).parent().addClass("active"),r=new Array):(t.parents("ul").find("li.all").removeClass("active").find("a").data("isActive",!1),t.data("isActive",!0).parent().addClass("active"),r.push(a));if(s="",r.length>0)for(i=0;i<r.length;i++)""!=s&&(s+=", "),s+=o+r[i];else s=""!=o?o:"*";return $postsGrid.isotope({filter:s}),!1})}}function initPersistentHeaders(){var e;$(".persist-area").each(function(){e=$(".persist-header",this),e.before(e.clone()).css("width",e.width()).addClass("floating-header")}),$(window).scroll(updatePersistentHeaders).trigger("scroll")}function updatePersistentHeaders(){$(".persist-area").each(function(){var e=$(this),i=e.offset(),t=$(window).scrollTop(),a=$(".floating-header",this),n=$(".persist-header",this);t>i.top?a.show():a.hide()})}function onLoad(){initGrid()}function initPublicationsAbstract(){$(".publications-list .show-content").click(function(e){console.log("click");var i=$(this),t=i.parents(".publication"),a=t.find(".entry-content");return t.toggleClass("show-content"),a.slideToggle(200),e.preventDefault(),!1})}function mapInRange(e,i,t,a,n){return(n-a)*(e-i)/(t-i)+a}!function($){}(window.jQuery);var $header,$headerMenu,$window,$scrollElement,siteStrings,windowWidth,windowHeight,mobileHeaderWidth=520,headerTop=60,showFixedHeaderScrollTop=100,$fixedHeader;$(document).ready(function(){$window=$(window),$scrollElement=$("html, body").scrollTop(0),$wrapper=$("#wrap"),initFixedHeader(),resizeSite(),siteVars.isMobile?window.addEventListener("onorientationchange"in window?"orientationchange":"resize",resizeSite,!1):$(window).resize(resizeSite),$header=$("header"),$headerMenu=$header.find("#header-menu"),initMobileHeader(),$(window).load(onLoad),initSiteNavigation(),initPublicationsAbstract(),initPersistentHeaders()}),$.extend($.easing,{def:"easeOutQuad",swing:function(e,i,t,a,n){return $.easing[$.easing.def](e,i,t,a,n)},easeInQuad:function(e,i,t,a,n){return a*(i/=n)*i+t},easeOutQuad:function(e,i,t,a,n){return-a*(i/=n)*(i-2)+t},easeInOutQuad:function(e,i,t,a,n){return(i/=n/2)<1?a/2*i*i+t:-a/2*(--i*(i-2)-1)+t},easeInCubic:function(e,i,t,a,n){return a*(i/=n)*i*i+t},easeOutCubic:function(e,i,t,a,n){return a*((i=i/n-1)*i*i+1)+t},easeInOutCubic:function(e,i,t,a,n){return(i/=n/2)<1?a/2*i*i*i+t:a/2*((i-=2)*i*i+2)+t}});