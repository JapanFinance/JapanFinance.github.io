"use strict";(self.webpackChunkjapanfinance_wiki=self.webpackChunkjapanfinance_wiki||[]).push([["2578"],{8010:function(t,e,a){function r(t,e){t.accDescr&&e.setAccDescription?.(t.accDescr),t.accTitle&&e.setAccTitle?.(t.accTitle),t.title&&e.setDiagramTitle?.(t.title)}a.d(e,{A:function(){return r}}),(0,a(4146).eW)(r,"populateCommonDb")},8088:function(t,e,a){a.d(e,{diagram:function(){return C}});var r=a(8010),l=a(8394),o=a(9356),i=a(4146),n=a(3194),c={packet:[]},s=structuredClone(c),d=i.vZ.packet,k=(0,i.eW)(()=>{let t=(0,l.Rb)({...d,...(0,i.iE)().packet});return t.showBits&&(t.paddingY+=10),t},"getConfig"),p=(0,i.eW)(()=>s.packet,"getPacket"),b={pushWord:(0,i.eW)(t=>{t.length>0&&s.packet.push(t)},"pushWord"),getPacket:p,getConfig:k,clear:(0,i.eW)(()=>{(0,i.ZH)(),s=structuredClone(c)},"clear"),setAccTitle:i.GN,getAccTitle:i.eu,setDiagramTitle:i.g2,getDiagramTitle:i.Kr,getAccDescription:i.Mx,setAccDescription:i.U$},f=(0,i.eW)(t=>{(0,r.A)(t,b);let e=-1,a=[],l=1,{bitsPerRow:o}=b.getConfig();for(let{start:r,end:n,label:c}of t.blocks){if(n&&n<r)throw Error(`Packet block ${r} - ${n} is invalid. End must be greater than start.`);if(r!==e+1)throw Error(`Packet block ${r} - ${n??r} is not contiguous. It should start from ${e+1}.`);for(e=n??r,i.cM.debug(`Packet block ${r} - ${e} with label ${c}`);a.length<=o+1&&b.getPacket().length<1e4;){let[t,e]=u({start:r,end:n,label:c},l,o);if(a.push(t),t.end+1===l*o&&(b.pushWord(a),a=[],l++),!e)break;({start:r,end:n,label:c}=e)}}b.pushWord(a)},"populate"),u=(0,i.eW)((t,e,a)=>{if(void 0===t.end&&(t.end=t.start),t.start>t.end)throw Error(`Block start ${t.start} is greater than block end ${t.end}.`);return t.end+1<=e*a?[t,void 0]:[{start:t.start,end:e*a-1,label:t.label},{start:e*a,end:t.end,label:t.label}]},"getNextFittingBlock"),g={parse:(0,i.eW)(async t=>{let e=await (0,n.Qc)("packet",t);i.cM.debug(e),f(e)},"parse")},h=(0,i.eW)((t,e,a,r)=>{let l=r.db,n=l.getConfig(),{rowHeight:c,paddingY:s,bitWidth:d,bitsPerRow:k}=n,p=l.getPacket(),b=l.getDiagramTitle(),f=c+s,u=f*(p.length+1)-(b?0:c),g=d*k+2,h=(0,o.P)(e);for(let[t,e]of(h.attr("viewbox",`0 0 ${g} ${u}`),(0,i.v2)(h,u,g,n.useMaxWidth),p.entries()))x(h,e,t,n);h.append("text").text(b).attr("x",g/2).attr("y",u-f/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),x=(0,i.eW)((t,e,a,{rowHeight:r,paddingX:l,paddingY:o,bitWidth:i,bitsPerRow:n,showBits:c})=>{let s=t.append("g"),d=a*(r+o)+o;for(let t of e){let e=t.start%n*i+1,a=(t.end-t.start+1)*i-l;if(s.append("rect").attr("x",e).attr("y",d).attr("width",a).attr("height",r).attr("class","packetBlock"),s.append("text").attr("x",e+a/2).attr("y",d+r/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(t.label),!c)continue;let o=t.end===t.start,k=d-2;s.append("text").attr("x",e+(o?a/2:0)).attr("y",k).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",o?"middle":"start").text(t.start),o||s.append("text").attr("x",e+a).attr("y",k).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(t.end)}},"drawWord"),$={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},C={parser:g,db:b,renderer:{draw:h},styles:(0,i.eW)(({packet:t}={})=>{let e=(0,l.Rb)($,t);return`
	.packetByte {
		font-size: ${e.byteFontSize};
	}
	.packetByte.start {
		fill: ${e.startByteColor};
	}
	.packetByte.end {
		fill: ${e.endByteColor};
	}
	.packetLabel {
		fill: ${e.labelColor};
		font-size: ${e.labelFontSize};
	}
	.packetTitle {
		fill: ${e.titleColor};
		font-size: ${e.titleFontSize};
	}
	.packetBlock {
		stroke: ${e.blockStrokeColor};
		stroke-width: ${e.blockStrokeWidth};
		fill: ${e.blockFillColor};
	}
	`},"styles")}}}]);