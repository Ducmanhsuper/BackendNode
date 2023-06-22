const login = require("facebook-chat-api");
let group = {};
let level = {};
	
login({email: "8dho0u9oer7r@maskedmails.com", password: "8dho0u9oer7r@maskedmails.com8dho0u9oer7r@maskedmails.com"}, (err, api) => {
    if(err) return console.error(err);

    api.listenMqtt((err, message) => {
    	if(message.isGroup == false){
    		return;
    	}
    	let idGroup = message.threadID, idSender = message.senderID;
    	if(typeof group[idGroup] == "undefined"){
    		group[idGroup] = {};
    		level[idGroup] = {};
    	}

    	if(typeof group[idGroup][idSender] == "undefined"){
    		group[idGroup][idSender] = 0;
    		level[idGroup][idSender] = 0;
    	}
    	let tin = message.body;
    	if(message.body == "-checkMyRank"){
    		// Get Rank
    		let countMessage = []; //Array to count msg of all member
    		let idMember = Object.keys(group[idGroup]);
    		idMember.map(data=>{
    			if(typeof data != "undefined" && data != "undefined"){
	    			let save = {count:group[idGroup][data],id:data}
	    			countMessage.push(save);
	    		}
    		});
    		countMessage.sort((a,b)=>b.count-a.count);

    		let cur = 1, rank = 1;
    		console.log(countMessage);
    		countMessage.map(data=>{
    			if(data.id == idSender){
    				rank = cur;
    				return;
    			}
    			cur++;
    		});
    		// End get rank
    		let name = '';
    		api.getUserInfo(idSender,(err,x)=>{
    			name = x[idSender].name;
    			api.sendMessage(`Hi `+name+`!
Bạn đang ở rank: #` + rank + `
Số exp của bạn là: `+group[idGroup][idSender]+`
Level hiện tại: `+level[idGroup][idSender], message.threadID);	
    		});
    		
    	}
    	else if(message.body == "-allRank"){
    		api.sendTypingIndicator(message.threadID);
    		// Get Rank
    		let countMessage = []; //Array to count msg of all member
    		let nameGr = []; //Array to count msg of all member
    		let idMember = Object.keys(group[idGroup]);
    		idMember.map(data=>{
    			if(typeof data != "undefined" && data != "undefined"){
	    			let save = {count:group[idGroup][data],id:data}
	    			countMessage.push(save);
	    			api.getUserInfo(data,(err,x)=>{
		    			name = x[data].name;
		    			nameGr[data] = name;
		    		});
	    		}
	    		
    		});
    		countMessage.sort((a,b)=>b.count-a.count);
    		let cur = 1, rank = 1;
    		let sendMsg = '';
    		setTimeout(()=>{
    			countMessage.map(data=>{
	    			sendMsg += 'Top '+ cur + ' là : '+ nameGr[data.id] +', có level: '+(group[idGroup][data.id] / 100 + 1)+'\n';
	    			++cur;
	    		});
	    		api.sendMessage(sendMsg, message.threadID);	
	    		
    		},2000);
    		
    		// End get rank
    	}
    	else if(message.body == "-countMessage"){
    		api.sendTypingIndicator(message.threadID);
    		api.getThreadInfo(message.threadID,(err,data)=>{
    			api.sendMessage('Tổng số tin nhắn của group là: ' + data.messageCount, message.threadID);
    		});

    	}
    	else if(String(tin).split(" ")[0] == "-cal"){
    		api.sendTypingIndicator(message.threadID);

    		let pheptinh = String(tin).substring(5,String(tin).length);
    		try{
	    		api.sendMessage(pheptinh+' = ' + eval(pheptinh), message.threadID);
	    	}
	    	catch{
	    		api.sendMessage("Lỗi phép tính!! :P", message.threadID);
	    	}
    		

    	}
    	else if(message.body == "-help"){
    		api.sendMessage('Các lệnh có của bot: \n -prefix: - \n -countMessage: Đếm tổng số tin nhắn của nhóm \n -checkMyRank: Lấy rank hiện tại của bạn \n -cal xxx: Tính, trong đó xxx là phép tính của bạn \n -allRank: Lấy danh sách rank của team \n - help: Hiển thị tất cả các lệnh', message.threadID);

    	}
    	else{
	    	if(typeof group[idGroup] == "undefined"){
	    		group[idGroup] = {};
	    		level[idGroup] = {};
	    	}

	    	if(typeof group[idGroup][idSender] == "undefined"){
	    		group[idGroup] = {};
	    		level[idGroup] = {};
	    		group[idGroup][idSender] = 0;
	    		level[idGroup][idSender] = 0;
	    	}
	    	else {
	    		group[idGroup][idSender]++;
	    		level[idGroup][idSender] = group[idGroup][idSender] / 100 + 1;
	    	}

	    	
    	}
        //api.sendMessage(message.body, message.threadID);
    });
});