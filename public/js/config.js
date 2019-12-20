var ip = "127.0.0.1";
var port = 9333;

function SaveConfig(){
    ip = $axure("@ip_input").text();
    if(ip == "远程节点IP地址")
        ip = "127.0.0.1";

    port = $axure("@port_input").text();
    if(port == "远程节点连接端口（非RPC端口）")
        port = 9333;

    console.log("remote node: " + ip + ":" + port);
}