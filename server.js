var http = require("http");
var data = [{
    "ticketId": 1,
    "businessLineIdText": "金融",
    "businessLineId": 3,
    "ticketTypeText": "抵费券",
    "ticketType": 1,
    "name": "15元"
  },
  {
    "ticketId": 2,
    "businessLineIdText": "金融",
    "businessLineId": 3,
    "ticketTypeText": "免息券",
    "ticketType": 2,
    "name": "三期免息"
  },
  {
    "ticketId": 3,
    "businessLineIdText": "金融",
    "businessLineId": 3,
    "ticketTypeText": "抵费券",
    "ticketType": 1,
    "name": "金融抵费券"
  },
  {
    "ticketId": 4,
    "businessLineIdText": "理财",
    "businessLineId": 2,
    "ticketTypeText": "收益金",
    "ticketType": 201,
    "name": "理财金名称"
  },
  {
    "ticketId": 5,
    "businessLineIdText": "管家",
    "businessLineId": 1,
    "ticketTypeText": "还款金",
    "ticketType": 104,
    "name": "还款金名称-丁明梦"
  }];
var server = http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/plain;charset=utf-8','Access-Control-Allow-Origin':'*'});
	response.write(JSON.stringify(data));
	response.end();
});
server.listen(8888);
console.log("桌面/临时文档中的node server.....");