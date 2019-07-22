(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{52:function(t,e,n){t.exports=n(85)},61:function(t,e,n){},72:function(t,e){},73:function(t,e){},74:function(t,e){},84:function(t,e,n){},85:function(t,e,n){"use strict";n.r(e);var o=n(0),a=n.n(o),i=n(10),r=n.n(i),c=n(29),s=n(14),l=n(24),u=n(26),h=Object(u.createAction)("canvas/SET_SHOULD_SUBMIT",function(t){return function(e){return t({shouldSubmit:e})}});var d=Object(s.c)({canvas:function(t,e){switch(void 0===t&&(t={shouldSubmit:!1}),e.type){case Object(u.getType)(h):return Object(l.a)({},t,{shouldSubmit:e.payload.shouldSubmit});default:return t}}}),v=window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||s.d;var m=function(t){var e=v(s.a.apply(void 0,[]));return Object(s.e)(d,t,e)}(),f=(n(61),n(16)),b=n(15),p=n(31),g=n(27),y=n(32),O=n(107),j=n(86),S=n(109),k=n(8),w=n(17),C=n(33),E=n(21),x=function t(){Object(f.a)(this,t)};x.csrfToken=window.generated_csrf_token;var F=n(106),P=n(102),I=n(103),T=n(104),R=function t(){Object(f.a)(this,t),this.x0=void 0,this.x1=void 0,this.y0=void 0,this.y1=void 0},_=Object(k.a)(function(t){return Object(S.a)({root:{flexGrow:1},menuButton:{marginRight:t.spacing(2)},title:{flexGrow:1}})})(function(t){function e(t){var n;return Object(f.a)(this,e),(n=Object(p.a)(this,Object(g.a)(e).call(this,t))).flickrKey="e813628d1745d2099f9ca002681b381b",n.flickrSecret="8e318755701e66f1",n.imgObj=void 0,n.canvas=void 0,n.onSubmit=n.onSubmit.bind(Object(w.a)(n)),n.state={currCount:0},n}return Object(y.a)(e,t),Object(b.a)(e,[{key:"componentDidMount",value:function(){var t=this.CreateHTMLCanvasByName("coralfinder");E.fabric.Object.prototype.set({transparentCorners:!1,borderColor:"#FFBAE5",cornerColor:"#FFBAE5",perPixelTargetFind:!0,borderScaleFactor:1,cornerSize:2,rotatingPointOffset:6,originX:"left",originY:"top"}),this.canvas=new E.fabric.Canvas(t,{backgroundColor:"#FFFFFF",selectionLineWidth:5,enableRetinaScaling:!1}),this.onSubmit=this.onSubmit.bind(this),this.onInvalid=this.onInvalid.bind(this),this.PreparingImageObj(),this.FetchFlickrPhoto();var e=!1,n=0,o=0,a=new E.fabric.Rect({left:n,top:o,fill:"",stroke:"red",strokeWidth:3}),i=this;this.canvas.on("mouse:down",function(t){var r=i.canvas.getPointer(t.e);e=!0,n=r.x,o=r.y,a=new E.fabric.Rect({left:n,top:o,originX:"left",originY:"top",fill:"",stroke:"red",strokeWidth:3}),i.canvas.remove.apply(i.canvas,i.canvas.getObjects().concat()),i.canvas.add(a)}),this.canvas.on("mouse:move",function(t){if(e){var r=i.canvas.getPointer(t.e);n>r.x&&a.set({left:Math.abs(r.x)}),o>r.y&&a.set({top:Math.abs(r.y)}),a.set({width:Math.abs(n-r.x)}),a.set({height:Math.abs(o-r.y)}),i.canvas.renderAll()}}),this.canvas.on("mouse:up",function(t){e=!1,console.log(i.GetCurrentRectPosition())})}},{key:"onInvalid",value:function(){var t=this,e=this;"function"===typeof this.props.setShouldSubmit?(C.post("/coral/").set("X-CSRFToken",x.csrfToken).timeout({response:6e4}).send({url:e.imgObj.src,x0:0,x1:0,y0:0,y1:0}).then(function(n){n.status>=200&&n.status<300&&(console.log("Photo info registered"),e.canvas.remove.apply(e.canvas,e.canvas.getObjects().concat()),t.FetchFlickrPhoto())},function(t){console.log(t)}),this.props.setShouldSubmit(!0)):console.error("setShouldSubmit function not available")}},{key:"onSubmit",value:function(){var t=this,e=this;if("function"===typeof this.props.setShouldSubmit){var n=this.GetCurrentRectPosition();if(!n)return;C.post("/coral/").set("X-CSRFToken",x.csrfToken).timeout({response:6e4}).send({url:e.imgObj.src,x0:n.x0,x1:n.x1,y0:n.y0,y1:n.y1}).then(function(n){console.log(n),n.status>=200&&n.status<300&&(console.log("Photo info registered"),e.canvas.remove.apply(e.canvas,e.canvas.getObjects().concat()),t.FetchFlickrPhoto())},function(t){console.log(t)}),this.props.setShouldSubmit(!0)}else console.error("setShouldSubmit function not available")}},{key:"render",value:function(){var t=this.props.classes;return o.createElement(P.a,{position:"static"},o.createElement(I.a,null,o.createElement(T.a,{variant:"h6",className:t.title},"CoralFinder Sample counts: ",this.state.currCount),o.createElement(F.a,{variant:"contained",color:"primary",onClick:this.onSubmit},"Submit"),o.createElement(F.a,{variant:"contained",color:"secondary",onClick:this.onInvalid},"No Coral")))}},{key:"CreateHTMLCanvasByName",value:function(t){var e=document.getElementById("canvasWrapper"),n=document.createElement("canvas");n.id=t;var o=document.createElement("img");return o.id="coralimg",o.hidden=!0,null!==e?(e.appendChild(o),e.appendChild(n)):console.error("canvas root is null!"),n}},{key:"FetchFlickrPhoto",value:function(){var t=this;C.get("/coral/").set("X-CSRFToken",x.csrfToken).timeout({response:6e4}).query({}).then(function(e){if(null!=e.body&&e.status>=200&&e.status<300){var n=e.body.url;t.PopulateCanvasWithUrl(n),t.setState({currCount:e.body.count})}},function(t){console.log(t)})}},{key:"PreparingImageObj",value:function(){var t=this;this.imgObj=document.getElementById("coralimg"),this.imgObj.crossOrigin="Anonymous",this.imgObj&&(this.imgObj.onload=function(){var e=new E.fabric.Image(t.imgObj,{left:0,top:0});e.width&&e.height&&(t.canvas.setWidth(e.width),t.canvas.setHeight(e.height),t.canvas.setBackgroundImage(e,t.canvas.renderAll.bind(t.canvas),{originX:"left",originY:"top"}),t.canvas.requestRenderAll())})}},{key:"PopulateCanvasWithUrl",value:function(t){this.imgObj||this.PreparingImageObj(),this.imgObj.src=t}},{key:"GetCurrentRectPosition",value:function(){var t=this.canvas._objects[0],e=this.canvas.getWidth(),n=this.canvas.getHeight();if(t&&t.left&&t.top&&t.width&&t.height){var o=new R;return o.x0=t.left/e,o.x1=(t.left+t.width)/e,o.y0=t.top/n,o.y1=(t.top+t.height)/n,o}return null}},{key:"ConstructPhotoUrl",value:function(t,e,n,o){return"https://farm".concat(t,".staticflickr.com/").concat(e,"/").concat(n,"_").concat(o,".jpg")}}]),e}(o.Component));var W=Object(c.b)(function(t){return{shouldSubmit:t.canvas.shouldSubmit}},function(t){return{setShouldSubmit:function(e){return t(h(e))}}})(_),B=(n(84),Object(k.a)(function(t){return Object(S.a)({root:Object(l.a)({},t.mixins.gutters(),{textAlign:"center"}),centerRoot:Object(l.a)({},t.mixins.gutters(),{textAlign:"center",maxWidth:"500px"}),shareIcon:{textAlign:"center",display:"inline"}})})(function(t){function e(){return Object(f.a)(this,e),Object(p.a)(this,Object(g.a)(e).apply(this,arguments))}return Object(y.a)(e,t),Object(b.a)(e,[{key:"render",value:function(){var t=this.props.classes;return a.a.createElement(a.a.Fragment,null,a.a.createElement(O.a,null),a.a.createElement("div",null,a.a.createElement(j.a,{className:t.root,elevation:1},a.a.createElement("div",null,a.a.createElement(W,null),a.a.createElement("div",{id:"canvasWrapper","touch-action":"none"})))))}}]),e}(o.Component)));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(c.a,{store:m},a.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[52,1,2]]]);
//# sourceMappingURL=main.3c75ae3d.chunk.js.map