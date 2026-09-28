(function(){
'use strict';
var NS='http://www.w3.org/2000/svg';
var INK='#1B2033',PAPER='#F4EBDD';
var CARDS=[
  {id:'lantern',title:'Paper Lantern',type:'Goods',sub:'Craft',cost:2,color:'#E8A33D',shape:'circle',no:'04',
   rules:['Gain 1 coin for each Goods','card in your stall.','','Two lanterns side by side','score 1 extra point.']},
  {id:'spice',title:'Spice Merchant',type:'Trader',sub:'Merchant',cost:3,color:'#2F8F83',shape:'triangle',no:'17',
   rules:['Swap one card in your hand','with any card in the market.','','Use once per round.']},
  {id:'rain',title:'Night Rain',type:'Event',sub:'Weather',cost:0,color:'#5A5FC8',shape:'diamond',no:'41',
   rules:['Every player discards one','Goods card from their stall.','','Stalls with an awning','are protected.']},
  {id:'silk',title:'Silk Stall',type:'Stall',sub:'Building',cost:4,color:'#C24A55',shape:'square',no:'52',
   rules:['Holds up to three Goods.','','End of game: score 2 points','for every full Silk Stall.']},
  {id:'back',back:true}
];
var st={card:'lantern',view:'print',ov:{bleed:true,trim:true,safe:true,zones:false},vis:'none',arm:false,
        size:'63x88',stock:0.31,count:60,rx:-16,ry:-32};
var uid=0;
function $(s){return document.querySelector(s)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

/* ---------- art ---------- */
function art(id,u){
  var s='';
  if(id==='lantern'){
    s+='<rect width="57" height="40" fill="url(#sky'+u+')"/>';
    for(var i=0;i<14;i++){s+='<circle cx="'+((i*13.7)%57)+'" cy="'+((i*7.3)%22+2)+'" r="'+(i%3?0.25:0.4)+'" fill="#FFF3D6" opacity=".8"/>'}
    s+='<path d="M-2 9 Q28.5 19 59 7" stroke="#2A2F45" stroke-width=".5" fill="none"/>';
    [[10,11.5,4.6],[28.5,15,6],[47,10.6,4.2]].forEach(function(l){
      s+='<line x1="'+l[0]+'" y1="'+(l[1]-3)+'" x2="'+l[0]+'" y2="'+(l[1]-l[2]+.5)+'" stroke="#2A2F45" stroke-width=".4"/>';
      s+='<circle cx="'+l[0]+'" cy="'+(l[1]+l[2]*.4)+'" r="'+(l[2]*1.9)+'" fill="#FFB84D" opacity=".18"/>';
      s+='<ellipse cx="'+l[0]+'" cy="'+(l[1]+l[2]*.4)+'" rx="'+(l[2]*.82)+'" ry="'+l[2]+'" fill="url(#lan'+u+')"/>';
      s+='<rect x="'+(l[0]-l[2]*.35)+'" y="'+(l[1]-l[2]*.62)+'" width="'+(l[2]*.7)+'" height="1.1" rx=".3" fill="#7A2E1F"/>';
      s+='<rect x="'+(l[0]-l[2]*.35)+'" y="'+(l[1]+l[2]*1.3)+'" width="'+(l[2]*.7)+'" height="1.1" rx=".3" fill="#7A2E1F"/>';
    });
    s+='<path d="M0 34 L10 29 L19 33 L31 27 L44 32 L57 28 L57 40 L0 40Z" fill="#141827"/>';
  }
  if(id==='spice'){
    s+='<rect width="57" height="40" fill="#233B45"/><rect y="28" width="57" height="12" fill="#1A2B33"/>';
    for(var k=0;k<7;k++)s+='<path d="M'+(k*8.2)+' 6 h8.2 v6 q-4.1 3 -8.2 0Z" fill="'+(k%2?'#F4EBDD':'#2F8F83')+'"/>';
    s+='<rect x="0" y="4.5" width="57" height="1.6" fill="#8C5A2B"/>';
    s+='<rect x="4" y="22" width="49" height="6.5" fill="#8C5A2B"/><rect x="4" y="21" width="49" height="1.2" fill="#A8713C"/>';
    [['#D9822B',8],['#C23B22',15],['#E8C547',22],['#6B8E23',37],['#B5651D',44]].forEach(function(j){
      s+='<rect x="'+j[1]+'" y="15.5" width="5" height="5.5" rx="1" fill="#F4EBDD" opacity=".9"/><rect x="'+j[1]+'" y="18" width="5" height="3" rx=".8" fill="'+j[0]+'"/>';
    });
    s+='<circle cx="30.5" cy="13.2" r="2.6" fill="#141827"/><path d="M26.2 21 Q30.5 14.5 34.8 21Z" fill="#141827"/>';
    s+='<circle cx="52" cy="10" r="4" fill="#FFB84D" opacity=".25"/><ellipse cx="52" cy="10" rx="1.6" ry="2" fill="#FFB84D"/>';
  }
  if(id==='rain'){
    s+='<rect width="57" height="40" fill="url(#rn'+u+')"/>';
    s+='<circle cx="40" cy="15" r="9" fill="#FFB84D" opacity=".12"/><ellipse cx="40" cy="15" rx="2.2" ry="2.8" fill="#FFB84D" opacity=".85"/>';
    s+='<rect x="0" y="27" width="57" height="13" fill="#161A2E"/>';
    s+='<ellipse cx="40" cy="33" rx="6" ry="1.1" fill="#FFB84D" opacity=".35"/><ellipse cx="14" cy="35" rx="8" ry="1" fill="#8F95E6" opacity=".3"/>';
    for(var r=0;r<34;r++){var x=(r*9.1)%60-1,y=(r*5.7)%30;s+='<line x1="'+x+'" y1="'+y+'" x2="'+(x-1.6)+'" y2="'+(y+4.2)+'" stroke="#C9CCF5" stroke-width=".32" opacity=".7"/>'}
  }
  if(id==='silk'){
    s+='<rect width="57" height="40" fill="#2B1A26"/>';
    s+='<path d="M-2 8 C12 2 20 18 34 10 S52 4 60 12 L60 20 C48 14 40 26 26 18 S6 16 -2 22Z" fill="#C24A55"/>';
    s+='<path d="M-2 18 C14 12 22 28 36 20 S54 16 60 24 L60 30 C46 24 38 36 24 28 S6 26 -2 32Z" fill="#E8A33D" opacity=".9"/>';
    s+='<path d="M-2 27 C10 23 24 36 38 29 S54 26 60 33 L60 40 L-2 40Z" fill="#7E2E45"/>';
    s+='<path d="M-2 8 C12 2 20 18 34 10 S52 4 60 12" stroke="#F4EBDD" stroke-width=".35" fill="none" opacity=".6"/>';
  }
  return s;
}
function shapeIcon(shape,cx,cy,r,color){
  if(shape==='circle')return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+color+'" stroke="'+PAPER+'" stroke-width=".5"/>';
  if(shape==='square')return '<rect x="'+(cx-r*.85)+'" y="'+(cy-r*.85)+'" width="'+(r*1.7)+'" height="'+(r*1.7)+'" fill="'+color+'" stroke="'+PAPER+'" stroke-width=".5"/>';
  if(shape==='triangle')return '<path d="M'+cx+' '+(cy-r)+' L'+(cx+r)+' '+(cy+r*.8)+' L'+(cx-r)+' '+(cy+r*.8)+'Z" fill="'+color+'" stroke="'+PAPER+'" stroke-width=".5"/>';
  return '<path d="M'+cx+' '+(cy-r)+' L'+(cx+r)+' '+cy+' L'+cx+' '+(cy+r)+' L'+(cx-r)+' '+cy+'Z" fill="'+color+'" stroke="'+PAPER+'" stroke-width=".5"/>';
}
function defs(u){
  return '<defs><linearGradient id="sky'+u+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E2A4A"/><stop offset="1" stop-color="#3B3560"/></linearGradient>'+
    '<radialGradient id="lan'+u+'" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#FFE3A3"/><stop offset=".6" stop-color="#F59A3C"/><stop offset="1" stop-color="#C8502A"/></radialGradient>'+
    '<linearGradient id="rn'+u+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#262B55"/><stop offset="1" stop-color="#3A3F74"/></linearGradient>'+
    '<clipPath id="aw'+u+'"><rect x="6" y="16" width="57" height="40" rx="1.5"/></clipPath>'+
    '<clipPath id="cut'+u+'"><rect x="3" y="3" width="63" height="88" rx="3.2"/></clipPath></defs>';
}
function backArt(){
  var s='<rect width="69" height="94" fill="'+INK+'"/>';
  for(var y=0;y<12;y++)for(var x=0;x<9;x++){var cx=x*8+(y%2?4:0)+0.5,cy=y*8.5+2;s+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="1.1" ry="1.4" fill="#E8A33D" opacity=".18"/>'}
  s+='<rect x="8" y="8" width="53" height="78" rx="2.5" fill="none" stroke="#E8A33D" stroke-width=".45" opacity=".8"/>';
  s+='<circle cx="34.5" cy="47" r="14" fill="#FFB84D" opacity=".1"/><ellipse cx="34.5" cy="47" rx="7" ry="8.6" fill="#F59A3C"/><ellipse cx="34.5" cy="47" rx="4.2" ry="8.6" fill="#FFB84D"/>';
  s+='<rect x="31.6" y="37.2" width="5.8" height="1.6" rx=".4" fill="#7A2E1F"/><rect x="31.6" y="55.2" width="5.8" height="1.6" rx=".4" fill="#7A2E1F"/>';
  s+='<text x="34.5" y="22" text-anchor="middle" font-family="Young Serif,Georgia,serif" font-size="4.2" fill="'+PAPER+'">Lantern</text>';
  s+='<text x="34.5" y="75.6" text-anchor="middle" font-family="Young Serif,Georgia,serif" font-size="4.2" fill="'+PAPER+'" transform="rotate(180 34.5 74.2)">Lantern</text>';
  return s;
}
function cardSVG(c,opt){
  var u=++uid,view=opt.view,ov=opt.ov||{};
  var vb=view==='print'?'-7 -7 83 108':'3 3 63 88';
  var s='<svg xmlns="'+NS+'" viewBox="'+vb+'" class="'+(opt.cls||'')+'" role="img" aria-label="'+(c.back?'Card back':esc(c.title)+' card')+'">'+defs(u);
  s+='<g'+(view!=='print'?' clip-path="url(#cut'+u+')"':'')+'>';
  if(c.back){s+=backArt()}else{
    s+='<rect width="69" height="94" fill="'+INK+'"/>';
    s+='<rect x="0" y="0" width="69" height="94" fill="'+c.color+'" opacity=".08"/>';
    s+='<circle cx="10.6" cy="11.2" r="3.7" fill="#E8C547" stroke="#8C5A2B" stroke-width=".45"/>';
    s+='<text x="10.6" y="12.55" text-anchor="middle" font-family="Geist,Arial,sans-serif" font-weight="700" font-size="3.6" fill="'+INK+'">'+c.cost+'</text>';
    s+='<text x="16" y="12.4" font-family="Young Serif,Georgia,serif" font-size="3.55" fill="'+PAPER+'">'+esc(c.title)+'</text>';
    s+=shapeIcon(c.shape,58.4,11.2,3,c.color);
    s+='<g clip-path="url(#aw'+u+')"><g transform="translate(6 16)">'+art(c.id,u)+'</g></g>';
    s+='<rect x="6" y="16" width="57" height="40" rx="1.5" fill="none" stroke="'+c.color+'" stroke-width=".5"/>';
    s+='<rect x="6" y="57.6" width="57" height="4.8" rx="1" fill="'+c.color+'"/>';
    s+='<text x="8.4" y="61" font-family="Geist,Arial,sans-serif" font-weight="600" font-size="2.3" fill="#fff">'+c.type+' - '+c.sub+'</text>';
    s+=shapeIcon(c.shape,60.2,60,1.35,'#fff');
    s+='<rect x="6" y="63.6" width="57" height="21.2" rx="1.2" fill="'+PAPER+'"/>';
    c.rules.forEach(function(l,i){if(l)s+='<text x="9" y="'+(68.6+i*3.4)+'" font-family="Geist,Arial,sans-serif" font-size="2.65" fill="'+INK+'">'+esc(l)+'</text>'});
    s+='<text x="7.5" y="87.4" font-family="Geist,Arial,sans-serif" font-size="2.1" fill="#9BA3B8">'+c.no+' / 60</text>';
    s+='<text x="61.5" y="87.4" text-anchor="end" font-family="Geist,Arial,sans-serif" font-size="2.1" fill="#9BA3B8">Lantern Market</text>';
  }
  s+='</g>';
  if(view==='print'){
    // crop marks
    [[3,-6,3,-1],[66,-6,66,-1],[3,95,3,100],[66,95,66,100],[-6,3,-1,3],[-6,91,-1,91],[70,3,75,3],[70,91,75,91]].forEach(function(m){
      s+='<line x1="'+m[0]+'" y1="'+m[1]+'" x2="'+m[2]+'" y2="'+m[3]+'" stroke="#1D1D1F" stroke-width=".25"/>'});
    if(ov.bleed)s+='<path d="M0 0H69V94H0Z M3 3V91H66V3Z" fill="#E5484D" fill-opacity=".22" fill-rule="evenodd"/>';
  }
  if(ov.trim)s+='<rect x="3" y="3" width="63" height="88" rx="'+(view==='print'?3.2:3.2)+'" fill="none" stroke="#E5484D" stroke-width=".35" stroke-dasharray="1.2 .8"/>';
  if(ov.safe)s+='<rect x="6" y="6" width="57" height="82" rx="1.5" fill="none" stroke="#12A150" stroke-width=".35" stroke-dasharray="1.2 .8"/>';
  if(ov.zones&&!c.back){
    [['Cost',6.6,7.2,8,8],['Title',15.2,7.8,38,6.6],['Type icon',54.6,7.4,7.6,7.6],['Art',6,16,57,40],['Type line',6,57.6,57,4.8],['Rules text 7.5 pt',6,63.6,57,21.2],['Card number',6,85.4,24,2.8]].forEach(function(z){
      s+='<rect x="'+z[1]+'" y="'+z[2]+'" width="'+z[3]+'" height="'+z[4]+'" fill="#0A66FF" fill-opacity=".1" stroke="#0A66FF" stroke-width=".3"/>';
      var tx=z[1]+.8,ty=z[2]+(z[4]>6?2.6:z[4]-.7);
      s+='<rect x="'+(tx-.5)+'" y="'+(ty-2)+'" width="'+(z[0].length*1.05+1)+'" height="2.6" rx=".4" fill="#0A66FF"/>';
      s+='<text x="'+tx+'" y="'+ty+'" font-family="Geist,Arial,sans-serif" font-size="1.9" fill="#fff">'+z[0]+'</text>';
    });
  }
  return s+'</svg>';
}

var NOTES={
  print:'Print file: artwork runs 3 mm past the cut line (red) so small cutting shifts never leave white edges. Text stays inside the safe zone (green).',
  trim:'Cut card: what players actually hold, with the rounded corners from the die cut.',
  hand:'In hand: players fan cards left to right, so cost and title sit top left, where they stay visible even when cards overlap.'
};
function renderCard(){
  var stage=$('#cardstage'),c=CARDS.filter(function(x){return x.id===st.card})[0];
  var vis=st.vis==='none'?'':' vis-'+st.vis;
  stage.classList.toggle('arm',st.arm);
  if(st.view==='hand'){
    var h='<div class="fan'+vis+'">',rot=[-24,-12,0,12,24];
    var sel=c.back?CARDS[0]:c,others=CARDS.slice(0,4).filter(function(x){return x.id!==sel.id});
    while(others.length<4)others.push(CARDS[others.length%4]);
    others.concat([sel]).forEach(function(cc,i){
      var o=cardSVG(cc,{view:'trim',ov:{}});
      h+=o.replace('<svg ','<svg style="transform:rotate('+rot[i]+'deg);z-index:'+i+'" ');
    });
    stage.innerHTML=h+'</div>'+(st.arm?'<div class="armcap">Roughly how it reads across a table</div>':'');
  }else{
    stage.innerHTML=cardSVG(c,{view:st.view,ov:st.ov,cls:'single'+vis})+(st.arm?'<div class="armcap">Roughly how it reads across a table</div>':'');
  }
  $('#cardnote').textContent=NOTES[st.view]+(st.vis!=='none'?' Vision test on: each card type still reads by its icon shape, not just its color.':'');
  document.querySelectorAll('[data-ov]').forEach(function(cb){cb.disabled=st.view==='hand'||(cb.dataset.ov==='bleed'&&st.view!=='print')});
}
function renderPicker(){
  $('#picker').innerHTML=CARDS.map(function(c){
    return '<button role="radio" aria-checked="'+(st.card===c.id)+'" data-card="'+c.id+'" aria-label="'+(c.back?'Card back':esc(c.title))+'">'+cardSVG(c,{view:'trim',ov:{}})+'</button>'}).join('');
}

/* ---------- box ---------- */
function boxDims(){
  var p=st.size.split('x').map(Number);
  var W=p[0]+1,H=p[1]+1,D=Math.round((st.count*st.stock+1.5)*10)/10;
  var tuck=Math.min(15,Math.max(10,Math.round(H*.16))),df=Math.min(Math.max(D*.85,6),14),g=8;
  return {W:W,H:H,D:D,tuck:tuck,df:df,g:g,flatW:2*W+2*D+g,flatH:H+2*(D+tuck)};
}
function renderBox(){
  var d=boxDims();
  $('#countv').textContent=st.count;
  $('#dims').innerHTML='<div><b>'+d.W+' mm</b>inner width</div><div><b>'+d.H+' mm</b>inner height</div><div><b>'+d.D+' mm</b>depth for '+st.count+' cards</div><div><b>'+Math.round(d.flatW)+' x '+Math.round(d.flatH)+'</b>flat sheet, mm</div>';
  // 3D
  var k=Math.min(2.1,180/d.H,150/d.W),w=d.W*k,h=d.H*k,dp=Math.max(d.D*k,6);
  var cube=$('#cube');
  var front='<svg viewBox="0 0 64 89" preserveAspectRatio="none" style="width:100%;height:100%;display:block">'+
    '<rect width="64" height="89" fill="'+INK+'"/><g transform="translate(3.5 16) scale(1.0)">'+art('lantern','bx')+'</g>'+
    '<defs><linearGradient id="skybx" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E2A4A"/><stop offset="1" stop-color="#3B3560"/></linearGradient><radialGradient id="lanbx" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#FFE3A3"/><stop offset=".6" stop-color="#F59A3C"/><stop offset="1" stop-color="#C8502A"/></radialGradient></defs>'+
    '<text x="32" y="10.5" text-anchor="middle" font-family="Young Serif,Georgia,serif" font-size="6.6" fill="'+PAPER+'">Lantern Market</text>'+
    '<text x="32" y="64" text-anchor="middle" font-family="Geist,Arial,sans-serif" font-size="3" fill="#E8A33D">A card game of night traders</text>'+
    '<line x1="10" y1="72" x2="54" y2="72" stroke="#E8A33D" stroke-width=".3"/>'+
    '<text x="32" y="78.5" text-anchor="middle" font-family="Geist,Arial,sans-serif" font-size="2.8" fill="'+PAPER+'">2-4 players   20 min   Age 10+</text></svg>';
  var bars='';for(var i=0;i<28;i++)bars+='<rect x="'+(40+i*.72)+'" y="70" width="'+(i%3?.3:.5)+'" height="9" fill="#000"/>';
  var back='<svg viewBox="0 0 64 89" preserveAspectRatio="none" style="width:100%;height:100%;display:block"><rect width="64" height="89" fill="'+PAPER+'"/>'+
    '<text x="6" y="12" font-family="Young Serif,Georgia,serif" font-size="4.2" fill="'+INK+'">Trade by lantern light</text>'+
    ['Build stalls, stock goods, and outbid','your rivals before the market closes.','','60 cards, rules sheet'].map(function(t,i){return '<text x="6" y="'+(19+i*3.6)+'" font-family="Geist,Arial,sans-serif" font-size="2.5" fill="'+INK+'">'+t+'</text>'}).join('')+
    '<rect x="6" y="36" width="52" height="24" rx="1.5" fill="'+INK+'"/><g transform="translate(7.5 37) scale(.86 .55)">'+art('spice','bb')+'</g>'+
    '<rect x="38" y="68" width="22" height="14" fill="#fff"/>'+bars+
    '<text x="6" y="72" font-family="Geist,Arial,sans-serif" font-size="2.1" fill="#6E6E73">Barcode and safety</text><text x="6" y="75" font-family="Geist,Arial,sans-serif" font-size="2.1" fill="#6E6E73">marks area</text></svg>';
  var side='<div style="width:100%;height:100%;background:'+INK+';display:grid;place-items:center"><span style="writing-mode:vertical-rl;transform:rotate(180deg);color:'+PAPER+';font-family:Young Serif,Georgia,serif;font-size:'+Math.max(8,Math.min(13,dp*.5))+'px;white-space:nowrap">Lantern Market</span></div>';
  var top='<div style="width:100%;height:100%;background:#E8A33D"></div>';
  function face(wd,ht,tr,inner){return '<div class="face" style="width:'+wd+'px;height:'+ht+'px;margin-left:'+(-wd/2)+'px;margin-top:'+(-ht/2)+'px;transform:'+tr+'">'+inner+'</div>'}
  cube.style.width='0px';cube.style.height='0px';
  cube.innerHTML=face(w,h,'translateZ('+dp/2+'px)',front)+face(w,h,'rotateY(180deg) translateZ('+dp/2+'px)',back)+
    face(dp,h,'rotateY(90deg) translateZ('+w/2+'px)',side)+face(dp,h,'rotateY(-90deg) translateZ('+w/2+'px)',side)+
    face(w,dp,'rotateX(90deg) translateZ('+h/2+'px)',top)+face(w,dp,'rotateX(-90deg) translateZ('+h/2+'px)',top);
  applyRot();
  renderDieline(d);
}
function applyRot(){$('#cube').style.transform='rotateX('+st.rx+'deg) rotateY('+st.ry+'deg)'}
function r1(n){return Math.round(n*10)/10}
function renderDieline(d){
  var W=d.W,H=d.H,D=d.D,t=d.tuck,df=d.df,g=d.g,m=8;
  var y0=D+t,y1=y0+H,xS1=W,xB=W+D,xS2=2*W+D,xG=2*W+2*D,xe=xG+g,rc=Math.min(4,t*.4);
  var P=[
    'M0 '+y0,'L'+xS1+' '+y0,
    'L'+(xS1+1.5)+' '+(y0-df),'L'+(xB-1.5)+' '+(y0-df),'L'+xB+' '+y0,
    'L'+xB+' '+(y0-D),'L'+(xB+1)+' '+(y0-D),'L'+(xB+1)+' '+(y0-D-t+rc),'Q'+(xB+1)+' '+(y0-D-t)+' '+(xB+1+rc)+' '+(y0-D-t),
    'L'+(xS2-1-rc)+' '+(y0-D-t),'Q'+(xS2-1)+' '+(y0-D-t)+' '+(xS2-1)+' '+(y0-D-t+rc),'L'+(xS2-1)+' '+(y0-D),'L'+xS2+' '+(y0-D),'L'+xS2+' '+y0,
    'L'+(xS2+1.5)+' '+(y0-df),'L'+(xG-1.5)+' '+(y0-df),'L'+xG+' '+y0,
    'L'+xe+' '+(y0+4),'L'+xe+' '+(y1-4),'L'+xG+' '+y1,
    'L'+(xG-1.5)+' '+(y1+df),'L'+(xS2+1.5)+' '+(y1+df),'L'+xS2+' '+y1,
    'L'+xS2+' '+(y1+D),'L'+(xS2-1)+' '+(y1+D),'L'+(xS2-1)+' '+(y1+D+t-rc),'Q'+(xS2-1)+' '+(y1+D+t)+' '+(xS2-1-rc)+' '+(y1+D+t),
    'L'+(xB+1+rc)+' '+(y1+D+t),'Q'+(xB+1)+' '+(y1+D+t)+' '+(xB+1)+' '+(y1+D+t-rc),'L'+(xB+1)+' '+(y1+D),'L'+xB+' '+(y1+D),'L'+xB+' '+y1,
    'L'+(xB-1.5)+' '+(y1+df),'L'+(xS1+1.5)+' '+(y1+df),'L'+xS1+' '+y1,
    'L0 '+y1,'Z'].join(' ');
  var folds=[[xS1,y0,xS1,y1],[xB,y0,xB,y1],[xS2,y0,xS2,y1],[xG,y0,xG,y1],
    [xS1,y0,xB,y0],[xB,y0,xS2,y0],[xS2,y0,xG,y0],[xB+1,y0-D,xS2-1,y0-D],
    [xS1,y1,xB,y1],[xB,y1,xS2,y1],[xS2,y1,xG,y1],[xB+1,y1+D,xS2-1,y1+D]];
  var fs=Math.max(3.2,Math.min(5,W/12));
  function lbl(x,y,tx,small){return '<text x="'+r1(x)+'" y="'+r1(y)+'" text-anchor="middle" dominant-baseline="middle" font-family="Geist,Arial,sans-serif" font-size="'+(small?fs*.75:fs)+'" fill="#6E6E73">'+tx+'</text>'}
  var vbw=xe+2*m,vbh=d.flatH+2*m+8;
  var s='<svg viewBox="'+(-m)+' '+(-m)+' '+vbw+' '+vbh+'" role="img" aria-label="Tuck box dieline">';
  s+='<path d="'+P+'" fill="none" stroke="#FBD5D8" stroke-width="6" stroke-linejoin="round"/>';
  s+='<path d="'+P+'" fill="#FAFAFB" stroke="#1D1D1F" stroke-width=".5" stroke-linejoin="round"/>';
  folds.forEach(function(f){s+='<line x1="'+r1(f[0])+'" y1="'+r1(f[1])+'" x2="'+r1(f[2])+'" y2="'+r1(f[3])+'" stroke="#0A66FF" stroke-width=".45" stroke-dasharray="2 1.4"/>'});
  s+=lbl(W/2,y0+H/2,'Front')+lbl(xB+W/2,y0+H/2,'Back')+lbl(xS1+D/2,y0+H/2,D>9?'Side':'',true)+lbl(xS2+D/2,y0+H/2,D>9?'Side':'',true)+lbl(xG+g/2,y0+H/2,'',true);
  s+=lbl(xB+W/2,y0-D/2,'Top',true)+lbl(xB+W/2,y0-D-t/2,'Tuck flap',true)+lbl(xB+W/2,y1+D/2,'Bottom',true)+lbl(xB+W/2,y1+D+t/2,'Tuck flap',true);
  // dimension lines
  var dy=d.flatH+5;
  s+='<line x1="0" y1="'+r1(dy)+'" x2="'+r1(xe)+'" y2="'+r1(dy)+'" stroke="#6E6E73" stroke-width=".3"/><line x1="0" y1="'+r1(dy-1.5)+'" x2="0" y2="'+r1(dy+1.5)+'" stroke="#6E6E73" stroke-width=".3"/><line x1="'+r1(xe)+'" y1="'+r1(dy-1.5)+'" x2="'+r1(xe)+'" y2="'+r1(dy+1.5)+'" stroke="#6E6E73" stroke-width=".3"/>';
  s+='<text x="'+r1(xe/2)+'" y="'+r1(dy+4.2)+'" text-anchor="middle" font-family="Geist,Arial,sans-serif" font-size="'+fs*.8+'" fill="#6E6E73">'+Math.round(d.flatW)+' mm flat width, glue flap on the right</text>';
  s+='</svg>';
  $('#dieline').innerHTML=s;
}

/* ---------- events ---------- */
document.addEventListener('click',function(e){
  var b=e.target.closest('button');if(!b)return;
  if(b.dataset.page){showPage(b.dataset.page);return}
  if(b.dataset.card){st.card=b.dataset.card;if(st.view==='hand'&&st.card==='back')st.view='trim';syncSeg();renderPicker();renderCard();return}
  if(b.dataset.view){st.view=b.dataset.view;syncSeg();renderCard();return}
  if(b.dataset.vis){st.vis=b.dataset.vis;syncSeg();renderCard();return}
});
function syncSeg(){
  document.querySelectorAll('[data-view]').forEach(function(x){x.setAttribute('aria-checked',String(x.dataset.view===st.view))});
  document.querySelectorAll('[data-vis]').forEach(function(x){x.setAttribute('aria-checked',String(x.dataset.vis===st.vis))});
}
document.addEventListener('change',function(e){
  var t=e.target;
  if(t.dataset.ov){st.ov[t.dataset.ov]=t.checked;renderCard()}
  if(t.id==='arm'){st.arm=t.checked;renderCard()}
  if(t.id==='csize'){st.size=t.value;renderBox()}
  if(t.id==='stock'){st.stock=parseFloat(t.value);renderBox()}
});
$('#count').addEventListener('input',function(){st.count=+this.value;renderBox()});

var stage=$('#boxstage'),drag=null;
stage.addEventListener('pointerdown',function(e){drag={x:e.clientX,y:e.clientY,rx:st.rx,ry:st.ry};stage.setPointerCapture(e.pointerId)});
stage.addEventListener('pointermove',function(e){if(!drag)return;st.ry=drag.ry+(e.clientX-drag.x)*.6;st.rx=Math.max(-60,Math.min(40,drag.rx-(e.clientY-drag.y)*.4));applyRot()});
stage.addEventListener('pointerup',function(){drag=null});
stage.addEventListener('pointercancel',function(){drag=null});

function showPage(p){
  ['demo','spec','plan'].forEach(function(id){
    $('#'+id).hidden=id!==p;
    document.querySelector('[data-page="'+id+'"]').setAttribute('aria-selected',String(id===p));
  });
  try{history.replaceState(null,'','#'+p)}catch(err){}
  window.scrollTo(0,0);
}
document.querySelector('.tabs').addEventListener('keydown',function(e){
  if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;
  var tabs=[].slice.call(this.querySelectorAll('[role=tab]')),i=tabs.indexOf(document.activeElement);
  if(i<0)return;var n=tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length];n.focus();n.click();
});

renderPicker();renderCard();renderBox();
var h=(location.hash||'').slice(1);if(h==='spec'||h==='plan')showPage(h);
})();
