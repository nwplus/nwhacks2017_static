Polymer({is:"main-app",observers:["loadPage(route)"],ready:function(){window.location.hash.startsWith("#%21")&&(window.location.hash="#!"+window.location.hash.substr(4)),page("*",function(e,o){o(),setTimeout(function(){var e,o=window.location.hash.match(/\#\w+/);if(null!=o&&(e=o[0]),null!=e){var t=document.querySelector(e);if(null==t||0==t.offsetTop)return;window.scrollTo(0,t.offsetTop-100)}},100),this.hideHeader=!1,this.hideFooter=!1});const e=this;page("/register*",function(){e.route="register-closed"}),page("/sponsors*",function(){e.route="sponsor-page"}),page("/dayof*",function(){e.hideHeader=!0,e.route="dayof-page"}),page("/rsvp/:id/:token/:status",function(o){e.route="rsvp-page",e.params=o.params}),page("/admin/*",function(o,t){e.hideHeader=!0,e.hideFooter=!0,t()}),page("/admin/select",function(){e.route="select-hackers"}),page("/admin/stats",function(){e.route="stats-page"}),page("/*",function(){e.route="index-page"}),page("*",this.handle404.bind(this)),page()},loadPage:function(e){const o="components/"+e+"/"+e+".html";this.importHref(o,null,this.handle404,!0)},handle404:function(){console.log("404!",this.route),page.redirect("/")}});