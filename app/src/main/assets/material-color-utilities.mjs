/* esm.sh - @material/material-color-utilities@0.3.0 */
function V(e){return e<0?-1:e===0?0:1}function ot(e,t,r){return(1-r)*e+r*t}function te(e,t,r){return r<e?e:r>t?t:r}function lt(e,t,r){return r<e?e:r>t?t:r}function ht(e){return e=e%360,e<0&&(e=e+360),e}function E(e){return e=e%360,e<0&&(e=e+360),e}function ee(e,t){return E(t-e)<=180?1:-1}function It(e,t){return 180-Math.abs(Math.abs(e-t)-180)}function ft(e,t){let r=e[0]*t[0][0]+e[1]*t[0][1]+e[2]*t[0][2],n=e[0]*t[1][0]+e[1]*t[1][1]+e[2]*t[1][2],o=e[0]*t[2][0]+e[1]*t[2][1]+e[2]*t[2][2];return[r,n,o]}var re=[[.41233895,.35762064,.18051042],[.2126,.7152,.0722],[.01932141,.11916382,.95034478]],xe=[[3.2413774792388685,-1.5376652402851851,-.49885366846268053],[-.9691452513005321,1.8758853451067872,.04156585616912061],[.05562093689691305,-.20395524564742123,1.0571799111220335]],Ut=[95.047,100,108.883];function gt(e,t,r){return(255<<24|(e&255)<<16|(t&255)<<8|r&255)>>>0}function Gt(e){let t=at(e[0]),r=at(e[1]),n=at(e[2]);return gt(t,r,n)}function wt(e){return e>>24&255}function st(e){return e>>16&255}function it(e){return e>>8&255}function ct(e){return e&255}function we(e){return wt(e)>=255}function qt(e,t,r){let n=xe,o=n[0][0]*e+n[0][1]*t+n[0][2]*r,s=n[1][0]*e+n[1][1]*t+n[1][2]*r,a=n[2][0]*e+n[2][1]*t+n[2][2]*r,c=at(o),h=at(s),m=at(a);return gt(c,h,m)}function Ce(e){let t=Z(st(e)),r=Z(it(e)),n=Z(ct(e));return ft([t,r,n],re)}function ne(e,t,r){let n=Ut,o=(e+16)/116,s=t/500+o,a=o-r/200,c=Tt(s),h=Tt(o),m=Tt(a),l=c*n[0],p=h*n[1],y=m*n[2];return qt(l,p,y)}function Ft(e){let t=Z(st(e)),r=Z(it(e)),n=Z(ct(e)),o=re,s=o[0][0]*t+o[0][1]*r+o[0][2]*n,a=o[1][0]*t+o[1][1]*r+o[1][2]*n,c=o[2][0]*t+o[2][1]*r+o[2][2]*n,h=Ut,m=s/h[0],l=a/h[1],p=c/h[2],y=pt(m),f=pt(l),g=pt(p),u=116*f-16,b=500*(y-f),I=200*(f-g);return[u,b,I]}function oe(e){let t=$(e),r=at(t);return gt(r,r,r)}function dt(e){let t=Ce(e)[1];return 116*pt(t/100)-16}function $(e){return 100*Tt((e+16)/116)}function yt(e){return pt(e/100)*116-16}function Z(e){let t=e/255;return t<=.040449936?t/12.92*100:Math.pow((t+.055)/1.055,2.4)*100}function at(e){let t=e/100,r=0;return t<=.0031308?r=t*12.92:r=1.055*Math.pow(t,1/2.4)-.055,te(0,255,Math.round(r*255))}function ae(){return Ut}function Fe(e){let t=st(e),r=it(e),n=ct(e),o=wt(e);return{r:t,g:r,b:n,a:o}}function Be({r:e,g:t,b:r,a:n}){let o=Dt(e),s=Dt(t),a=Dt(r);return Dt(n)<<24|o<<16|s<<8|a}function Dt(e){return e<0?0:e>255?255:e}function pt(e){let t=.008856451679035631,r=24389/27;return e>t?Math.pow(e,1/3):(r*e+16)/116}function Tt(e){let t=.008856451679035631,r=24389/27,n=e*e*e;return n>t?n:(116*e-16)/r}var j=class e{static make(t=ae(),r=200/Math.PI*$(50)/100,n=50,o=2,s=!1){let a=t,c=a[0]*.401288+a[1]*.650173+a[2]*-.051461,h=a[0]*-.250268+a[1]*1.204414+a[2]*.045854,m=a[0]*-.002079+a[1]*.048952+a[2]*.953127,l=.8+o/10,p=l>=.9?ot(.59,.69,(l-.9)*10):ot(.525,.59,(l-.8)*10),y=s?1:l*(1-1/3.6*Math.exp((-r-42)/92));y=y>1?1:y<0?0:y;let f=l,g=[y*(100/c)+1-y,y*(100/h)+1-y,y*(100/m)+1-y],u=1/(5*r+1),b=u*u*u*u,I=1-b,d=b*r+.1*I*I*Math.cbrt(5*r),x=$(n)/t[1],T=1.48+Math.sqrt(x),D=.725/Math.pow(x,.2),S=D,C=[Math.pow(d*g[0]*c/100,.42),Math.pow(d*g[1]*h/100,.42),Math.pow(d*g[2]*m/100,.42)],M=[400*C[0]/(C[0]+27.13),400*C[1]/(C[1]+27.13),400*C[2]/(C[2]+27.13)],F=(2*M[0]+M[1]+.05*M[2])*D;return new e(x,F,D,S,p,f,g,d,Math.pow(d,.25),T)}constructor(t,r,n,o,s,a,c,h,m,l){this.n=t,this.aw=r,this.nbb=n,this.ncb=o,this.c=s,this.nc=a,this.rgbD=c,this.fl=h,this.fLRoot=m,this.z=l}};j.DEFAULT=j.make();var U=class e{constructor(t,r,n,o,s,a,c,h,m){this.hue=t,this.chroma=r,this.j=n,this.q=o,this.m=s,this.s=a,this.jstar=c,this.astar=h,this.bstar=m}distance(t){let r=this.jstar-t.jstar,n=this.astar-t.astar,o=this.bstar-t.bstar,s=Math.sqrt(r*r+n*n+o*o);return 1.41*Math.pow(s,.63)}static fromInt(t){return e.fromIntInViewingConditions(t,j.DEFAULT)}static fromIntInViewingConditions(t,r){let n=(t&16711680)>>16,o=(t&65280)>>8,s=t&255,a=Z(n),c=Z(o),h=Z(s),m=.41233895*a+.35762064*c+.18051042*h,l=.2126*a+.7152*c+.0722*h,p=.01932141*a+.11916382*c+.95034478*h,y=.401288*m+.650173*l-.051461*p,f=-.250268*m+1.204414*l+.045854*p,g=-.002079*m+.048952*l+.953127*p,u=r.rgbD[0]*y,b=r.rgbD[1]*f,I=r.rgbD[2]*g,d=Math.pow(r.fl*Math.abs(u)/100,.42),x=Math.pow(r.fl*Math.abs(b)/100,.42),T=Math.pow(r.fl*Math.abs(I)/100,.42),D=V(u)*400*d/(d+27.13),S=V(b)*400*x/(x+27.13),C=V(I)*400*T/(T+27.13),M=(11*D+-12*S+C)/11,F=(D+S-2*C)/9,w=(20*D+20*S+21*C)/20,z=(40*D+20*S+C)/20,Y=Math.atan2(F,M)*180/Math.PI,v=Y<0?Y+360:Y>=360?Y-360:Y,nt=v*Math.PI/180,At=z*r.nbb,et=100*Math.pow(At/r.aw,r.c*r.z),kt=4/r.c*Math.sqrt(et/100)*(r.aw+4)*r.fLRoot,Lt=v<20.14?v+360:v,Vt=.25*(Math.cos(Lt*Math.PI/180+2)+3.8),Nt=5e4/13*Vt*r.nc*r.ncb*Math.sqrt(M*M+F*F)/(w+.305),Mt=Math.pow(Nt,.9)*Math.pow(1.64-Math.pow(.29,r.n),.73),Xt=Mt*Math.sqrt(et/100),Zt=Xt*r.fLRoot,ge=50*Math.sqrt(Mt*r.c/(r.aw+4)),de=(1+100*.007)*et/(1+.007*et),Qt=1/.0228*Math.log(1+.0228*Zt),ye=Qt*Math.cos(nt),Pe=Qt*Math.sin(nt);return new e(v,Xt,et,kt,Zt,ge,de,ye,Pe)}static fromJch(t,r,n){return e.fromJchInViewingConditions(t,r,n,j.DEFAULT)}static fromJchInViewingConditions(t,r,n,o){let s=4/o.c*Math.sqrt(t/100)*(o.aw+4)*o.fLRoot,a=r*o.fLRoot,c=r/Math.sqrt(t/100),h=50*Math.sqrt(c*o.c/(o.aw+4)),m=n*Math.PI/180,l=(1+100*.007)*t/(1+.007*t),p=1/.0228*Math.log(1+.0228*a),y=p*Math.cos(m),f=p*Math.sin(m);return new e(n,r,t,s,a,h,l,y,f)}static fromUcs(t,r,n){return e.fromUcsInViewingConditions(t,r,n,j.DEFAULT)}static fromUcsInViewingConditions(t,r,n,o){let s=r,a=n,c=Math.sqrt(s*s+a*a),m=(Math.exp(c*.0228)-1)/.0228/o.fLRoot,l=Math.atan2(a,s)*(180/Math.PI);l<0&&(l+=360);let p=t/(1-(t-100)*.007);return e.fromJchInViewingConditions(p,m,l,o)}toInt(){return this.viewed(j.DEFAULT)}viewed(t){let r=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),n=Math.pow(r/Math.pow(1.64-Math.pow(.29,t.n),.73),1/.9),o=this.hue*Math.PI/180,s=.25*(Math.cos(o+2)+3.8),a=t.aw*Math.pow(this.j/100,1/t.c/t.z),c=s*(5e4/13)*t.nc*t.ncb,h=a/t.nbb,m=Math.sin(o),l=Math.cos(o),p=23*(h+.305)*n/(23*c+11*n*l+108*n*m),y=p*l,f=p*m,g=(460*h+451*y+288*f)/1403,u=(460*h-891*y-261*f)/1403,b=(460*h-220*y-6300*f)/1403,I=Math.max(0,27.13*Math.abs(g)/(400-Math.abs(g))),d=V(g)*(100/t.fl)*Math.pow(I,1/.42),x=Math.max(0,27.13*Math.abs(u)/(400-Math.abs(u))),T=V(u)*(100/t.fl)*Math.pow(x,1/.42),D=Math.max(0,27.13*Math.abs(b)/(400-Math.abs(b))),S=V(b)*(100/t.fl)*Math.pow(D,1/.42),C=d/t.rgbD[0],M=T/t.rgbD[1],F=S/t.rgbD[2],w=1.86206786*C-1.01125463*M+.14918677*F,z=.38752654*C+.62144744*M-.00897398*F,W=-.0158415*C-.03412294*M+1.04996444*F;return qt(w,z,W)}static fromXyzInViewingConditions(t,r,n,o){let s=.401288*t+.650173*r-.051461*n,a=-.250268*t+1.204414*r+.045854*n,c=-.002079*t+.048952*r+.953127*n,h=o.rgbD[0]*s,m=o.rgbD[1]*a,l=o.rgbD[2]*c,p=Math.pow(o.fl*Math.abs(h)/100,.42),y=Math.pow(o.fl*Math.abs(m)/100,.42),f=Math.pow(o.fl*Math.abs(l)/100,.42),g=V(h)*400*p/(p+27.13),u=V(m)*400*y/(y+27.13),b=V(l)*400*f/(f+27.13),I=(11*g+-12*u+b)/11,d=(g+u-2*b)/9,x=(20*g+20*u+21*b)/20,T=(40*g+20*u+b)/20,S=Math.atan2(d,I)*180/Math.PI,C=S<0?S+360:S>=360?S-360:S,M=C*Math.PI/180,F=T*o.nbb,w=100*Math.pow(F/o.aw,o.c*o.z),z=4/o.c*Math.sqrt(w/100)*(o.aw+4)*o.fLRoot,W=C<20.14?C+360:C,Y=1/4*(Math.cos(W*Math.PI/180+2)+3.8),nt=5e4/13*Y*o.nc*o.ncb*Math.sqrt(I*I+d*d)/(x+.305),At=Math.pow(nt,.9)*Math.pow(1.64-Math.pow(.29,o.n),.73),et=At*Math.sqrt(w/100),kt=et*o.fLRoot,Lt=50*Math.sqrt(At*o.c/(o.aw+4)),Vt=(1+100*.007)*w/(1+.007*w),zt=Math.log(1+.0228*kt)/.0228,Nt=zt*Math.cos(M),Mt=zt*Math.sin(M);return new e(C,et,w,z,kt,Lt,Vt,Nt,Mt)}xyzInViewingConditions(t){let r=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),n=Math.pow(r/Math.pow(1.64-Math.pow(.29,t.n),.73),1/.9),o=this.hue*Math.PI/180,s=.25*(Math.cos(o+2)+3.8),a=t.aw*Math.pow(this.j/100,1/t.c/t.z),c=s*(5e4/13)*t.nc*t.ncb,h=a/t.nbb,m=Math.sin(o),l=Math.cos(o),p=23*(h+.305)*n/(23*c+11*n*l+108*n*m),y=p*l,f=p*m,g=(460*h+451*y+288*f)/1403,u=(460*h-891*y-261*f)/1403,b=(460*h-220*y-6300*f)/1403,I=Math.max(0,27.13*Math.abs(g)/(400-Math.abs(g))),d=V(g)*(100/t.fl)*Math.pow(I,1/.42),x=Math.max(0,27.13*Math.abs(u)/(400-Math.abs(u))),T=V(u)*(100/t.fl)*Math.pow(x,1/.42),D=Math.max(0,27.13*Math.abs(b)/(400-Math.abs(b))),S=V(b)*(100/t.fl)*Math.pow(D,1/.42),C=d/t.rgbD[0],M=T/t.rgbD[1],F=S/t.rgbD[2],w=1.86206786*C-1.01125463*M+.14918677*F,z=.38752654*C+.62144744*M-.00897398*F,W=-.0158415*C-.03412294*M+1.04996444*F;return[w,z,W]}};var J=class e{static sanitizeRadians(t){return(t+Math.PI*8)%(Math.PI*2)}static trueDelinearized(t){let r=t/100,n=0;return r<=.0031308?n=r*12.92:n=1.055*Math.pow(r,1/2.4)-.055,n*255}static chromaticAdaptation(t){let r=Math.pow(Math.abs(t),.42);return V(t)*400*r/(r+27.13)}static hueOf(t){let r=ft(t,e.SCALED_DISCOUNT_FROM_LINRGB),n=e.chromaticAdaptation(r[0]),o=e.chromaticAdaptation(r[1]),s=e.chromaticAdaptation(r[2]),a=(11*n+-12*o+s)/11,c=(n+o-2*s)/9;return Math.atan2(c,a)}static areInCyclicOrder(t,r,n){let o=e.sanitizeRadians(r-t),s=e.sanitizeRadians(n-t);return o<s}static intercept(t,r,n){return(r-t)/(n-t)}static lerpPoint(t,r,n){return[t[0]+(n[0]-t[0])*r,t[1]+(n[1]-t[1])*r,t[2]+(n[2]-t[2])*r]}static setCoordinate(t,r,n,o){let s=e.intercept(t[o],r,n[o]);return e.lerpPoint(t,s,n)}static isBounded(t){return 0<=t&&t<=100}static nthVertex(t,r){let n=e.Y_FROM_LINRGB[0],o=e.Y_FROM_LINRGB[1],s=e.Y_FROM_LINRGB[2],a=r%4<=1?0:100,c=r%2===0?0:100;if(r<4){let h=a,m=c,l=(t-h*o-m*s)/n;return e.isBounded(l)?[l,h,m]:[-1,-1,-1]}else if(r<8){let h=a,m=c,l=(t-m*n-h*s)/o;return e.isBounded(l)?[m,l,h]:[-1,-1,-1]}else{let h=a,m=c,l=(t-h*n-m*o)/s;return e.isBounded(l)?[h,m,l]:[-1,-1,-1]}}static bisectToSegment(t,r){let n=[-1,-1,-1],o=n,s=0,a=0,c=!1,h=!0;for(let m=0;m<12;m++){let l=e.nthVertex(t,m);if(l[0]<0)continue;let p=e.hueOf(l);if(!c){n=l,o=l,s=p,a=p,c=!0;continue}(h||e.areInCyclicOrder(s,p,a))&&(h=!1,e.areInCyclicOrder(s,r,p)?(o=l,a=p):(n=l,s=p))}return[n,o]}static midpoint(t,r){return[(t[0]+r[0])/2,(t[1]+r[1])/2,(t[2]+r[2])/2]}static criticalPlaneBelow(t){return Math.floor(t-.5)}static criticalPlaneAbove(t){return Math.ceil(t-.5)}static bisectToLimit(t,r){let n=e.bisectToSegment(t,r),o=n[0],s=e.hueOf(o),a=n[1];for(let c=0;c<3;c++)if(o[c]!==a[c]){let h=-1,m=255;o[c]<a[c]?(h=e.criticalPlaneBelow(e.trueDelinearized(o[c])),m=e.criticalPlaneAbove(e.trueDelinearized(a[c]))):(h=e.criticalPlaneAbove(e.trueDelinearized(o[c])),m=e.criticalPlaneBelow(e.trueDelinearized(a[c])));for(let l=0;l<8&&!(Math.abs(m-h)<=1);l++){let p=Math.floor((h+m)/2),y=e.CRITICAL_PLANES[p],f=e.setCoordinate(o,y,a,c),g=e.hueOf(f);e.areInCyclicOrder(s,r,g)?(a=f,m=p):(o=f,s=g,h=p)}}return e.midpoint(o,a)}static inverseChromaticAdaptation(t){let r=Math.abs(t),n=Math.max(0,27.13*r/(400-r));return V(t)*Math.pow(n,1/.42)}static findResultByJ(t,r,n){let o=Math.sqrt(n)*11,s=j.DEFAULT,a=1/Math.pow(1.64-Math.pow(.29,s.n),.73),h=.25*(Math.cos(t+2)+3.8)*(5e4/13)*s.nc*s.ncb,m=Math.sin(t),l=Math.cos(t);for(let p=0;p<5;p++){let y=o/100,f=r===0||o===0?0:r/Math.sqrt(y),g=Math.pow(f*a,1/.9),b=s.aw*Math.pow(y,1/s.c/s.z)/s.nbb,I=23*(b+.305)*g/(23*h+11*g*l+108*g*m),d=I*l,x=I*m,T=(460*b+451*d+288*x)/1403,D=(460*b-891*d-261*x)/1403,S=(460*b-220*d-6300*x)/1403,C=e.inverseChromaticAdaptation(T),M=e.inverseChromaticAdaptation(D),F=e.inverseChromaticAdaptation(S),w=ft([C,M,F],e.LINRGB_FROM_SCALED_DISCOUNT);if(w[0]<0||w[1]<0||w[2]<0)return 0;let z=e.Y_FROM_LINRGB[0],W=e.Y_FROM_LINRGB[1],Y=e.Y_FROM_LINRGB[2],v=z*w[0]+W*w[1]+Y*w[2];if(v<=0)return 0;if(p===4||Math.abs(v-n)<.002)return w[0]>100.01||w[1]>100.01||w[2]>100.01?0:Gt(w);o=o-(v-n)*o/(2*v)}return 0}static solveToInt(t,r,n){if(r<1e-4||n<1e-4||n>99.9999)return oe(n);t=E(t);let o=t/180*Math.PI,s=$(n),a=e.findResultByJ(o,r,s);if(a!==0)return a;let c=e.bisectToLimit(s,o);return Gt(c)}static solveToCam(t,r,n){return U.fromInt(e.solveToInt(t,r,n))}};J.SCALED_DISCOUNT_FROM_LINRGB=[[.001200833568784504,.002389694492170889,.0002795742885861124],[.0005891086651375999,.0029785502573438758,.0003270666104008398],[.00010146692491640572,.0005364214359186694,.0032979401770712076]];J.LINRGB_FROM_SCALED_DISCOUNT=[[1373.2198709594231,-1100.4251190754821,-7.278681089101213],[-271.815969077903,559.6580465940733,-32.46047482791194],[1.9622899599665666,-57.173814538844006,308.7233197812385]];J.Y_FROM_LINRGB=[.2126,.7152,.0722];J.CRITICAL_PLANES=[.015176349177441876,.045529047532325624,.07588174588720938,.10623444424209313,.13658714259697685,.16693984095186062,.19729253930674434,.2276452376616281,.2579979360165119,.28835063437139563,.3188300904430532,.350925934958123,.3848314933096426,.42057480301049466,.458183274052838,.4976837250274023,.5391024159806381,.5824650784040898,.6277969426914107,.6751227633498623,.7244668422128921,.775853049866786,.829304845476233,.8848452951698498,.942497089126609,1.0022825574869039,1.0642236851973577,1.1283421258858297,1.1946592148522128,1.2631959812511864,1.3339731595349034,1.407011200216447,1.4823302800086415,1.5599503113873272,1.6398909516233677,1.7221716113234105,1.8068114625156377,1.8938294463134073,1.9832442801866852,2.075074464868551,2.1693382909216234,2.2660538449872063,2.36523901573795,2.4669114995532007,2.5710888059345764,2.6777882626779785,2.7870270208169257,2.898822059350997,3.0131901897720907,3.1301480604002863,3.2497121605402226,3.3718988244681087,3.4967242352587946,3.624204428461639,3.754355295633311,3.887192587735158,4.022731918402185,4.160988767090289,4.301978482107941,4.445716283538092,4.592217266055746,4.741496401646282,4.893568542229298,5.048448422192488,5.20615066083972,5.3666897647573375,5.5300801301023865,5.696336044816294,5.865471690767354,6.037501145825082,6.212438385869475,6.390297286737924,6.571091626112461,6.7548350853498045,6.941541251256611,7.131223617812143,7.323895587840543,7.5195704746346665,7.7182615035334345,7.919981813454504,8.124744458384042,8.332562408825165,8.543448553206703,8.757415699253682,8.974476575321063,9.194643831691977,9.417930041841839,9.644347703669503,9.873909240696694,10.106627003236781,10.342513269534024,10.58158024687427,10.8238400726681,11.069304815507364,11.317986476196008,11.569896988756009,11.825048221409341,12.083451977536606,12.345119996613247,12.610063955123938,12.878295467455942,13.149826086772048,13.42466730586372,13.702830557985108,13.984327217668513,14.269168601521828,14.55736596900856,14.848930523210871,15.143873411576273,15.44220572664832,15.743938506781891,16.04908273684337,16.35764934889634,16.66964922287304,16.985093187232053,17.30399201960269,17.62635644741625,17.95219714852476,18.281524751807332,18.614349837764564,18.95068293910138,19.290534541298456,19.633915083172692,19.98083495742689,20.331304511189067,20.685334046541502,21.042933821039977,21.404114048223256,21.76888489811322,22.137256497705877,22.50923893145328,22.884842241736916,23.264076429332462,23.6469514538663,24.033477234264016,24.42366364919083,24.817520537484558,25.21505769858089,25.61628489293138,26.021211842414342,26.429848230738664,26.842203703840827,27.258287870275353,27.678110301598522,28.10168053274597,28.529008062403893,28.96010235337422,29.39497283293396,29.83362889318845,30.276079891419332,30.722335150426627,31.172403958865512,31.62629557157785,32.08401920991837,32.54558406207592,33.010999283389665,33.4802739966603,33.953417292456834,34.430438229418264,34.911345834551085,35.39614910352207,35.88485700094671,36.37747846067349,36.87402238606382,37.37449765026789,37.87891309649659,38.38727753828926,38.89959975977785,39.41588851594697,39.93615253289054,40.460400508064545,40.98864111053629,41.520882981230194,42.05713473317016,42.597404951718396,43.141702194811224,43.6900349931913,44.24241185063697,44.798841244188324,45.35933162437017,45.92389141541209,46.49252901546552,47.065252796817916,47.64207110610409,48.22299226451468,48.808024568002054,49.3971762874833,49.9904556690408,50.587870934119984,51.189430279724725,51.79514187861014,52.40501387947288,53.0190544071392,53.637271562750364,54.259673423945976,54.88626804504493,55.517063457223934,56.15206766869424,56.79128866487574,57.43473440856916,58.08241284012621,58.734331877617365,59.39049941699807,60.05092333227251,60.715611475655585,61.38457167773311,62.057811747619894,62.7353394731159,63.417162620860914,64.10328893648692,64.79372614476921,65.48848194977529,66.18756403501224,66.89098006357258,67.59873767827808,68.31084450182222,69.02730813691093,69.74813616640164,70.47333615344107,71.20291564160104,71.93688215501312,72.67524319850172,73.41800625771542,74.16517879925733,74.9167682708136,75.67278210128072,76.43322770089146,77.1981124613393,77.96744375590167,78.74122893956174,79.51947534912904,80.30219030335869,81.08938110306934,81.88105503125999,82.67721935322541,83.4778813166706,84.28304815182372,85.09272707154808,85.90692527145302,86.72564993000343,87.54890820862819,88.3767072518277,89.2090541872801,90.04595612594655,90.88742016217518,91.73345337380438,92.58406282226491,93.43925555268066,94.29903859396902,95.16341895893969,96.03240364439274,96.9059996312159,97.78421388448044,98.6670533535366,99.55452497210776];var B=class e{static from(t,r,n){return new e(J.solveToInt(t,r,n))}static fromInt(t){return new e(t)}toInt(){return this.argb}get hue(){return this.internalHue}set hue(t){this.setInternalState(J.solveToInt(t,this.internalChroma,this.internalTone))}get chroma(){return this.internalChroma}set chroma(t){this.setInternalState(J.solveToInt(this.internalHue,t,this.internalTone))}get tone(){return this.internalTone}set tone(t){this.setInternalState(J.solveToInt(this.internalHue,this.internalChroma,t))}constructor(t){this.argb=t;let r=U.fromInt(t);this.internalHue=r.hue,this.internalChroma=r.chroma,this.internalTone=dt(t),this.argb=t}setInternalState(t){let r=U.fromInt(t);this.internalHue=r.hue,this.internalChroma=r.chroma,this.internalTone=dt(t),this.argb=t}inViewingConditions(t){let n=U.fromInt(this.toInt()).xyzInViewingConditions(t),o=U.fromXyzInViewingConditions(n[0],n[1],n[2],j.make());return e.from(o.hue,o.chroma,yt(n[1]))}};var Bt=class e{static harmonize(t,r){let n=B.fromInt(t),o=B.fromInt(r),s=It(n.hue,o.hue),a=Math.min(s*.5,15),c=E(n.hue+a*ee(n.hue,o.hue));return B.from(c,n.chroma,n.tone).toInt()}static hctHue(t,r,n){let o=e.cam16Ucs(t,r,n),s=U.fromInt(o),a=U.fromInt(t);return B.from(s.hue,a.chroma,dt(t)).toInt()}static cam16Ucs(t,r,n){let o=U.fromInt(t),s=U.fromInt(r),a=o.jstar,c=o.astar,h=o.bstar,m=s.jstar,l=s.astar,p=s.bstar,y=a+(m-a)*n,f=c+(l-c)*n,g=h+(p-h)*n;return U.fromUcs(y,f,g).toInt()}};var G=class e{static ratioOfTones(t,r){return t=lt(0,100,t),r=lt(0,100,r),e.ratioOfYs($(t),$(r))}static ratioOfYs(t,r){let n=t>r?t:r,o=n===r?t:r;return(n+5)/(o+5)}static lighter(t,r){if(t<0||t>100)return-1;let n=$(t),o=r*(n+5)-5,s=e.ratioOfYs(o,n),a=Math.abs(s-r);if(s<r&&a>.04)return-1;let c=yt(o)+.4;return c<0||c>100?-1:c}static darker(t,r){if(t<0||t>100)return-1;let n=$(t),o=(n+5)/r-5,s=e.ratioOfYs(n,o),a=Math.abs(s-r);if(s<r&&a>.04)return-1;let c=yt(o)-.4;return c<0||c>100?-1:c}static lighterUnsafe(t,r){let n=e.lighter(t,r);return n<0?100:n}static darkerUnsafe(t,r){let n=e.darker(t,r);return n<0?0:n}};var rt=class e{static isDisliked(t){let r=Math.round(t.hue)>=90&&Math.round(t.hue)<=111,n=Math.round(t.chroma)>16,o=Math.round(t.tone)<65;return r&&n&&o}static fixIfDisliked(t){return e.isDisliked(t)?B.from(t.hue,t.chroma,70):t}};var A=class e{static fromPalette(t){return new e(t.name??"",t.palette,t.tone,t.isBackground??!1,t.background,t.secondBackground,t.contrastCurve,t.toneDeltaPair)}constructor(t,r,n,o,s,a,c,h){if(this.name=t,this.palette=r,this.tone=n,this.isBackground=o,this.background=s,this.secondBackground=a,this.contrastCurve=c,this.toneDeltaPair=h,this.hctCache=new Map,!s&&a)throw new Error(`Color ${t} has secondBackgrounddefined, but background is not defined.`);if(!s&&c)throw new Error(`Color ${t} has contrastCurvedefined, but background is not defined.`);if(s&&!c)throw new Error(`Color ${t} has backgrounddefined, but contrastCurve is not defined.`)}getArgb(t){return this.getHct(t).toInt()}getHct(t){let r=this.hctCache.get(t);if(r!=null)return r;let n=this.getTone(t),o=this.palette(t).getHct(n);return this.hctCache.size>4&&this.hctCache.clear(),this.hctCache.set(t,o),o}getTone(t){let r=t.contrastLevel<0;if(this.toneDeltaPair){let n=this.toneDeltaPair(t),o=n.roleA,s=n.roleB,a=n.delta,c=n.polarity,h=n.stayTogether,l=this.background(t).getTone(t),p=c==="nearer"||c==="lighter"&&!t.isDark||c==="darker"&&t.isDark,y=p?o:s,f=p?s:o,g=this.name===y.name,u=t.isDark?1:-1,b=y.contrastCurve.get(t.contrastLevel),I=f.contrastCurve.get(t.contrastLevel),d=y.tone(t),x=G.ratioOfTones(l,d)>=b?d:e.foregroundTone(l,b),T=f.tone(t),D=G.ratioOfTones(l,T)>=I?T:e.foregroundTone(l,I);return r&&(x=e.foregroundTone(l,b),D=e.foregroundTone(l,I)),(D-x)*u>=a||(D=lt(0,100,x+a*u),(D-x)*u>=a||(x=lt(0,100,D-a*u))),50<=x&&x<60?u>0?(x=60,D=Math.max(D,x+a*u)):(x=49,D=Math.min(D,x+a*u)):50<=D&&D<60&&(h?u>0?(x=60,D=Math.max(D,x+a*u)):(x=49,D=Math.min(D,x+a*u)):u>0?D=60:D=49),g?x:D}else{let n=this.tone(t);if(this.background==null)return n;let o=this.background(t).getTone(t),s=this.contrastCurve.get(t.contrastLevel);if(G.ratioOfTones(o,n)>=s||(n=e.foregroundTone(o,s)),r&&(n=e.foregroundTone(o,s)),this.isBackground&&50<=n&&n<60&&(G.ratioOfTones(49,o)>=s?n=49:n=60),this.secondBackground){let[a,c]=[this.background,this.secondBackground],[h,m]=[a(t).getTone(t),c(t).getTone(t)],[l,p]=[Math.max(h,m),Math.min(h,m)];if(G.ratioOfTones(l,n)>=s&&G.ratioOfTones(p,n)>=s)return n;let y=G.lighter(l,s),f=G.darker(p,s),g=[];return y!==-1&&g.push(y),f!==-1&&g.push(f),e.tonePrefersLightForeground(h)||e.tonePrefersLightForeground(m)?y<0?100:y:g.length===1?g[0]:f<0?0:f}return n}}static foregroundTone(t,r){let n=G.lighterUnsafe(t,r),o=G.darkerUnsafe(t,r),s=G.ratioOfTones(n,t),a=G.ratioOfTones(o,t);if(e.tonePrefersLightForeground(t)){let h=Math.abs(s-a)<.1&&s<r&&a<r;return s>=r||s>=a||h?n:o}else return a>=r||a>=s?o:n}static tonePrefersLightForeground(t){return Math.round(t)<60}static toneAllowsLightForeground(t){return Math.round(t)<=49}static enableLightForeground(t){return e.tonePrefersLightForeground(t)&&!e.toneAllowsLightForeground(t)?49:t}};var P=class e{static fromInt(t){let r=B.fromInt(t);return e.fromHct(r)}static fromHct(t){return new e(t.hue,t.chroma,t)}static fromHueAndChroma(t,r){let n=new _t(t,r).create();return new e(t,r,n)}constructor(t,r,n){this.hue=t,this.chroma=r,this.keyColor=n,this.cache=new Map}tone(t){let r=this.cache.get(t);return r===void 0&&(r=B.from(this.hue,this.chroma,t).toInt(),this.cache.set(t,r)),r}getHct(t){return B.fromInt(this.tone(t))}},_t=class{constructor(t,r){this.hue=t,this.requestedChroma=r,this.chromaCache=new Map,this.maxChromaValue=200}create(){let o=0,s=100;for(;o<s;){let a=Math.floor((o+s)/2),c=this.maxChroma(a)<this.maxChroma(a+1);if(this.maxChroma(a)>=this.requestedChroma-.01)if(Math.abs(o-50)<Math.abs(s-50))s=a;else{if(o===a)return B.from(this.hue,this.requestedChroma,o);o=a}else c?o=a+1:s=a}return B.from(this.hue,this.requestedChroma,o)}maxChroma(t){if(this.chromaCache.has(t))return this.chromaCache.get(t);let r=B.from(this.hue,this.maxChromaValue,t).chroma;return this.chromaCache.set(t,r),r}};var k=class{constructor(t,r,n,o){this.low=t,this.normal=r,this.medium=n,this.high=o}get(t){return t<=-1?this.low:t<0?ot(this.low,this.normal,(t- -1)/1):t<.5?ot(this.normal,this.medium,(t-0)/.5):t<1?ot(this.medium,this.high,(t-.5)/.5):this.high}};var L=class{constructor(t,r,n,o,s){this.roleA=t,this.roleB=r,this.delta=n,this.polarity=o,this.stayTogether=s}};var R;(function(e){e[e.MONOCHROME=0]="MONOCHROME",e[e.NEUTRAL=1]="NEUTRAL",e[e.TONAL_SPOT=2]="TONAL_SPOT",e[e.VIBRANT=3]="VIBRANT",e[e.EXPRESSIVE=4]="EXPRESSIVE",e[e.FIDELITY=5]="FIDELITY",e[e.CONTENT=6]="CONTENT",e[e.RAINBOW=7]="RAINBOW",e[e.FRUIT_SALAD=8]="FRUIT_SALAD"})(R||(R={}));function ut(e){return e.variant===R.FIDELITY||e.variant===R.CONTENT}function O(e){return e.variant===R.MONOCHROME}function be(e,t,r,n){let o=r,s=B.from(e,t,r);if(s.chroma<t){let a=s.chroma;for(;s.chroma<t;){o+=n?-1:1;let c=B.from(e,t,o);if(a>c.chroma||Math.abs(c.chroma-t)<.4)break;let h=Math.abs(c.chroma-t),m=Math.abs(s.chroma-t);h<m&&(s=c),a=Math.max(a,c.chroma)}}return o}var i=class e{static highestSurface(t){return t.isDark?e.surfaceBright:e.surfaceDim}};i.contentAccentToneDelta=15;i.primaryPaletteKeyColor=A.fromPalette({name:"primary_palette_key_color",palette:e=>e.primaryPalette,tone:e=>e.primaryPalette.keyColor.tone});i.secondaryPaletteKeyColor=A.fromPalette({name:"secondary_palette_key_color",palette:e=>e.secondaryPalette,tone:e=>e.secondaryPalette.keyColor.tone});i.tertiaryPaletteKeyColor=A.fromPalette({name:"tertiary_palette_key_color",palette:e=>e.tertiaryPalette,tone:e=>e.tertiaryPalette.keyColor.tone});i.neutralPaletteKeyColor=A.fromPalette({name:"neutral_palette_key_color",palette:e=>e.neutralPalette,tone:e=>e.neutralPalette.keyColor.tone});i.neutralVariantPaletteKeyColor=A.fromPalette({name:"neutral_variant_palette_key_color",palette:e=>e.neutralVariantPalette,tone:e=>e.neutralVariantPalette.keyColor.tone});i.background=A.fromPalette({name:"background",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:98,isBackground:!0});i.onBackground=A.fromPalette({name:"on_background",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:10,background:e=>i.background,contrastCurve:new k(3,3,4.5,7)});i.surface=A.fromPalette({name:"surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:98,isBackground:!0});i.surfaceDim=A.fromPalette({name:"surface_dim",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:new k(87,87,80,75).get(e.contrastLevel),isBackground:!0});i.surfaceBright=A.fromPalette({name:"surface_bright",palette:e=>e.neutralPalette,tone:e=>e.isDark?new k(24,24,29,34).get(e.contrastLevel):98,isBackground:!0});i.surfaceContainerLowest=A.fromPalette({name:"surface_container_lowest",palette:e=>e.neutralPalette,tone:e=>e.isDark?new k(4,4,2,0).get(e.contrastLevel):100,isBackground:!0});i.surfaceContainerLow=A.fromPalette({name:"surface_container_low",palette:e=>e.neutralPalette,tone:e=>e.isDark?new k(10,10,11,12).get(e.contrastLevel):new k(96,96,96,95).get(e.contrastLevel),isBackground:!0});i.surfaceContainer=A.fromPalette({name:"surface_container",palette:e=>e.neutralPalette,tone:e=>e.isDark?new k(12,12,16,20).get(e.contrastLevel):new k(94,94,92,90).get(e.contrastLevel),isBackground:!0});i.surfaceContainerHigh=A.fromPalette({name:"surface_container_high",palette:e=>e.neutralPalette,tone:e=>e.isDark?new k(17,17,21,25).get(e.contrastLevel):new k(92,92,88,85).get(e.contrastLevel),isBackground:!0});i.surfaceContainerHighest=A.fromPalette({name:"surface_container_highest",palette:e=>e.neutralPalette,tone:e=>e.isDark?new k(22,22,26,30).get(e.contrastLevel):new k(90,90,84,80).get(e.contrastLevel),isBackground:!0});i.onSurface=A.fromPalette({name:"on_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:10,background:e=>i.highestSurface(e),contrastCurve:new k(4.5,7,11,21)});i.surfaceVariant=A.fromPalette({name:"surface_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?30:90,isBackground:!0});i.onSurfaceVariant=A.fromPalette({name:"on_surface_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?80:30,background:e=>i.highestSurface(e),contrastCurve:new k(3,4.5,7,11)});i.inverseSurface=A.fromPalette({name:"inverse_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:20});i.inverseOnSurface=A.fromPalette({name:"inverse_on_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?20:95,background:e=>i.inverseSurface,contrastCurve:new k(4.5,7,11,21)});i.outline=A.fromPalette({name:"outline",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?60:50,background:e=>i.highestSurface(e),contrastCurve:new k(1.5,3,4.5,7)});i.outlineVariant=A.fromPalette({name:"outline_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?30:80,background:e=>i.highestSurface(e),contrastCurve:new k(1,1,3,4.5)});i.shadow=A.fromPalette({name:"shadow",palette:e=>e.neutralPalette,tone:e=>0});i.scrim=A.fromPalette({name:"scrim",palette:e=>e.neutralPalette,tone:e=>0});i.surfaceTint=A.fromPalette({name:"surface_tint",palette:e=>e.primaryPalette,tone:e=>e.isDark?80:40,isBackground:!0});i.primary=A.fromPalette({name:"primary",palette:e=>e.primaryPalette,tone:e=>O(e)?e.isDark?100:0:e.isDark?80:40,isBackground:!0,background:e=>i.highestSurface(e),contrastCurve:new k(3,4.5,7,7),toneDeltaPair:e=>new L(i.primaryContainer,i.primary,10,"nearer",!1)});i.onPrimary=A.fromPalette({name:"on_primary",palette:e=>e.primaryPalette,tone:e=>O(e)?e.isDark?10:90:e.isDark?20:100,background:e=>i.primary,contrastCurve:new k(4.5,7,11,21)});i.primaryContainer=A.fromPalette({name:"primary_container",palette:e=>e.primaryPalette,tone:e=>ut(e)?e.sourceColorHct.tone:O(e)?e.isDark?85:25:e.isDark?30:90,isBackground:!0,background:e=>i.highestSurface(e),contrastCurve:new k(1,1,3,4.5),toneDeltaPair:e=>new L(i.primaryContainer,i.primary,10,"nearer",!1)});i.onPrimaryContainer=A.fromPalette({name:"on_primary_container",palette:e=>e.primaryPalette,tone:e=>ut(e)?A.foregroundTone(i.primaryContainer.tone(e),4.5):O(e)?e.isDark?0:100:e.isDark?90:30,background:e=>i.primaryContainer,contrastCurve:new k(3,4.5,7,11)});i.inversePrimary=A.fromPalette({name:"inverse_primary",palette:e=>e.primaryPalette,tone:e=>e.isDark?40:80,background:e=>i.inverseSurface,contrastCurve:new k(3,4.5,7,7)});i.secondary=A.fromPalette({name:"secondary",palette:e=>e.secondaryPalette,tone:e=>e.isDark?80:40,isBackground:!0,background:e=>i.highestSurface(e),contrastCurve:new k(3,4.5,7,7),toneDeltaPair:e=>new L(i.secondaryContainer,i.secondary,10,"nearer",!1)});i.onSecondary=A.fromPalette({name:"on_secondary",palette:e=>e.secondaryPalette,tone:e=>O(e)?e.isDark?10:100:e.isDark?20:100,background:e=>i.secondary,contrastCurve:new k(4.5,7,11,21)});i.secondaryContainer=A.fromPalette({name:"secondary_container",palette:e=>e.secondaryPalette,tone:e=>{let t=e.isDark?30:90;return O(e)?e.isDark?30:85:ut(e)?be(e.secondaryPalette.hue,e.secondaryPalette.chroma,t,!e.isDark):t},isBackground:!0,background:e=>i.highestSurface(e),contrastCurve:new k(1,1,3,4.5),toneDeltaPair:e=>new L(i.secondaryContainer,i.secondary,10,"nearer",!1)});i.onSecondaryContainer=A.fromPalette({name:"on_secondary_container",palette:e=>e.secondaryPalette,tone:e=>O(e)?e.isDark?90:10:ut(e)?A.foregroundTone(i.secondaryContainer.tone(e),4.5):e.isDark?90:30,background:e=>i.secondaryContainer,contrastCurve:new k(3,4.5,7,11)});i.tertiary=A.fromPalette({name:"tertiary",palette:e=>e.tertiaryPalette,tone:e=>O(e)?e.isDark?90:25:e.isDark?80:40,isBackground:!0,background:e=>i.highestSurface(e),contrastCurve:new k(3,4.5,7,7),toneDeltaPair:e=>new L(i.tertiaryContainer,i.tertiary,10,"nearer",!1)});i.onTertiary=A.fromPalette({name:"on_tertiary",palette:e=>e.tertiaryPalette,tone:e=>O(e)?e.isDark?10:90:e.isDark?20:100,background:e=>i.tertiary,contrastCurve:new k(4.5,7,11,21)});i.tertiaryContainer=A.fromPalette({name:"tertiary_container",palette:e=>e.tertiaryPalette,tone:e=>{if(O(e))return e.isDark?60:49;if(!ut(e))return e.isDark?30:90;let t=e.tertiaryPalette.getHct(e.sourceColorHct.tone);return rt.fixIfDisliked(t).tone},isBackground:!0,background:e=>i.highestSurface(e),contrastCurve:new k(1,1,3,4.5),toneDeltaPair:e=>new L(i.tertiaryContainer,i.tertiary,10,"nearer",!1)});i.onTertiaryContainer=A.fromPalette({name:"on_tertiary_container",palette:e=>e.tertiaryPalette,tone:e=>O(e)?e.isDark?0:100:ut(e)?A.foregroundTone(i.tertiaryContainer.tone(e),4.5):e.isDark?90:30,background:e=>i.tertiaryContainer,contrastCurve:new k(3,4.5,7,11)});i.error=A.fromPalette({name:"error",palette:e=>e.errorPalette,tone:e=>e.isDark?80:40,isBackground:!0,background:e=>i.highestSurface(e),contrastCurve:new k(3,4.5,7,7),toneDeltaPair:e=>new L(i.errorContainer,i.error,10,"nearer",!1)});i.onError=A.fromPalette({name:"on_error",palette:e=>e.errorPalette,tone:e=>e.isDark?20:100,background:e=>i.error,contrastCurve:new k(4.5,7,11,21)});i.errorContainer=A.fromPalette({name:"error_container",palette:e=>e.errorPalette,tone:e=>e.isDark?30:90,isBackground:!0,background:e=>i.highestSurface(e),contrastCurve:new k(1,1,3,4.5),toneDeltaPair:e=>new L(i.errorContainer,i.error,10,"nearer",!1)});i.onErrorContainer=A.fromPalette({name:"on_error_container",palette:e=>e.errorPalette,tone:e=>O(e)?e.isDark?90:10:e.isDark?90:30,background:e=>i.errorContainer,contrastCurve:new k(3,4.5,7,11)});i.primaryFixed=A.fromPalette({name:"primary_fixed",palette:e=>e.primaryPalette,tone:e=>O(e)?40:90,isBackground:!0,background:e=>i.highestSurface(e),contrastCurve:new k(1,1,3,4.5),toneDeltaPair:e=>new L(i.primaryFixed,i.primaryFixedDim,10,"lighter",!0)});i.primaryFixedDim=A.fromPalette({name:"primary_fixed_dim",palette:e=>e.primaryPalette,tone:e=>O(e)?30:80,isBackground:!0,background:e=>i.highestSurface(e),contrastCurve:new k(1,1,3,4.5),toneDeltaPair:e=>new L(i.primaryFixed,i.primaryFixedDim,10,"lighter",!0)});i.onPrimaryFixed=A.fromPalette({name:"on_primary_fixed",palette:e=>e.primaryPalette,tone:e=>O(e)?100:10,background:e=>i.primaryFixedDim,secondBackground:e=>i.primaryFixed,contrastCurve:new k(4.5,7,11,21)});i.onPrimaryFixedVariant=A.fromPalette({name:"on_primary_fixed_variant",palette:e=>e.primaryPalette,tone:e=>O(e)?90:30,background:e=>i.primaryFixedDim,secondBackground:e=>i.primaryFixed,contrastCurve:new k(3,4.5,7,11)});i.secondaryFixed=A.fromPalette({name:"secondary_fixed",palette:e=>e.secondaryPalette,tone:e=>O(e)?80:90,isBackground:!0,background:e=>i.highestSurface(e),contrastCurve:new k(1,1,3,4.5),toneDeltaPair:e=>new L(i.secondaryFixed,i.secondaryFixedDim,10,"lighter",!0)});i.secondaryFixedDim=A.fromPalette({name:"secondary_fixed_dim",palette:e=>e.secondaryPalette,tone:e=>O(e)?70:80,isBackground:!0,background:e=>i.highestSurface(e),contrastCurve:new k(1,1,3,4.5),toneDeltaPair:e=>new L(i.secondaryFixed,i.secondaryFixedDim,10,"lighter",!0)});i.onSecondaryFixed=A.fromPalette({name:"on_secondary_fixed",palette:e=>e.secondaryPalette,tone:e=>10,background:e=>i.secondaryFixedDim,secondBackground:e=>i.secondaryFixed,contrastCurve:new k(4.5,7,11,21)});i.onSecondaryFixedVariant=A.fromPalette({name:"on_secondary_fixed_variant",palette:e=>e.secondaryPalette,tone:e=>O(e)?25:30,background:e=>i.secondaryFixedDim,secondBackground:e=>i.secondaryFixed,contrastCurve:new k(3,4.5,7,11)});i.tertiaryFixed=A.fromPalette({name:"tertiary_fixed",palette:e=>e.tertiaryPalette,tone:e=>O(e)?40:90,isBackground:!0,background:e=>i.highestSurface(e),contrastCurve:new k(1,1,3,4.5),toneDeltaPair:e=>new L(i.tertiaryFixed,i.tertiaryFixedDim,10,"lighter",!0)});i.tertiaryFixedDim=A.fromPalette({name:"tertiary_fixed_dim",palette:e=>e.tertiaryPalette,tone:e=>O(e)?30:80,isBackground:!0,background:e=>i.highestSurface(e),contrastCurve:new k(1,1,3,4.5),toneDeltaPair:e=>new L(i.tertiaryFixed,i.tertiaryFixedDim,10,"lighter",!0)});i.onTertiaryFixed=A.fromPalette({name:"on_tertiary_fixed",palette:e=>e.tertiaryPalette,tone:e=>O(e)?100:10,background:e=>i.tertiaryFixedDim,secondBackground:e=>i.tertiaryFixed,contrastCurve:new k(4.5,7,11,21)});i.onTertiaryFixedVariant=A.fromPalette({name:"on_tertiary_fixed_variant",palette:e=>e.tertiaryPalette,tone:e=>O(e)?90:30,background:e=>i.tertiaryFixedDim,secondBackground:e=>i.tertiaryFixed,contrastCurve:new k(3,4.5,7,11)});var H=class{constructor(t){this.sourceColorArgb=t.sourceColorArgb,this.variant=t.variant,this.contrastLevel=t.contrastLevel,this.isDark=t.isDark,this.sourceColorHct=B.fromInt(t.sourceColorArgb),this.primaryPalette=t.primaryPalette,this.secondaryPalette=t.secondaryPalette,this.tertiaryPalette=t.tertiaryPalette,this.neutralPalette=t.neutralPalette,this.neutralVariantPalette=t.neutralVariantPalette,this.errorPalette=P.fromHueAndChroma(25,84)}static getRotatedHue(t,r,n){let o=t.hue;if(r.length!==n.length)throw new Error(`mismatch between hue length ${r.length} & rotations ${n.length}`);if(n.length===1)return E(t.hue+n[0]);let s=r.length;for(let a=0;a<=s-2;a++){let c=r[a],h=r[a+1];if(c<o&&o<h)return E(o+n[a])}return o}getArgb(t){return t.getArgb(this)}getHct(t){return t.getHct(this)}get primaryPaletteKeyColor(){return this.getArgb(i.primaryPaletteKeyColor)}get secondaryPaletteKeyColor(){return this.getArgb(i.secondaryPaletteKeyColor)}get tertiaryPaletteKeyColor(){return this.getArgb(i.tertiaryPaletteKeyColor)}get neutralPaletteKeyColor(){return this.getArgb(i.neutralPaletteKeyColor)}get neutralVariantPaletteKeyColor(){return this.getArgb(i.neutralVariantPaletteKeyColor)}get background(){return this.getArgb(i.background)}get onBackground(){return this.getArgb(i.onBackground)}get surface(){return this.getArgb(i.surface)}get surfaceDim(){return this.getArgb(i.surfaceDim)}get surfaceBright(){return this.getArgb(i.surfaceBright)}get surfaceContainerLowest(){return this.getArgb(i.surfaceContainerLowest)}get surfaceContainerLow(){return this.getArgb(i.surfaceContainerLow)}get surfaceContainer(){return this.getArgb(i.surfaceContainer)}get surfaceContainerHigh(){return this.getArgb(i.surfaceContainerHigh)}get surfaceContainerHighest(){return this.getArgb(i.surfaceContainerHighest)}get onSurface(){return this.getArgb(i.onSurface)}get surfaceVariant(){return this.getArgb(i.surfaceVariant)}get onSurfaceVariant(){return this.getArgb(i.onSurfaceVariant)}get inverseSurface(){return this.getArgb(i.inverseSurface)}get inverseOnSurface(){return this.getArgb(i.inverseOnSurface)}get outline(){return this.getArgb(i.outline)}get outlineVariant(){return this.getArgb(i.outlineVariant)}get shadow(){return this.getArgb(i.shadow)}get scrim(){return this.getArgb(i.scrim)}get surfaceTint(){return this.getArgb(i.surfaceTint)}get primary(){return this.getArgb(i.primary)}get onPrimary(){return this.getArgb(i.onPrimary)}get primaryContainer(){return this.getArgb(i.primaryContainer)}get onPrimaryContainer(){return this.getArgb(i.onPrimaryContainer)}get inversePrimary(){return this.getArgb(i.inversePrimary)}get secondary(){return this.getArgb(i.secondary)}get onSecondary(){return this.getArgb(i.onSecondary)}get secondaryContainer(){return this.getArgb(i.secondaryContainer)}get onSecondaryContainer(){return this.getArgb(i.onSecondaryContainer)}get tertiary(){return this.getArgb(i.tertiary)}get onTertiary(){return this.getArgb(i.onTertiary)}get tertiaryContainer(){return this.getArgb(i.tertiaryContainer)}get onTertiaryContainer(){return this.getArgb(i.onTertiaryContainer)}get error(){return this.getArgb(i.error)}get onError(){return this.getArgb(i.onError)}get errorContainer(){return this.getArgb(i.errorContainer)}get onErrorContainer(){return this.getArgb(i.onErrorContainer)}get primaryFixed(){return this.getArgb(i.primaryFixed)}get primaryFixedDim(){return this.getArgb(i.primaryFixedDim)}get onPrimaryFixed(){return this.getArgb(i.onPrimaryFixed)}get onPrimaryFixedVariant(){return this.getArgb(i.onPrimaryFixedVariant)}get secondaryFixed(){return this.getArgb(i.secondaryFixed)}get secondaryFixedDim(){return this.getArgb(i.secondaryFixedDim)}get onSecondaryFixed(){return this.getArgb(i.onSecondaryFixed)}get onSecondaryFixedVariant(){return this.getArgb(i.onSecondaryFixedVariant)}get tertiaryFixed(){return this.getArgb(i.tertiaryFixed)}get tertiaryFixedDim(){return this.getArgb(i.tertiaryFixedDim)}get onTertiaryFixed(){return this.getArgb(i.onTertiaryFixed)}get onTertiaryFixedVariant(){return this.getArgb(i.onTertiaryFixedVariant)}};var q=class e{static of(t){return new e(t,!1)}static contentOf(t){return new e(t,!0)}static fromColors(t){return e.createPaletteFromColors(!1,t)}static contentFromColors(t){return e.createPaletteFromColors(!0,t)}static createPaletteFromColors(t,r){let n=new e(r.primary,t);if(r.secondary){let o=new e(r.secondary,t);n.a2=o.a1}if(r.tertiary){let o=new e(r.tertiary,t);n.a3=o.a1}if(r.error){let o=new e(r.error,t);n.error=o.a1}if(r.neutral){let o=new e(r.neutral,t);n.n1=o.n1}if(r.neutralVariant){let o=new e(r.neutralVariant,t);n.n2=o.n2}return n}constructor(t,r){let n=B.fromInt(t),o=n.hue,s=n.chroma;r?(this.a1=P.fromHueAndChroma(o,s),this.a2=P.fromHueAndChroma(o,s/3),this.a3=P.fromHueAndChroma(o+60,s/2),this.n1=P.fromHueAndChroma(o,Math.min(s/12,4)),this.n2=P.fromHueAndChroma(o,Math.min(s/6,8))):(this.a1=P.fromHueAndChroma(o,Math.max(48,s)),this.a2=P.fromHueAndChroma(o,16),this.a3=P.fromHueAndChroma(o+60,24),this.n1=P.fromHueAndChroma(o,4),this.n2=P.fromHueAndChroma(o,8)),this.error=P.fromHueAndChroma(25,84)}};var St=class{fromInt(t){return Ft(t)}toInt(t){return ne(t[0],t[1],t[2])}distance(t,r){let n=t[0]-r[0],o=t[1]-r[1],s=t[2]-r[2];return n*n+o*o+s*s}};var Ae=10,ke=3,Rt=class{static quantize(t,r,n){let o=new Map,s=new Array,a=new Array,c=new St,h=0;for(let d=0;d<t.length;d++){let x=t[d],T=o.get(x);T===void 0?(h++,s.push(c.fromInt(x)),a.push(x),o.set(x,1)):o.set(x,T+1)}let m=new Array;for(let d=0;d<h;d++){let x=a[d],T=o.get(x);T!==void 0&&(m[d]=T)}let l=Math.min(n,h);r.length>0&&(l=Math.min(l,r.length));let p=new Array;for(let d=0;d<r.length;d++)p.push(c.fromInt(r[d]));let y=l-p.length;if(r.length===0&&y>0)for(let d=0;d<y;d++){let x=Math.random()*100,T=Math.random()*201+-100,D=Math.random()*201+-100;p.push(new Array(x,T,D))}let f=new Array;for(let d=0;d<h;d++)f.push(Math.floor(Math.random()*l));let g=new Array;for(let d=0;d<l;d++){g.push(new Array);for(let x=0;x<l;x++)g[d].push(0)}let u=new Array;for(let d=0;d<l;d++){u.push(new Array);for(let x=0;x<l;x++)u[d].push(new Yt)}let b=new Array;for(let d=0;d<l;d++)b.push(0);for(let d=0;d<Ae;d++){for(let C=0;C<l;C++){for(let M=C+1;M<l;M++){let F=c.distance(p[C],p[M]);u[M][C].distance=F,u[M][C].index=C,u[C][M].distance=F,u[C][M].index=M}u[C].sort();for(let M=0;M<l;M++)g[C][M]=u[C][M].index}let x=0;for(let C=0;C<h;C++){let M=s[C],F=f[C],w=p[F],z=c.distance(M,w),W=z,Y=-1;for(let v=0;v<l;v++){if(u[F][v].distance>=4*z)continue;let nt=c.distance(M,p[v]);nt<W&&(W=nt,Y=v)}Y!==-1&&Math.abs(Math.sqrt(W)-Math.sqrt(z))>ke&&(x++,f[C]=Y)}if(x===0&&d!==0)break;let T=new Array(l).fill(0),D=new Array(l).fill(0),S=new Array(l).fill(0);for(let C=0;C<l;C++)b[C]=0;for(let C=0;C<h;C++){let M=f[C],F=s[C],w=m[C];b[M]+=w,T[M]+=F[0]*w,D[M]+=F[1]*w,S[M]+=F[2]*w}for(let C=0;C<l;C++){let M=b[C];if(M===0){p[C]=[0,0,0];continue}let F=T[C]/M,w=D[C]/M,z=S[C]/M;p[C]=[F,w,z]}}let I=new Map;for(let d=0;d<l;d++){let x=b[d];if(x===0)continue;let T=c.toInt(p[d]);I.has(T)||I.set(T,x)}return I}},Yt=class{constructor(){this.distance=-1,this.index=-1}};var Ht=class{static quantize(t){let r=new Map;for(let n=0;n<t.length;n++){let o=t[n];wt(o)<255||r.set(o,(r.get(o)??0)+1)}return r}};var Ot=5,X=33,Pt=35937,_={RED:"red",GREEN:"green",BLUE:"blue"},Et=class{constructor(t=[],r=[],n=[],o=[],s=[],a=[]){this.weights=t,this.momentsR=r,this.momentsG=n,this.momentsB=o,this.moments=s,this.cubes=a}quantize(t,r){this.constructHistogram(t),this.computeMoments();let n=this.createBoxes(r);return this.createResult(n.resultCount)}constructHistogram(t){this.weights=Array.from({length:Pt}).fill(0),this.momentsR=Array.from({length:Pt}).fill(0),this.momentsG=Array.from({length:Pt}).fill(0),this.momentsB=Array.from({length:Pt}).fill(0),this.moments=Array.from({length:Pt}).fill(0);let r=Ht.quantize(t);for(let[n,o]of r.entries()){let s=st(n),a=it(n),c=ct(n),h=8-Ot,m=(s>>h)+1,l=(a>>h)+1,p=(c>>h)+1,y=this.getIndex(m,l,p);this.weights[y]=(this.weights[y]??0)+o,this.momentsR[y]+=o*s,this.momentsG[y]+=o*a,this.momentsB[y]+=o*c,this.moments[y]+=o*(s*s+a*a+c*c)}}computeMoments(){for(let t=1;t<X;t++){let r=Array.from({length:X}).fill(0),n=Array.from({length:X}).fill(0),o=Array.from({length:X}).fill(0),s=Array.from({length:X}).fill(0),a=Array.from({length:X}).fill(0);for(let c=1;c<X;c++){let h=0,m=0,l=0,p=0,y=0;for(let f=1;f<X;f++){let g=this.getIndex(t,c,f);h+=this.weights[g],m+=this.momentsR[g],l+=this.momentsG[g],p+=this.momentsB[g],y+=this.moments[g],r[f]+=h,n[f]+=m,o[f]+=l,s[f]+=p,a[f]+=y;let u=this.getIndex(t-1,c,f);this.weights[g]=this.weights[u]+r[f],this.momentsR[g]=this.momentsR[u]+n[f],this.momentsG[g]=this.momentsG[u]+o[f],this.momentsB[g]=this.momentsB[u]+s[f],this.moments[g]=this.moments[u]+a[f]}}}}createBoxes(t){this.cubes=Array.from({length:t}).fill(0).map(()=>new jt);let r=Array.from({length:t}).fill(0);this.cubes[0].r0=0,this.cubes[0].g0=0,this.cubes[0].b0=0,this.cubes[0].r1=X-1,this.cubes[0].g1=X-1,this.cubes[0].b1=X-1;let n=t,o=0;for(let s=1;s<t;s++){this.cut(this.cubes[o],this.cubes[s])?(r[o]=this.cubes[o].vol>1?this.variance(this.cubes[o]):0,r[s]=this.cubes[s].vol>1?this.variance(this.cubes[s]):0):(r[o]=0,s--),o=0;let a=r[0];for(let c=1;c<=s;c++)r[c]>a&&(a=r[c],o=c);if(a<=0){n=s+1;break}}return new Wt(t,n)}createResult(t){let r=[];for(let n=0;n<t;++n){let o=this.cubes[n],s=this.volume(o,this.weights);if(s>0){let a=Math.round(this.volume(o,this.momentsR)/s),c=Math.round(this.volume(o,this.momentsG)/s),h=Math.round(this.volume(o,this.momentsB)/s),m=255<<24|(a&255)<<16|(c&255)<<8|h&255;r.push(m)}}return r}variance(t){let r=this.volume(t,this.momentsR),n=this.volume(t,this.momentsG),o=this.volume(t,this.momentsB),s=this.moments[this.getIndex(t.r1,t.g1,t.b1)]-this.moments[this.getIndex(t.r1,t.g1,t.b0)]-this.moments[this.getIndex(t.r1,t.g0,t.b1)]+this.moments[this.getIndex(t.r1,t.g0,t.b0)]-this.moments[this.getIndex(t.r0,t.g1,t.b1)]+this.moments[this.getIndex(t.r0,t.g1,t.b0)]+this.moments[this.getIndex(t.r0,t.g0,t.b1)]-this.moments[this.getIndex(t.r0,t.g0,t.b0)],a=r*r+n*n+o*o,c=this.volume(t,this.weights);return s-a/c}cut(t,r){let n=this.volume(t,this.momentsR),o=this.volume(t,this.momentsG),s=this.volume(t,this.momentsB),a=this.volume(t,this.weights),c=this.maximize(t,_.RED,t.r0+1,t.r1,n,o,s,a),h=this.maximize(t,_.GREEN,t.g0+1,t.g1,n,o,s,a),m=this.maximize(t,_.BLUE,t.b0+1,t.b1,n,o,s,a),l,p=c.maximum,y=h.maximum,f=m.maximum;if(p>=y&&p>=f){if(c.cutLocation<0)return!1;l=_.RED}else y>=p&&y>=f?l=_.GREEN:l=_.BLUE;switch(r.r1=t.r1,r.g1=t.g1,r.b1=t.b1,l){case _.RED:t.r1=c.cutLocation,r.r0=t.r1,r.g0=t.g0,r.b0=t.b0;break;case _.GREEN:t.g1=h.cutLocation,r.r0=t.r0,r.g0=t.g1,r.b0=t.b0;break;case _.BLUE:t.b1=m.cutLocation,r.r0=t.r0,r.g0=t.g0,r.b0=t.b1;break;default:throw new Error("unexpected direction "+l)}return t.vol=(t.r1-t.r0)*(t.g1-t.g0)*(t.b1-t.b0),r.vol=(r.r1-r.r0)*(r.g1-r.g0)*(r.b1-r.b0),!0}maximize(t,r,n,o,s,a,c,h){let m=this.bottom(t,r,this.momentsR),l=this.bottom(t,r,this.momentsG),p=this.bottom(t,r,this.momentsB),y=this.bottom(t,r,this.weights),f=0,g=-1,u=0,b=0,I=0,d=0;for(let x=n;x<o;x++){if(u=m+this.top(t,r,x,this.momentsR),b=l+this.top(t,r,x,this.momentsG),I=p+this.top(t,r,x,this.momentsB),d=y+this.top(t,r,x,this.weights),d===0)continue;let T=(u*u+b*b+I*I)*1,D=d*1,S=T/D;u=s-u,b=a-b,I=c-I,d=h-d,d!==0&&(T=(u*u+b*b+I*I)*1,D=d*1,S+=T/D,S>f&&(f=S,g=x))}return new $t(g,f)}volume(t,r){return r[this.getIndex(t.r1,t.g1,t.b1)]-r[this.getIndex(t.r1,t.g1,t.b0)]-r[this.getIndex(t.r1,t.g0,t.b1)]+r[this.getIndex(t.r1,t.g0,t.b0)]-r[this.getIndex(t.r0,t.g1,t.b1)]+r[this.getIndex(t.r0,t.g1,t.b0)]+r[this.getIndex(t.r0,t.g0,t.b1)]-r[this.getIndex(t.r0,t.g0,t.b0)]}bottom(t,r,n){switch(r){case _.RED:return-n[this.getIndex(t.r0,t.g1,t.b1)]+n[this.getIndex(t.r0,t.g1,t.b0)]+n[this.getIndex(t.r0,t.g0,t.b1)]-n[this.getIndex(t.r0,t.g0,t.b0)];case _.GREEN:return-n[this.getIndex(t.r1,t.g0,t.b1)]+n[this.getIndex(t.r1,t.g0,t.b0)]+n[this.getIndex(t.r0,t.g0,t.b1)]-n[this.getIndex(t.r0,t.g0,t.b0)];case _.BLUE:return-n[this.getIndex(t.r1,t.g1,t.b0)]+n[this.getIndex(t.r1,t.g0,t.b0)]+n[this.getIndex(t.r0,t.g1,t.b0)]-n[this.getIndex(t.r0,t.g0,t.b0)];default:throw new Error("unexpected direction $direction")}}top(t,r,n,o){switch(r){case _.RED:return o[this.getIndex(n,t.g1,t.b1)]-o[this.getIndex(n,t.g1,t.b0)]-o[this.getIndex(n,t.g0,t.b1)]+o[this.getIndex(n,t.g0,t.b0)];case _.GREEN:return o[this.getIndex(t.r1,n,t.b1)]-o[this.getIndex(t.r1,n,t.b0)]-o[this.getIndex(t.r0,n,t.b1)]+o[this.getIndex(t.r0,n,t.b0)];case _.BLUE:return o[this.getIndex(t.r1,t.g1,n)]-o[this.getIndex(t.r1,t.g0,n)]-o[this.getIndex(t.r0,t.g1,n)]+o[this.getIndex(t.r0,t.g0,n)];default:throw new Error("unexpected direction $direction")}}getIndex(t,r,n){return(t<<Ot*2)+(t<<Ot+1)+t+(r<<Ot)+r+n}},jt=class{constructor(t=0,r=0,n=0,o=0,s=0,a=0,c=0){this.r0=t,this.r1=r,this.g0=n,this.g1=o,this.b0=s,this.b1=a,this.vol=c}},Wt=class{constructor(t,r){this.requestedCount=t,this.resultCount=r}},$t=class{constructor(t,r){this.cutLocation=t,this.maximum=r}};var vt=class{static quantize(t,r){let o=new Et().quantize(t,r);return Rt.quantize(t,o,r)}};var xt=class e{get primary(){return this.props.primary}get onPrimary(){return this.props.onPrimary}get primaryContainer(){return this.props.primaryContainer}get onPrimaryContainer(){return this.props.onPrimaryContainer}get secondary(){return this.props.secondary}get onSecondary(){return this.props.onSecondary}get secondaryContainer(){return this.props.secondaryContainer}get onSecondaryContainer(){return this.props.onSecondaryContainer}get tertiary(){return this.props.tertiary}get onTertiary(){return this.props.onTertiary}get tertiaryContainer(){return this.props.tertiaryContainer}get onTertiaryContainer(){return this.props.onTertiaryContainer}get error(){return this.props.error}get onError(){return this.props.onError}get errorContainer(){return this.props.errorContainer}get onErrorContainer(){return this.props.onErrorContainer}get background(){return this.props.background}get onBackground(){return this.props.onBackground}get surface(){return this.props.surface}get onSurface(){return this.props.onSurface}get surfaceVariant(){return this.props.surfaceVariant}get onSurfaceVariant(){return this.props.onSurfaceVariant}get outline(){return this.props.outline}get outlineVariant(){return this.props.outlineVariant}get shadow(){return this.props.shadow}get scrim(){return this.props.scrim}get inverseSurface(){return this.props.inverseSurface}get inverseOnSurface(){return this.props.inverseOnSurface}get inversePrimary(){return this.props.inversePrimary}static light(t){return e.lightFromCorePalette(q.of(t))}static dark(t){return e.darkFromCorePalette(q.of(t))}static lightContent(t){return e.lightFromCorePalette(q.contentOf(t))}static darkContent(t){return e.darkFromCorePalette(q.contentOf(t))}static lightFromCorePalette(t){return new e({primary:t.a1.tone(40),onPrimary:t.a1.tone(100),primaryContainer:t.a1.tone(90),onPrimaryContainer:t.a1.tone(10),secondary:t.a2.tone(40),onSecondary:t.a2.tone(100),secondaryContainer:t.a2.tone(90),onSecondaryContainer:t.a2.tone(10),tertiary:t.a3.tone(40),onTertiary:t.a3.tone(100),tertiaryContainer:t.a3.tone(90),onTertiaryContainer:t.a3.tone(10),error:t.error.tone(40),onError:t.error.tone(100),errorContainer:t.error.tone(90),onErrorContainer:t.error.tone(10),background:t.n1.tone(99),onBackground:t.n1.tone(10),surface:t.n1.tone(99),onSurface:t.n1.tone(10),surfaceVariant:t.n2.tone(90),onSurfaceVariant:t.n2.tone(30),outline:t.n2.tone(50),outlineVariant:t.n2.tone(80),shadow:t.n1.tone(0),scrim:t.n1.tone(0),inverseSurface:t.n1.tone(20),inverseOnSurface:t.n1.tone(95),inversePrimary:t.a1.tone(80)})}static darkFromCorePalette(t){return new e({primary:t.a1.tone(80),onPrimary:t.a1.tone(20),primaryContainer:t.a1.tone(30),onPrimaryContainer:t.a1.tone(90),secondary:t.a2.tone(80),onSecondary:t.a2.tone(20),secondaryContainer:t.a2.tone(30),onSecondaryContainer:t.a2.tone(90),tertiary:t.a3.tone(80),onTertiary:t.a3.tone(20),tertiaryContainer:t.a3.tone(30),onTertiaryContainer:t.a3.tone(90),error:t.error.tone(80),onError:t.error.tone(20),errorContainer:t.error.tone(30),onErrorContainer:t.error.tone(80),background:t.n1.tone(10),onBackground:t.n1.tone(90),surface:t.n1.tone(10),onSurface:t.n1.tone(90),surfaceVariant:t.n2.tone(30),onSurfaceVariant:t.n2.tone(80),outline:t.n2.tone(60),outlineVariant:t.n2.tone(30),shadow:t.n1.tone(0),scrim:t.n1.tone(0),inverseSurface:t.n1.tone(90),inverseOnSurface:t.n1.tone(20),inversePrimary:t.a1.tone(40)})}constructor(t){this.props=t}toJSON(){return{...this.props}}};var se=class e{get colorAccentPrimary(){return this.props.colorAccentPrimary}get colorAccentPrimaryVariant(){return this.props.colorAccentPrimaryVariant}get colorAccentSecondary(){return this.props.colorAccentSecondary}get colorAccentSecondaryVariant(){return this.props.colorAccentSecondaryVariant}get colorAccentTertiary(){return this.props.colorAccentTertiary}get colorAccentTertiaryVariant(){return this.props.colorAccentTertiaryVariant}get textColorPrimary(){return this.props.textColorPrimary}get textColorSecondary(){return this.props.textColorSecondary}get textColorTertiary(){return this.props.textColorTertiary}get textColorPrimaryInverse(){return this.props.textColorPrimaryInverse}get textColorSecondaryInverse(){return this.props.textColorSecondaryInverse}get textColorTertiaryInverse(){return this.props.textColorTertiaryInverse}get colorBackground(){return this.props.colorBackground}get colorBackgroundFloating(){return this.props.colorBackgroundFloating}get colorSurface(){return this.props.colorSurface}get colorSurfaceVariant(){return this.props.colorSurfaceVariant}get colorSurfaceHighlight(){return this.props.colorSurfaceHighlight}get surfaceHeader(){return this.props.surfaceHeader}get underSurface(){return this.props.underSurface}get offState(){return this.props.offState}get accentSurface(){return this.props.accentSurface}get textPrimaryOnAccent(){return this.props.textPrimaryOnAccent}get textSecondaryOnAccent(){return this.props.textSecondaryOnAccent}get volumeBackground(){return this.props.volumeBackground}get scrim(){return this.props.scrim}static light(t){let r=q.of(t);return e.lightFromCorePalette(r)}static dark(t){let r=q.of(t);return e.darkFromCorePalette(r)}static lightContent(t){let r=q.contentOf(t);return e.lightFromCorePalette(r)}static darkContent(t){let r=q.contentOf(t);return e.darkFromCorePalette(r)}static lightFromCorePalette(t){return new e({colorAccentPrimary:t.a1.tone(90),colorAccentPrimaryVariant:t.a1.tone(40),colorAccentSecondary:t.a2.tone(90),colorAccentSecondaryVariant:t.a2.tone(40),colorAccentTertiary:t.a3.tone(90),colorAccentTertiaryVariant:t.a3.tone(40),textColorPrimary:t.n1.tone(10),textColorSecondary:t.n2.tone(30),textColorTertiary:t.n2.tone(50),textColorPrimaryInverse:t.n1.tone(95),textColorSecondaryInverse:t.n1.tone(80),textColorTertiaryInverse:t.n1.tone(60),colorBackground:t.n1.tone(95),colorBackgroundFloating:t.n1.tone(98),colorSurface:t.n1.tone(98),colorSurfaceVariant:t.n1.tone(90),colorSurfaceHighlight:t.n1.tone(100),surfaceHeader:t.n1.tone(90),underSurface:t.n1.tone(0),offState:t.n1.tone(20),accentSurface:t.a2.tone(95),textPrimaryOnAccent:t.n1.tone(10),textSecondaryOnAccent:t.n2.tone(30),volumeBackground:t.n1.tone(25),scrim:t.n1.tone(80)})}static darkFromCorePalette(t){return new e({colorAccentPrimary:t.a1.tone(90),colorAccentPrimaryVariant:t.a1.tone(70),colorAccentSecondary:t.a2.tone(90),colorAccentSecondaryVariant:t.a2.tone(70),colorAccentTertiary:t.a3.tone(90),colorAccentTertiaryVariant:t.a3.tone(70),textColorPrimary:t.n1.tone(95),textColorSecondary:t.n2.tone(80),textColorTertiary:t.n2.tone(60),textColorPrimaryInverse:t.n1.tone(10),textColorSecondaryInverse:t.n1.tone(30),textColorTertiaryInverse:t.n1.tone(50),colorBackground:t.n1.tone(10),colorBackgroundFloating:t.n1.tone(10),colorSurface:t.n1.tone(20),colorSurfaceVariant:t.n1.tone(30),colorSurfaceHighlight:t.n1.tone(35),surfaceHeader:t.n1.tone(30),underSurface:t.n1.tone(0),offState:t.n1.tone(20),accentSurface:t.a2.tone(95),textPrimaryOnAccent:t.n1.tone(10),textSecondaryOnAccent:t.n2.tone(30),volumeBackground:t.n1.tone(25),scrim:t.n1.tone(80)})}constructor(t){this.props=t}toJSON(){return{...this.props}}};var mt=class e{constructor(t){this.input=t,this.hctsByTempCache=[],this.hctsByHueCache=[],this.tempsByHctCache=new Map,this.inputRelativeTemperatureCache=-1,this.complementCache=null}get hctsByTemp(){if(this.hctsByTempCache.length>0)return this.hctsByTempCache;let t=this.hctsByHue.concat([this.input]),r=this.tempsByHct;return t.sort((n,o)=>r.get(n)-r.get(o)),this.hctsByTempCache=t,t}get warmest(){return this.hctsByTemp[this.hctsByTemp.length-1]}get coldest(){return this.hctsByTemp[0]}analogous(t=5,r=12){let n=Math.round(this.input.hue),o=this.hctsByHue[n],s=this.relativeTemperature(o),a=[o],c=0;for(let g=0;g<360;g++){let u=ht(n+g),b=this.hctsByHue[u],I=this.relativeTemperature(b),d=Math.abs(I-s);s=I,c+=d}let h=1,m=c/r,l=0;for(s=this.relativeTemperature(o);a.length<r;){let g=ht(n+h),u=this.hctsByHue[g],b=this.relativeTemperature(u),I=Math.abs(b-s);l+=I;let d=a.length*m,x=l>=d,T=1;for(;x&&a.length<r;){a.push(u);let D=(a.length+T)*m;x=l>=D,T++}if(s=b,h++,h>360){for(;a.length<r;)a.push(u);break}}let p=[this.input],y=Math.floor((t-1)/2);for(let g=1;g<y+1;g++){let u=0-g;for(;u<0;)u=a.length+u;u>=a.length&&(u=u%a.length),p.splice(0,0,a[u])}let f=t-y-1;for(let g=1;g<f+1;g++){let u=g;for(;u<0;)u=a.length+u;u>=a.length&&(u=u%a.length),p.push(a[u])}return p}get complement(){if(this.complementCache!=null)return this.complementCache;let t=this.coldest.hue,r=this.tempsByHct.get(this.coldest),n=this.warmest.hue,s=this.tempsByHct.get(this.warmest)-r,a=e.isBetween(this.input.hue,t,n),c=a?n:t,h=a?t:n,m=1,l=1e3,p=this.hctsByHue[Math.round(this.input.hue)],y=1-this.inputRelativeTemperature;for(let f=0;f<=360;f+=1){let g=E(c+m*f);if(!e.isBetween(g,c,h))continue;let u=this.hctsByHue[Math.round(g)],b=(this.tempsByHct.get(u)-r)/s,I=Math.abs(y-b);I<l&&(l=I,p=u)}return this.complementCache=p,this.complementCache}relativeTemperature(t){let r=this.tempsByHct.get(this.warmest)-this.tempsByHct.get(this.coldest),n=this.tempsByHct.get(t)-this.tempsByHct.get(this.coldest);return r===0?.5:n/r}get inputRelativeTemperature(){return this.inputRelativeTemperatureCache>=0?this.inputRelativeTemperatureCache:(this.inputRelativeTemperatureCache=this.relativeTemperature(this.input),this.inputRelativeTemperatureCache)}get tempsByHct(){if(this.tempsByHctCache.size>0)return this.tempsByHctCache;let t=this.hctsByHue.concat([this.input]),r=new Map;for(let n of t)r.set(n,e.rawTemperature(n));return this.tempsByHctCache=r,r}get hctsByHue(){if(this.hctsByHueCache.length>0)return this.hctsByHueCache;let t=[];for(let r=0;r<=360;r+=1){let n=B.from(r,this.input.chroma,this.input.tone);t.push(n)}return this.hctsByHueCache=t,this.hctsByHueCache}static isBetween(t,r,n){return r<n?r<=t&&t<=n:r<=t||t<=n}static rawTemperature(t){let r=Ft(t.toInt()),n=E(Math.atan2(r[2],r[1])*180/Math.PI),o=Math.sqrt(r[1]*r[1]+r[2]*r[2]);return-.5+.02*Math.pow(o,1.07)*Math.cos(E(n-50)*Math.PI/180)}};var ie=class extends H{constructor(t,r,n){super({sourceColorArgb:t.toInt(),variant:R.CONTENT,contrastLevel:n,isDark:r,primaryPalette:P.fromHueAndChroma(t.hue,t.chroma),secondaryPalette:P.fromHueAndChroma(t.hue,Math.max(t.chroma-32,t.chroma*.5)),tertiaryPalette:P.fromInt(rt.fixIfDisliked(new mt(t).analogous(3,6)[2]).toInt()),neutralPalette:P.fromHueAndChroma(t.hue,t.chroma/8),neutralVariantPalette:P.fromHueAndChroma(t.hue,t.chroma/8+4)})}};var Ct=class e extends H{constructor(t,r,n){super({sourceColorArgb:t.toInt(),variant:R.EXPRESSIVE,contrastLevel:n,isDark:r,primaryPalette:P.fromHueAndChroma(E(t.hue+240),40),secondaryPalette:P.fromHueAndChroma(H.getRotatedHue(t,e.hues,e.secondaryRotations),24),tertiaryPalette:P.fromHueAndChroma(H.getRotatedHue(t,e.hues,e.tertiaryRotations),32),neutralPalette:P.fromHueAndChroma(t.hue+15,8),neutralVariantPalette:P.fromHueAndChroma(t.hue+15,12)})}};Ct.hues=[0,21,51,121,151,191,271,321,360];Ct.secondaryRotations=[45,95,45,20,45,90,45,45,45];Ct.tertiaryRotations=[120,120,20,45,20,15,20,120,120];var ce=class extends H{constructor(t,r,n){super({sourceColorArgb:t.toInt(),variant:R.FIDELITY,contrastLevel:n,isDark:r,primaryPalette:P.fromHueAndChroma(t.hue,t.chroma),secondaryPalette:P.fromHueAndChroma(t.hue,Math.max(t.chroma-32,t.chroma*.5)),tertiaryPalette:P.fromInt(rt.fixIfDisliked(new mt(t).complement).toInt()),neutralPalette:P.fromHueAndChroma(t.hue,t.chroma/8),neutralVariantPalette:P.fromHueAndChroma(t.hue,t.chroma/8+4)})}};var le=class extends H{constructor(t,r,n){super({sourceColorArgb:t.toInt(),variant:R.FRUIT_SALAD,contrastLevel:n,isDark:r,primaryPalette:P.fromHueAndChroma(E(t.hue-50),48),secondaryPalette:P.fromHueAndChroma(E(t.hue-50),36),tertiaryPalette:P.fromHueAndChroma(t.hue,36),neutralPalette:P.fromHueAndChroma(t.hue,10),neutralVariantPalette:P.fromHueAndChroma(t.hue,16)})}};var he=class extends H{constructor(t,r,n){super({sourceColorArgb:t.toInt(),variant:R.MONOCHROME,contrastLevel:n,isDark:r,primaryPalette:P.fromHueAndChroma(t.hue,0),secondaryPalette:P.fromHueAndChroma(t.hue,0),tertiaryPalette:P.fromHueAndChroma(t.hue,0),neutralPalette:P.fromHueAndChroma(t.hue,0),neutralVariantPalette:P.fromHueAndChroma(t.hue,0)})}};var ue=class extends H{constructor(t,r,n){super({sourceColorArgb:t.toInt(),variant:R.NEUTRAL,contrastLevel:n,isDark:r,primaryPalette:P.fromHueAndChroma(t.hue,12),secondaryPalette:P.fromHueAndChroma(t.hue,8),tertiaryPalette:P.fromHueAndChroma(t.hue,16),neutralPalette:P.fromHueAndChroma(t.hue,2),neutralVariantPalette:P.fromHueAndChroma(t.hue,2)})}};var me=class extends H{constructor(t,r,n){super({sourceColorArgb:t.toInt(),variant:R.RAINBOW,contrastLevel:n,isDark:r,primaryPalette:P.fromHueAndChroma(t.hue,48),secondaryPalette:P.fromHueAndChroma(t.hue,16),tertiaryPalette:P.fromHueAndChroma(E(t.hue+60),24),neutralPalette:P.fromHueAndChroma(t.hue,0),neutralVariantPalette:P.fromHueAndChroma(t.hue,0)})}};var fe=class extends H{constructor(t,r,n){super({sourceColorArgb:t.toInt(),variant:R.TONAL_SPOT,contrastLevel:n,isDark:r,primaryPalette:P.fromHueAndChroma(t.hue,36),secondaryPalette:P.fromHueAndChroma(t.hue,16),tertiaryPalette:P.fromHueAndChroma(E(t.hue+60),24),neutralPalette:P.fromHueAndChroma(t.hue,6),neutralVariantPalette:P.fromHueAndChroma(t.hue,8)})}};var bt=class e extends H{constructor(t,r,n){super({sourceColorArgb:t.toInt(),variant:R.VIBRANT,contrastLevel:n,isDark:r,primaryPalette:P.fromHueAndChroma(t.hue,200),secondaryPalette:P.fromHueAndChroma(H.getRotatedHue(t,e.hues,e.secondaryRotations),24),tertiaryPalette:P.fromHueAndChroma(H.getRotatedHue(t,e.hues,e.tertiaryRotations),32),neutralPalette:P.fromHueAndChroma(t.hue,10),neutralVariantPalette:P.fromHueAndChroma(t.hue,12)})}};bt.hues=[0,41,61,101,131,181,251,301,360];bt.secondaryRotations=[18,15,10,12,15,18,15,12,12];bt.tertiaryRotations=[35,30,20,25,30,35,30,25,25];var Me={desired:4,fallbackColorARGB:4282549748,filter:!0};function Ie(e,t){return e.score>t.score?-1:e.score<t.score?1:0}var Q=class e{constructor(){}static score(t,r){let{desired:n,fallbackColorARGB:o,filter:s}={...Me,...r},a=[],c=new Array(360).fill(0),h=0;for(let[f,g]of t.entries()){let u=B.fromInt(f);a.push(u);let b=Math.floor(u.hue);c[b]+=g,h+=g}let m=new Array(360).fill(0);for(let f=0;f<360;f++){let g=c[f]/h;for(let u=f-14;u<f+16;u++){let b=ht(u);m[b]+=g}}let l=new Array;for(let f of a){let g=ht(Math.round(f.hue)),u=m[g];if(s&&(f.chroma<e.CUTOFF_CHROMA||u<=e.CUTOFF_EXCITED_PROPORTION))continue;let b=u*100*e.WEIGHT_PROPORTION,I=f.chroma<e.TARGET_CHROMA?e.WEIGHT_CHROMA_BELOW:e.WEIGHT_CHROMA_ABOVE,d=(f.chroma-e.TARGET_CHROMA)*I,x=b+d;l.push({hct:f,score:x})}l.sort(Ie);let p=[];for(let f=90;f>=15;f--){p.length=0;for(let{hct:g}of l)if(p.find(b=>It(g.hue,b.hue)<f)||p.push(g),p.length>=n)break;if(p.length>=n)break}let y=[];p.length===0&&y.push(o);for(let f of p)y.push(f.toInt());return y}};Q.TARGET_CHROMA=48;Q.WEIGHT_PROPORTION=.7;Q.WEIGHT_CHROMA_ABOVE=.3;Q.WEIGHT_CHROMA_BELOW=.1;Q.CUTOFF_CHROMA=5;Q.CUTOFF_EXCITED_PROPORTION=.01;function Kt(e){let t=st(e),r=it(e),n=ct(e),o=[t.toString(16),r.toString(16),n.toString(16)];for(let[s,a]of o.entries())a.length===1&&(o[s]="0"+a);return"#"+o.join("")}function Pn(e){e=e.replace("#","");let t=e.length===3,r=e.length===6,n=e.length===8;if(!t&&!r&&!n)throw new Error("unexpected hex "+e);let o=0,s=0,a=0;return t?(o=tt(e.slice(0,1).repeat(2)),s=tt(e.slice(1,2).repeat(2)),a=tt(e.slice(2,3).repeat(2))):r?(o=tt(e.slice(0,2)),s=tt(e.slice(2,4)),a=tt(e.slice(4,6))):n&&(o=tt(e.slice(2,4)),s=tt(e.slice(4,6)),a=tt(e.slice(6,8))),(255<<24|(o&255)<<16|(s&255)<<8|a&255)>>>0}function tt(e){return parseInt(e,16)}async function pe(e){let t=await new Promise((a,c)=>{let h=document.createElement("canvas"),m=h.getContext("2d");if(!m){c(new Error("Could not get canvas context"));return}let l=()=>{h.width=e.width,h.height=e.height,m.drawImage(e,0,0);let y=[0,0,e.width,e.height],f=e.dataset.area;f&&/^\d+(\s*,\s*\d+){3}$/.test(f)&&(y=f.split(/\s*,\s*/).map(d=>parseInt(d,10)));let[g,u,b,I]=y;a(m.getImageData(g,u,b,I).data)},p=()=>{c(new Error("Image load failed"))};e.complete?l():(e.onload=l,e.onerror=p)}),r=[];for(let a=0;a<t.length;a+=4){let c=t[a],h=t[a+1],m=t[a+2];if(t[a+3]<255)continue;let p=gt(c,h,m);r.push(p)}let n=vt.quantize(r,128);return Q.score(n)[0]}function De(e,t=[]){let r=q.of(e);return{source:e,schemes:{light:xt.light(e),dark:xt.dark(e)},palettes:{primary:r.a1,secondary:r.a2,tertiary:r.a3,neutral:r.n1,neutralVariant:r.n2,error:r.error},customColors:t.map(n=>Te(e,n))}}async function Fn(e,t=[]){let r=await pe(e);return De(r,t)}function Te(e,t){let r=t.value,n=r,o=e;t.blend&&(r=Bt.harmonize(n,o));let a=q.of(r).a1;return{color:t,value:r,light:{color:a.tone(40),onColor:a.tone(100),colorContainer:a.tone(90),onColorContainer:a.tone(10)},dark:{color:a.tone(80),onColor:a.tone(20),colorContainer:a.tone(30),onColorContainer:a.tone(90)}}}function Bn(e,t){let r=t?.target||document.body,o=t?.dark??!1?e.schemes.dark:e.schemes.light;if(Jt(r,o),t?.brightnessSuffix&&(Jt(r,e.schemes.dark,"-dark"),Jt(r,e.schemes.light,"-light")),t?.paletteTones){let s=t?.paletteTones??[];for(let[a,c]of Object.entries(e.palettes)){let h=a.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();for(let m of s){let l=`--md-ref-palette-${h}-${h}${m}`,p=Kt(c.tone(m));r.style.setProperty(l,p)}}}}function Jt(e,t,r=""){for(let[n,o]of Object.entries(t.toJSON())){let s=n.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=Kt(o);e.style.setProperty(`--md-sys-color-${s}${r}`,a)}}export{Bt as Blend,U as Cam16,G as Contrast,q as CorePalette,rt as DislikeAnalyzer,A as DynamicColor,H as DynamicScheme,B as Hct,i as MaterialDynamicColors,vt as QuantizerCelebi,Ht as QuantizerMap,Rt as QuantizerWsmeans,Et as QuantizerWu,xt as Scheme,se as SchemeAndroid,ie as SchemeContent,Ct as SchemeExpressive,ce as SchemeFidelity,le as SchemeFruitSalad,he as SchemeMonochrome,ue as SchemeNeutral,me as SchemeRainbow,fe as SchemeTonalSpot,bt as SchemeVibrant,Q as Score,mt as TemperatureCache,P as TonalPalette,j as ViewingConditions,wt as alphaFromArgb,Bn as applyTheme,Pn as argbFromHex,ne as argbFromLab,Gt as argbFromLinrgb,oe as argbFromLstar,gt as argbFromRgb,Be as argbFromRgba,qt as argbFromXyz,ct as blueFromArgb,lt as clampDouble,te as clampInt,Te as customColor,at as delinearized,It as differenceDegrees,it as greenFromArgb,Kt as hexFromArgb,we as isOpaque,Ft as labFromArgb,ot as lerp,Z as linearized,dt as lstarFromArgb,yt as lstarFromY,ft as matrixMultiply,st as redFromArgb,Fe as rgbaFromArgb,ee as rotationDirection,E as sanitizeDegreesDouble,ht as sanitizeDegreesInt,V as signum,pe as sourceColorFromImage,Fn as themeFromImage,De as themeFromSourceColor,ae as whitePointD65,Ce as xyzFromArgb,$ as yFromLstar};
/*! Bundled license information:

@material/material-color-utilities/utils/math_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/color_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/viewing_conditions.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/cam16.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/hct_solver.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/hct.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/blend/blend.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/contrast/contrast.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dislike/dislike_analyzer.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/dynamic_color.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/palettes/tonal_palette.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/contrast_curve.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/tone_delta_pair.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/variant.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/material_dynamic_colors.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/dynamic_scheme.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/palettes/core_palette.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/lab_point_provider.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_wsmeans.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_map.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_wu.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_celebi.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_android.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/temperature/temperature_cache.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_content.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_expressive.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_fidelity.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_fruit_salad.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_monochrome.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_neutral.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_rainbow.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_tonal_spot.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_vibrant.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/score/score.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/string_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/image_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/theme_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/index.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=material-color-utilities.mjs.map