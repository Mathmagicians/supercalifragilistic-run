(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{538:function(e,t,n){"use strict";n.r(t);n(19),n(14),n(18),n(23),n(16),n(24);var r=n(9),c=(n(70),n(108),n(13)),o=n(207);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}var f={components:{BasicPageLayout:n(107).default,Leaderboard:o.default},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(c.e)({challenges:function(e){return e.challenges},myChallenges:function(e){return e.profile.challenges}})),methods:{isMine:function(e){return this.myChallenges.includes(e)}}},O=n(4),component=Object(O.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("basic-page-layout",e._l(e.challenges,(function(t){return n("leaderboard",{key:t.id,attrs:{"is-mine":e.isMine(t.id),challenge:t}})})),1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Leaderboard:n(207).default})}}]);