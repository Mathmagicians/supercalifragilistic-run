(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{537:function(t,e,n){"use strict";n.r(e);n(21),n(15),n(20),n(23),n(17),n(24);var o=n(12),c=n(13),r=n(45),l=n(107),f=n(29);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function O(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h={name:"Login",auth:!1,components:{SigninButton:n(62).default,HeroButton:f.default,BasicPageLayout:l.default,PageSectionTitle:r.default},computed:O(O({},Object(c.e)({loggedIn:function(t){return t.auth.loggedIn}})),Object(c.c)(["profileName"])),watch:{"$state.auth.loggedIn":function(t,e){console.log("[login] watching loggedin,",t,e)},loggedIn:function(t,e){console.log("[login] watching loggedin 2,",t,e)}},methods:{login:function(){this.$auth.loginWith("awsCognito")},logout:function(){this.$auth.logout()}}},v=n(5),component=Object(v.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("basic-page-layout",[t.loggedIn?n("div",[n("page-section-title",[t._v("Welcome, "+t._s(t.profileName)+" 🦩")]),t._v(" "),n("p",[t._v(" You are signed in, have fun ...")]),t._v(" "),n("hero-button",{on:{click:t.logout}},[t._v("\n      Sign out\n    ")])],1):n("div",[n("page-section-title",[t._v("Sign up to be a supercalifragilistic 🦩")]),t._v(" "),n("signin-button",{on:{click:t.login}})],1)])}),[],!1,null,"cc0e1f8c",null);e.default=component.exports}}]);