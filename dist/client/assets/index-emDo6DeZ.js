const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-B50kbnQL.js","assets/index-B18p0EaD.js","assets/index-WDjUqhf-.css","assets/TrainPiano-D1vt8LNw.js"])))=>i.map(i=>d[i]);
import{r as o,j as e,_ as v,R as m,a as l}from"./index-B18p0EaD.js";const D="_container_138gg_1",K="_piano_138gg_11",R="_keys_138gg_19",A="_whiteKey_138gg_24",V="_blackKey_138gg_38",F="_notationSystem_138gg_63",O="_tutorialBox_138gg_64",G="_score_138gg_65",M="_highlighted_138gg_77",z="_staff_138gg_104",I="_staffLine_138gg_115",U="_clef_138gg_122",W="_note_138gg_129",H="_correct_138gg_145",Y="_incorrect_138gg_149",q="_viewToggle_138gg_153",J="_clefToggle_138gg_154",Q="_hidden_138gg_158",t={container:D,piano:K,keys:R,whiteKey:A,blackKey:V,notationSystem:F,tutorialBox:O,score:G,highlighted:M,staff:z,staffLine:I,clef:U,note:W,correct:H,incorrect:Y,viewToggle:q,clefToggle:J,hidden:Q},c=["C","D","E","F","G","A","B"],C=["Do","Ré","Mi","Fa","Sol","La","Si"],X={treble:{C:220,D:200,E:180,F:160,G:140,A:120,B:100},bass:{C:160,D:140,E:120,F:100,G:80,A:60,B:40}},N=()=>{const[i,k]=o.useState("letters"),[a,S]=o.useState("piano"),[d,b]=o.useState("treble"),[w,_]=o.useState(0),[r,T]=o.useState(null),[$,g]=o.useState("Welcome to Piano Notes Challenge! Select your preferred notation system to begin.");o.useEffect(()=>{P()},[a,d,r]);const f=s=>{k(s),g(`Great! You've selected ${s==="letters"?"Letter":"Solfège"} notation. Click 'Start Challenge' to begin learning notes!`)},x=s=>{S(s)},j=s=>{b(s)},L=()=>{_(0),u()},u=()=>{const s=Math.floor(Math.random()*7);T(s);const n=i==="letters"?c[s]:C[s];g(`Find and click ${n} on the ${a}!`)},h=s=>{s===r?(_(n=>n+10),g(e.jsx("span",{style:{color:"green"},children:"Correct! Well done!"})),setTimeout(u,1e3)):g(e.jsx("span",{style:{color:"red"},children:"Try again! That's not the correct note."}))},P=()=>{},E=()=>c.map((s,n)=>e.jsxs("div",{children:[e.jsx("div",{className:`${t.whiteKey} ${r===n?t.highlighted:""}`,onClick:()=>h(n),children:i==="letters"?c[n]:C[n]}),n!==2&&n!==6&&e.jsx("div",{className:t.blackKey,onClick:()=>h(`${n}s`)})]},n)),B=()=>Object.entries(X[d]).map(([s,n],p)=>e.jsx("div",{className:`${t.note} ${r===c.indexOf(s)?t.highlighted:""}`,style:{top:`${n}px`,left:`${150+p*60}px`},onClick:()=>h(c.indexOf(s))},p));return e.jsxs("div",{className:t.container,children:[e.jsx("h1",{children:"Learn Piano Notes"}),e.jsxs("div",{className:t.notationSystem,children:[e.jsx("button",{onClick:()=>f("letters"),children:"Use Letters (A, B, C...)"}),e.jsx("button",{onClick:()=>f("solfege"),children:"Use Solfège (Do, Ré, Mi...)"})]}),e.jsxs("div",{className:t.viewToggle,children:[e.jsx("button",{onClick:()=>x("piano"),children:"Piano View"}),e.jsx("button",{onClick:()=>x("staff"),children:"Staff View"})]}),e.jsxs("div",{className:t.clefToggle,children:[e.jsx("button",{onClick:()=>j("treble"),children:"Treble Clef"}),e.jsx("button",{onClick:()=>j("bass"),children:"Bass Clef"})]}),e.jsx("div",{className:t.tutorialBox,children:$}),e.jsxs("div",{className:t.score,children:["Score: ",e.jsx("span",{children:w})]}),e.jsx("div",{className:`${t.piano} ${a!=="piano"?t.hidden:""}`,children:e.jsx("div",{className:t.keys,children:E()})}),e.jsxs("div",{className:`${t.staff} ${a!=="staff"?t.hidden:""}`,children:[e.jsx("div",{className:t.clef,children:d==="treble"?"𝄞":"𝄢"}),[40,80,120,160,200].map((s,n)=>e.jsx("div",{className:t.staffLine,style:{top:`${s}px`}},n)),e.jsx("div",{className:t.notesContainer,children:B()})]}),e.jsx("button",{onClick:L,children:"Start Challenge"})]})},y=o.lazy(()=>v(()=>import("./Home-B50kbnQL.js"),__vite__mapDeps([0,1,2]))),Z=o.lazy(()=>v(()=>import("./TrainPiano-D1vt8LNw.js"),__vite__mapDeps([3,1,2]))),te=({isMobile:i})=>i?e.jsx(o.Suspense,{fallback:e.jsx("div",{children:"Loading..."}),children:e.jsxs(m,{children:[e.jsx(l,{path:"/",element:e.jsx(y,{})}),e.jsx(l,{path:"/trainpiano",element:e.jsx("div",{children:"Not Supported Now - Please check the app in Desktop"})}),e.jsx(l,{path:"/dailychallenge",element:e.jsx(N,{})})]})}):e.jsx(o.Suspense,{fallback:e.jsx("div",{children:"Loading..."}),children:e.jsxs(m,{children:[e.jsx(l,{path:"/",element:e.jsx(y,{})}),e.jsx(l,{path:"/trainpiano",element:e.jsx(Z,{})}),e.jsx(l,{path:"/dailychallenge",element:e.jsx(N,{})})]})});export{te as Router};
