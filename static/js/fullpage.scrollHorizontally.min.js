/*!
 * fullpage.js Scroll Horizontally Extension
 * https://github.com/alvarotrigo/fullPage.js
 *
 * This code has been bought from www.alvarotrigo.com/fullPage/extensions/ and it is not free to use or distrubute.
 * Copyright (C) 2016 alvarotrigo.com - A project by Alvaro Trigo
 */
!function(n){window.fp_scrollHorizontallyExtension=function(){var l=this,o=n.fn.fullpage.getFullpageData(),e=o.options,t=o.internals,i="active",r="."+i,f="fp-section",a="."+f,c=a+r,u="fp-slide",d="."+u,s=d+r;l.getScrollSection=function(l,o){var t,i=n(c),r=i.find(d).length,f=e.scrollHorizontally&&r>1;if(f)if(t=i.find(s),"down"===l){if(t.index()+1!=r)return n.fn.fullpage.moveSlideRight}else if(t.index())return n.fn.fullpage.moveSlideLeft;return o},l.c=t.c;var p=l["common".charAt(0)];return"complete"===document.readyState&&p("scrollHorizontally"),n(window).on("load",function(){p("scrollHorizontally")}),l}}(jQuery);