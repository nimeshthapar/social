(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[6],{107:function(e,a,n){e.exports={"form-container":"AuthForm_form-container__pDoxU","form-actions":"AuthForm_form-actions___aUZ1"}},108:function(e,a,n){e.exports={"image-upload":"ImageUpload_image-upload__2fQCy",center:"ImageUpload_center__2z_Tv","image-upload__preview":"ImageUpload_image-upload__preview__1DNa6","form-control":"ImageUpload_form-control__1jteI"}},141:function(e,a,n){"use strict";n.r(a);var t=n(1),l=n(5),c=n.n(l),o=n(17),r=n(12),i=n(3),s=n(107),u=n.n(s),p=n(43),d=n(14),j=n(7),b=n(88),h=n(16),v=n(83),O=n(15),g=n(108),m=n.n(g),f=n(0),x=function(e){var a=Object(t.useRef)(),n=Object(t.useState)(),l=Object(i.a)(n,2),c=l[0],o=l[1],r=Object(t.useState)(),s=Object(i.a)(r,2),u=s[0],p=s[1];Object(t.useEffect)((function(){if(c){var e=new FileReader;e.onload=function(){p(e.result)},e.readAsDataURL(c)}}),[c]);return Object(f.jsxs)("div",{className:m.a["form-control"],children:[Object(f.jsx)("input",{id:e.id,ref:a,type:"file",style:{display:"none"},accept:".jpg,.jpeg,.png",onChange:function(a){var n;(a.target.files||1===a.target.files.length)&&(n=a.target.files[0],o(n),e.onAdd(a.target.files[0]))}}),Object(f.jsxs)("div",{className:"".concat(m.a["image-upload"]," ").concat(e.center&&m.a.center),children:[Object(f.jsxs)("div",{className:m.a["image-upload__preview"],children:[u&&Object(f.jsx)("img",{src:u,alt:"preveiw"}),!u&&Object(f.jsx)("p",{children:"Please Pick an Image"})]}),Object(f.jsx)(d.a,{inverse:!0,onClick:function(){a.current.click()},children:"Pick Image"})]})]})},_=function(){var e=Object(t.useState)(!0),a=Object(i.a)(e,2),n=a[0],l=a[1],s=Object(t.useState)(null),g=Object(i.a)(s,2),m=g[0],_=g[1],C=Object(t.useContext)(j.a),w=Object(h.a)(),k=w.isLoading,y=w.error,T=w.sendRequest,F=w.clearError,I=Object(v.a)(),N=I.value,S=I.valueChangeHandler,H=Object(v.a)(),A=H.value,D=H.valueChangeHandler,P=Object(v.a)(),U=P.value,E=P.valueChangeHandler,L=Object(v.a)(),R=L.value,J=L.valueChangeHandler,q=Object(v.a)(),B=q.value,Z=q.valueChangeHandler,z=Object(v.a)(),M=z.value,Q=z.valueChangeHandler,V=Object(v.a)(),W=V.value,Y=V.valueChangeHandler,G=Object(v.a)(),K=G.value,X=G.valueChangeHandler,$=Object(v.a)(),ee=$.value,ae=$.valueChangeHandler,ne=function(){var e=Object(r.a)(c.a.mark((function e(a){var t,l,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),e.prev=1,!n){e.next=9;break}return e.next=5,T("".concat("https://mern-book-social.herokuapp.com/api","/users/login"),"POST",JSON.stringify({email:N,password:A}),{"Content-Type":"application/json"});case 5:t=e.sent,C.login(Object(o.a)({},t.userData),t.token),e.next=24;break;case 9:return(l=new FormData).append("email",N),l.append("password",A),l.append("name",U||void 0),l.append("school",R||void 0),l.append("image",m||void 0),l.append("college",B||void 0),l.append("occupation",M||void 0),l.append("at",W||void 0),l.append("bio",K||void 0),l.append("relationship",ee||void 0),e.next=22,T("".concat("https://mern-book-social.herokuapp.com/api","/users/signup"),"POST",l);case 22:r=e.sent,C.login(Object(o.a)({},r.userData),r.token);case 24:e.next=28;break;case 26:e.prev=26,e.t0=e.catch(1);case 28:case"end":return e.stop()}}),e,null,[[1,26]])})));return function(a){return e.apply(this,arguments)}}();return Object(f.jsxs)(f.Fragment,{children:[y&&Object(f.jsx)(O.a,{onClose:F,text:y,onlyBack:!0,overlay:!0}),Object(f.jsx)("div",{className:u.a["form-container"],children:Object(f.jsxs)(p.a,{children:[Object(f.jsx)("h1",{children:n?"Login":"Signup"}),Object(f.jsxs)("form",{onSubmit:ne,children:[Object(f.jsx)(b.a,{for:"Email",label:"E-mail",type:"email",value:N,onChange:S}),Object(f.jsx)(b.a,{for:"Password",label:"Password",type:"password",value:A,onChange:D}),!n&&Object(f.jsx)(b.a,{for:"name",label:"Name",value:U,onChange:E}),!n&&Object(f.jsx)("div",{className:u.a.center,children:Object(f.jsx)(x,{center:!0,id:"image",onAdd:function(e){console.log(e),_(e)}})}),!n&&Object(f.jsx)(b.a,{for:"bio",label:"Bio",value:K,onChange:X}),!n&&Object(f.jsx)(b.a,{dual:!0,label:"Education",forOne:"school",labelOne:"School",valueOne:R,onChangeOne:J,forTwo:"college",labelTwo:"College",valueTwo:B,onChangeTwo:Z}),!n&&Object(f.jsx)(b.a,{dual:!0,label:"Work",forOne:"occupation",labelOne:"Occupation",valueOne:M,onChangeOne:Q,forTwo:"at",labelTwo:"At",valueTwo:W,onChangeTwo:Y}),!n&&Object(f.jsx)(b.a,{for:"relationship",label:"Relationship",value:ee,onChange:ae}),Object(f.jsxs)("div",{className:u.a["form-actions"],children:[Object(f.jsx)(d.a,{type:"submit",children:k?"Loading...":n?"Login":"Signup"}),Object(f.jsx)("p",{onClick:function(){l((function(e){return!e}))},children:n?"Don't have account no problem click to signup":"Already having account click to login"})]})]})]})})]})};a.default=function(){return Object(f.jsx)(_,{})}},83:function(e,a,n){"use strict";var t=n(3),l=n(1);a.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=Object(l.useState)(e),n=Object(t.a)(a,2),c=n[0],o=n[1],r=Object(l.useCallback)((function(e){o(e.target.value)}),[]);return{value:c,valueChangeHandler:r,setValue:o}}},88:function(e,a,n){"use strict";n(1);var t=n(91),l=n.n(t),c=n(0);a.a=function(e){var a=Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("label",{htmlFor:e.for,children:e.label}),Object(c.jsx)("input",{type:e.type||"text",onChange:e.onChange,value:e.value,placeholder:e.placeholder})]});return e.textarea&&(a=Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("label",{htmlFor:e.for,children:e.label}),Object(c.jsx)("textarea",{type:e.type||"text",rows:e.rows||3,onChange:e.onChange,value:e.value,placeholder:e.placeholder})]})),e.dual&&(a=Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)("div",{className:l.a["input-container__dual-div"],children:[Object(c.jsx)("label",{htmlFor:e.forOne,children:e.labelOne}),Object(c.jsx)("input",{type:e.typeOne||"text",onChange:e.onChangeOne,value:e.valueOne,placeholder:e.placeholder})]}),Object(c.jsxs)("div",{className:l.a["input-container__dual-div"],children:[Object(c.jsx)("label",{htmlFor:e.forTwo,children:e.labelTwo}),Object(c.jsx)("input",{type:e.typeTwo||"text",onChange:e.onChangeTwo,value:e.valueTwo,placeholder:e.placeholder})]})]})),Object(c.jsx)("div",{className:e.dual?l.a["input-container__dual"]:"".concat(l.a["input-container"]," ").concat(e.msg&&l.a.msg),children:a})}},91:function(e,a,n){e.exports={"input-container":"Input_input-container__3uy4l","input-container__dual":"Input_input-container__dual__1HZ6I","input-container__dual-div":"Input_input-container__dual-div__nEqMd",msg:"Input_msg__1eA6Y"}}}]);
//# sourceMappingURL=6.d3ea5e9a.chunk.js.map