$(document).ready(function(){$(".skip-links a").click(function(t){var e="#"+this.href.split("#")[1];$(e).attr("tabindex",-1).on("blur focusout",function(){$(this).removeAttr("tabindex")}).focus()}),$("body").addClass("js");var t=$("#page-nav"),e=$(".menu-link");e.click(function(){return e.toggleClass("is-active"),t.toggleClass("is-opened"),!1});var n=$(".tab-nav .is-active a");n.click(function(){return $(this).parent().parent().toggleClass("is-opened"),!1});var i=0,o=0,s=new Array,r,c=0;$(".hero-content .card").each(function(){if(r=$(this),topPostion=r.position().top,o!=topPostion){for(currentDiv=0;currentDiv<s.length;currentDiv++)s[currentDiv].height(i);s.length=0,o=topPostion,i=r.height(),s.push(r)}else s.push(r),i=i<r.height()?r.height():i;for(currentDiv=0;currentDiv<s.length;currentDiv++)s[currentDiv].height(i)}),$(".primary-nav a").focus(function(){$(this).closest(".dropdown").addClass("is-focused")}).focusout(function(){$(this).closest(".dropdown").removeClass("is-focused")}),$(".project-entry .action-details").on("click",function(t){t.preventDefault(),$(this).closest(".project-entry").toggleClass("is-opened")})});