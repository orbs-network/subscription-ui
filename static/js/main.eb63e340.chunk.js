(this["webpackJsonpsubscription-ui"]=this["webpackJsonpsubscription-ui"]||[]).push([[0],{193:function(e){e.exports=JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"}],"name":"reclaimToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddr","type":"address"}],"name":"reclaimContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TOTAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from_","type":"address"},{"name":"value_","type":"uint256"},{"name":"data_","type":"bytes"}],"name":"tokenFallback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_distributor","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]')},203:function(e,t,a){e.exports=a(425)},208:function(e,t,a){},210:function(e,t,a){},223:function(e,t){},248:function(e,t){},250:function(e,t){},317:function(e,t){},425:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(12),r=a.n(s),u=(a(208),a(15)),o=a.n(u),l=a(33),c=a(23),p=a(24),m=a(27),d=a(28),b=(a(210),a(459)),y=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;Object(c.a)(this,a),n=t.call(this,e);var i=window.ethereum;return n.state={ethereum:i,ethereumAvailable:void 0!==i,onEthereumEnabled:e.onEthereumEnabled},n}return Object(p.a)(a,[{key:"render",value:function(){var e=this;return this.state.ethereumAvailable?i.a.createElement("div",null,i.a.createElement("p",null,"An Ethereum wallet is required."),i.a.createElement(b.a,{variant:"contained",color:"primary",onClick:function(){return e.connect()}},"Connect wallet")):i.a.createElement("div",null,i.a.createElement("p",null,"An Ethereum wallet is required."),i.a.createElement("p",null,"On desktop, use a web3 browser extension like Metamask."),i.a.createElement("p",null,"On mobile, use a mobile app wallet that supports web3 like status.im, imToken or TrustWallet."))}},{key:"connect",value:function(){var e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.state.ethereum.enable();case 3:this.state.onEthereumEnabled(!0),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,this,[[0,6]])})));return function(){return e.apply(this,arguments)}}()}]),a}(i.a.Component),f=a(192),h=a.n(f),v=a(4),w=a(473),E=a(467),x=a(466),g=a(468),S=a(465),C=a(92),T=a(469),k=a(470),O=a(475),M=a(474),I=a(471),_=a(193),A=a(87),j=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={countdown:0,approveTxStatus:"pending",subscribeTxStatus:"pending",distributeTxStatus:"pending"},n}return Object(p.a)(a,[{key:"getTxStatus",value:function(e){return e?e.status?"confirmed":"failed":"pending"}},{key:"componentDidMount",value:function(){var e=this,t=this.props.web3;this.setState({countdown:0});var a=setInterval((function(){e.setState({countdown:e.state.countdown+1})}),1e3),n=setInterval(Object(l.a)(o.a.mark((function i(){var s,r,u;return o.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,t.eth.getTransactionReceipt(e.props.approveTxHash);case 2:return s=i.sent,i.next=5,t.eth.getTransactionReceipt(e.props.subscribeTxHash);case 5:return r=i.sent,i.next=8,t.eth.getTransactionReceipt(e.props.distributeTxHash);case 8:u=i.sent,e.setState({approveTxStatus:e.getTxStatus(s),subscribeTxStatus:e.getTxStatus(r),distributeTxStatus:e.getTxStatus(u)}),s&&r&&u&&(clearInterval(n),clearInterval(a),e.setState({confirmationInterval:void 0,countdownInterval:void 0}),e.props.onSuccess(e.verifySuccess()));case 11:case"end":return i.stop()}}),i)}))),3e3);this.setState({countdownInterval:a,confirmationInterval:n})}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.countdownInterval),clearInterval(this.state.confirmationInterval)}},{key:"getEtherscanURL",value:function(e){var t=this.props.config;return"https://".concat("mainnet"===t.network?"":t.network+".","etherscan.io/tx/").concat(e)}},{key:"verifySuccess",value:function(){var e=this.state,t=e.approveTxStatus,a=e.subscribeTxStatus,n=e.distributeTxStatus;return"confirmed"===t&&"confirmed"===a&&"confirmed"===n}},{key:"render",value:function(){var e=this.state,t=e.countdown,a=e.approveTxStatus,n=e.subscribeTxStatus,s=e.distributeTxStatus,r=this.props,u=r.approveTxHash,o=r.subscribeTxHash,l=r.distributeTxHash;return i.a.createElement("div",null,this.state.countdownInterval&&i.a.createElement(C.a,{paragraph:!0},"Waiting for transaction confirmation for ",t," seconds..."),i.a.createElement(C.a,{paragraph:!0},"ERC20 approval ",i.a.createElement("a",{href:this.getEtherscanURL(u),target:"_blank",className:"App-monospace"},u)," ",a),i.a.createElement(C.a,{paragraph:!0},"Subscription ",i.a.createElement("a",{href:this.getEtherscanURL(o),target:"_blank",className:"App-monospace"},o)," ",n),i.a.createElement(C.a,{paragraph:!0},"Fee distribution ",i.a.createElement("a",{href:this.getEtherscanURL(l),target:"_blank",className:"App-monospace"},l)," ",s))}}]),a}(i.a.Component),V=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={description:"",paidTill:0},n}return Object(p.a)(a,[{key:"componentDidMount",value:function(){var e=Object(l.a)(o.a.mark((function e(){var t,a,n,i,s,r,u,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props,a=t.web3,n=t.config,i=t.virtualChainId,s=new a.eth.Contract(A,n.subscriptionAddress),e.next=4,s.methods.getSubscriptionData(i).call();case 4:r=e.sent,u=r[1],l=1e3*(Number(r[2])+2592e3),this.props.onMetadataUpdate&&this.props.onMetadataUpdate({description:u,startTime:l}),this.setState({description:u,paidTill:l});case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.props.virtualChainId,t=this.state,a=t.description,n=t.paidTill;return a&&n?i.a.createElement("form",{noValidate:!0,autoComplete:"off"},i.a.createElement(O.a,{htmlFor:"vcid"},"Virtual Chain Id"),i.a.createElement(M.a,{name:"vcid",value:BigInt(e).toString(),disabled:!0}),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(O.a,{htmlFor:"description"},"Description"),i.a.createElement(M.a,{name:"description",value:a,disabled:!0}),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(O.a,{htmlFor:"paid-till"},"Paid Until"),i.a.createElement(M.a,{name:"paid-till",value:new Date(n),disabled:!0})):i.a.createElement("div",null,"Virtual Chain ID not found")}}]),a}(i.a.Component),F=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={description:"",subscriptionAmount:e.config.minimalSubscriptionAmount,success:!1},n}return Object(p.a)(a,[{key:"hasPendingTransactions",value:function(){return void 0!==(this.state.approveTxHash||this.state.subscribeTxHash)}},{key:"render",value:function(){var e=this,t=this.props.config;if(this.state.validationError)return i.a.createElement("div",null,"Error: ",this.state.validationError);if(this.hasPendingTransactions()){var a=this.props,n=a.web3,s=a.virtualChainId;return i.a.createElement("div",null,i.a.createElement(j,{web3:n,config:t,approveTxHash:this.state.approveTxHash,subscribeTxHash:this.state.subscribeTxHash,distributeTxHash:this.state.distributeTxHash,virtualChainId:s,onSuccess:function(t){return e.setState({success:t})}}),this.state.success&&i.a.createElement(V,{virtualChainId:s,config:t,web3:n}))}return i.a.createElement("form",{noValidate:!0,autoComplete:"off"},!this.props.description&&i.a.createElement("div",null,i.a.createElement(O.a,{htmlFor:"description"},"Description"),i.a.createElement(M.a,{name:"description",onChange:function(t){return e.setState({description:t.target.value})}}),i.a.createElement("br",null),i.a.createElement("br",null)),i.a.createElement(O.a,{htmlFor:"subscription"},this.props.subscriptionLabel),i.a.createElement(I.a,{native:!0,value:this.state.subscriptionAmount,onChange:function(t){return e.setState({subscriptionAmount:Number(t.target.value)})},name:"subscription"},i.a.createElement("option",{value:t.minimalSubscriptionAmount},"One month - ",t.minimalSubscriptionAmount," ORBS"),i.a.createElement("option",{value:2*t.minimalSubscriptionAmount},"Two months - ",2*t.minimalSubscriptionAmount," ORBS"),i.a.createElement("option",{value:3*t.minimalSubscriptionAmount},"Three months - ",3*t.minimalSubscriptionAmount," ORBS")),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(b.a,{variant:"contained",color:"primary",onClick:function(){return e.subscribe()}},this.props.buttonLabel))}},{key:"subscribe",value:function(){var e=Object(l.a)(o.a.mark((function e(){var t,a,n,i,s,r,u,l,c,p,m,d=this;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props,a=t.web3,n=t.config,e.next=3,a.eth.getAccounts();case 3:return i=e.sent[0],s=new a.eth.Contract(_,n.erc20Address),r=new a.eth.Contract(A,n.subscriptionAddress),u=this.state.subscriptionAmount*Math.pow(10,n.decimals),e.next=9,s.methods.balanceOf(i).call();case 9:if(!(e.sent<u)){e.next=13;break}return this.setState({validationError:"insufficient funds"}),e.abrupt("return");case 13:l=s.methods.approve(n.subscriptionAddress,u).send.request({from:i},(function(e,t){d.setState({approveTxHash:t})})),c=r.methods.subscribeForCurrentMonth(this.props.virtualChainId,this.state.description||this.props.description,u).send.request({from:i},(function(e,t){d.setState({subscribeTxHash:t})})),p=r.methods.distributeFees().send.request({from:i},(function(e,t){d.setState({distributeTxHash:t})})),(m=new a.BatchRequest).add(l),m.add(c),m.add(p),m.execute(),this.props.onPaymentStarted&&this.props.onPaymentStarted();case 22:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),a}(i.a.Component),H=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={virtualChainId:"",description:"",opened:!1,paymentStarted:!1},n}return Object(p.a)(a,[{key:"render",value:function(){var e=this;return this.state.opened?i.a.createElement("div",null,!this.state.paymentStarted&&i.a.createElement(V,{web3:this.props.web3,config:this.props.config,virtualChainId:this.state.virtualChainId,onMetadataUpdate:function(t){return e.setState({description:t.description})}}),this.state.description&&i.a.createElement(F,{web3:this.props.web3,config:this.props.config,virtualChainId:this.state.virtualChainId,buttonLabel:"Pay",subscriptionLabel:"Payment",description:this.state.description,onPaymentStarted:function(){return e.setState({paymentStarted:!0})}})):i.a.createElement("div",null,i.a.createElement("form",{noValidate:!0,autoComplete:"off"},i.a.createElement(O.a,{htmlFor:"vcid"},"Virtual Chain Id"),i.a.createElement(M.a,{name:"vcid",onChange:function(t){return e.setState({virtualChainId:e.parseVirtualChainId(t.target.value)})}}),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(b.a,{variant:"contained",color:"primary",onClick:function(){return e.setState({opened:!0})}},"Open")))}},{key:"parseVirtualChainId",value:function(e){var t="0x0000000000000000000000000000000000000000000000000000000000000000",a=this.props.web3.utils.numberToHex(Number(e)).slice(2);return t.slice(0,t.length-a.length)+a}}]),a}(i.a.Component),N={erc20Address:"0xff56cc6b1e6ded347aa0b7676c85ab0b3d08b0fa",subscriptionAddress:"0x6e79DFB79CD53A2b08bC8c2852DecA7D73cD24fC",network:"mainnet",minimalSubscriptionAmount:6200,decimals:18},D=Object(v.a)((function(e){return{root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},drawerContainer:{overflow:"auto"},content:{flexGrow:1,padding:e.spacing(3)}}}))(function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={connected:!1,newVirtualChain:!1,existingVirtualChain:!1,config:N},n}return Object(p.a)(a,[{key:"onEthereumEnabled",value:function(){var e=Object(l.a)(o.a.mark((function e(t){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=new h.a(window.ethereum),this.setState({connected:t,web3:a});case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.props.classes;return i.a.createElement("div",{className:t.root},i.a.createElement(x.a,null),i.a.createElement(E.a,{position:"fixed",className:t.appBar},i.a.createElement(g.a,null,i.a.createElement(C.a,{variant:"h6",noWrap:!0},"Orbs Virtual Chain Console"))),i.a.createElement(w.a,{className:t.drawer,variant:"permanent",classes:{paper:t.drawerPaper}},i.a.createElement(g.a,null),i.a.createElement("div",{className:t.drawerContainer},i.a.createElement(S.a,null,i.a.createElement(T.a,{button:!0,selected:this.state.newVirtualChain,onClick:function(){return e.setState({newVirtualChain:!0,existingVirtualChain:!1})}},i.a.createElement(k.a,{primary:"New Virtual Chain"})),i.a.createElement(T.a,{button:!0,selected:this.state.existingVirtualChain,onClick:function(){return e.setState({newVirtualChain:!1,existingVirtualChain:!0})}},i.a.createElement(k.a,{primary:"Existing Virtual Chain"})),i.a.createElement(T.a,{button:!0},i.a.createElement(k.a,{primary:"Recover Virtual Chain"}))))),i.a.createElement("main",{className:t.content},i.a.createElement(g.a,null),!this.state.connected&&i.a.createElement(y,{onEthereumEnabled:function(t){return e.onEthereumEnabled(t)}}),this.state.connected&&this.state.newVirtualChain&&i.a.createElement(F,{web3:this.state.web3,config:this.state.config,virtualChainId:"0x0000000000000000000000000000000000000000000000000000000000000001",buttonLabel:"Create",subscriptionLabel:"Initial subscription"}),this.state.connected&&this.state.existingVirtualChain&&i.a.createElement(H,{web3:this.state.web3,config:this.state.config})))}}]),a}(i.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},87:function(e){e.exports=JSON.parse('[{"constant":true,"inputs":[],"name":"EMPTY","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimalMonthlySubscription","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"bytes32"},{"name":"_profile","type":"string"},{"name":"_value","type":"uint256"}],"name":"subscribeForCurrentMonth","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"bytes32"},{"name":"_year","type":"uint16"},{"name":"_month","type":"uint8"}],"name":"getSubscriptionDataByTime","outputs":[{"name":"id","type":"bytes32"},{"name":"profile","type":"string"},{"name":"startTime","type":"uint256"},{"name":"tokens","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint16"},{"name":"","type":"uint8"}],"name":"subscriptions","outputs":[{"name":"totalTokens","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"distributeFees","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"bytes32"}],"name":"getSubscriptionData","outputs":[{"name":"id","type":"bytes32"},{"name":"profile","type":"string"},{"name":"startTime","type":"uint256"},{"name":"tokens","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"validators","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"bytes32"},{"name":"_profile","type":"string"},{"name":"_value","type":"uint256"}],"name":"subscribeForNextMonth","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_year","type":"uint16"},{"name":"_month","type":"uint8"}],"name":"distributeFees","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"orbs","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"orbs_","type":"address"},{"name":"validators_","type":"address"},{"name":"minimalMonthlySubscription_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"subscriber","type":"address"},{"indexed":true,"name":"id","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"startFrom","type":"uint256"}],"name":"Subscribed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"validator","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"DistributedFees","type":"event"}]')}},[[203,1,2]]]);
//# sourceMappingURL=main.eb63e340.chunk.js.map