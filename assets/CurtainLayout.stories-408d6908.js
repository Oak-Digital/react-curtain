import{j as e,C as g}from"./Curtain-0eaed5fd.js";import{r as o}from"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";const s=r=>{const[h,b]=o.useState(0),[f,i]=o.useState(!1),y=async()=>{b(n=>n+1),i(!0),await new Promise(n=>setTimeout(n,1e3)),i(!1)};return e.jsxs("div",{children:[e.jsx("header",{children:"This is a header that will not be overlapped by absolute curtain"}),e.jsx("div",{style:{position:"relative"},children:e.jsxs(g,{...r,visible:f,children:["This is the page contents: ",h,e.jsx("br",{}),e.jsx("button",{onClick:y,children:"Click me to increment the counter"})]})})]})};try{s.displayName="Layout",s.__docgenInfo={description:"",displayName:"Layout",props:{autoSwitch:{defaultValue:null,description:"",name:"autoSwitch",required:!1,type:{name:"boolean"}},visible:{defaultValue:null,description:`Whether or not the curtain is visible, while visible the children will not be replaced until the curtain is overlapping everything.
This can for example be turned on once you start a route navigation.`,name:"visible",required:!1,type:{name:"boolean"}},curtainChildren:{defaultValue:null,description:"The element(s) that will be shown on top of the curtain",name:"curtainChildren",required:!1,type:{name:"ReactNode"}},curtainClassName:{defaultValue:null,description:"The class name that will be applied to the curtain element",name:"curtainClassName",required:!1,type:{name:"string"}},duration:{defaultValue:null,description:"Duration in seconds",name:"duration",required:!1,type:{name:"number"}},position:{defaultValue:null,description:`The curtain's css position
Absolute can be used to make the curtain overlap inside the nearest relative ancestor`,name:"position",required:!1,type:{name:"enum",value:[{value:'"fixed"'},{value:'"absolute"'}]}}}}}catch{}const w={title:"Example/Curtain/in layout",component:s,tags:["autodocs"]},t={args:{curtainClassName:"bg-dark",position:"fixed"}},a={args:{curtainClassName:"bg-dark",position:"absolute"}};var l,u,c;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    curtainClassName: 'bg-dark',
    position: 'fixed'
  }
}`,...(c=(u=t.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};var d,p,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    curtainClassName: 'bg-dark',
    position: 'absolute'
  }
}`,...(m=(p=a.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const _=["Fixed","Absolute"];export{a as Absolute,t as Fixed,_ as __namedExportsOrder,w as default};
//# sourceMappingURL=CurtainLayout.stories-408d6908.js.map
