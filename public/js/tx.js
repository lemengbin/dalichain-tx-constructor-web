$(document).ready(function(){
    var ip = "127.0.0.1";
    var port = 9333;

    // 系统配置
    $axure("@save_config").click(function(){
        ip = $axure("@ip_input").text();
        if(ip == "远程节点IP地址")
            ip = "127.0.0.1";

        port = $axure("@port_input").text();
        if(port == "远程节点连接端口（非RPC端口）")
            port = 9333;

        //console.log("remote node: " + ip + ":" + port);
    })

    // 普通交易
    $axure("@create_common_tx").click(function(){
        var category = "common";

        var json = BuildParams(category);
        if(!json)
            return;

        var strJson = JsonToString(json);
        //console.log(strJson);
        ExecuteCmd(category, strJson);
    })

    // 多签交易
    $axure("@create_multisig_tx").click(function(){
        var category = "multisig";

        // multisig params
        var multisigParams = {};
        var nRequired = $axure("@multisig_nRequired_input").text();
        if(nRequired == "多签名至少需要的私钥数量")
        {
            alert("nRequired不能为空，请输入对应的内容");
            return;
        }
        multisigParams["nrequired"] = parseInt(nRequired);

        var redeemScript = $axure("@multisig_redeemScript_input").text();
        if(redeemScript == "赎回脚本")
        {
            alert("redeemScript不能为空，请输入对应的内容");
            return;
        }
        multisigParams["redeemScript"] = redeemScript;

        var privkey_arr = $axure("@multisig_privkey_input").getElements();
        if(nRequired != privkey_arr.length){
            alert("nRequired和privkey的数量不匹配，请重新配置");
            return;
        }
        for(var i = 0; i < privkey_arr.length; i++){
            var privkey = privkey_arr[i].children[1].value;
            if(privkey == "私钥"){
                alert("第" + (i+1) + "个privkey不能为空，请输入对应的内容");
                return;
            }
            multisigParams["privkey_" + (i+1)] = privkey;
        }

        var json = BuildParams(category);
        if(!json)
            return;

        json["multisig_params"] = multisigParams;

        var strJson = JsonToString(json);
        //console.log(strJson);
        ExecuteCmd(category, strJson);
    })

    // Token发布交易
    $axure("@create_publish_tx").click(function(){
        var category = "publish";

        var token_params_input_id = $axure("@token_params_input").getElementIds()[0] + "_input";

        // publish params
        var tokenParams = {};
        var reservePrivkey = $axure("@reservePrivkey_input").text();

        var tokenName = $axure("@tokenName_input").text();
        if(tokenName == "Token名称")
        {
            $('#' + token_params_input_id).val('Token参数信息');
            alert("tokenName不能为空，请输入对应的内容");
            return;
        }
        tokenParams["tokenName"] = tokenName;

        var number = $axure("@number_input").text();
        if(number == "Token数量")
        {
            $('#' + token_params_input_id).val('Token参数信息');
            alert("number不能为空，请输入对应的内容");
            return;
        }
        tokenParams["number"] = FormatNumber(number);

        var maximum = $axure("@maximum_input").text();
        if(maximum == "Token最大数量，-1表示100亿的上限")
        {
            $('#' + token_params_input_id).val('Token参数信息');
            alert("maximum不能为空，请输入对应的内容");
            return;
        }
        tokenParams["maximum"] = FormatNumber(maximum);

        var address = $axure("@address_input").text();
        if(address == "Token发行者的地址")
        {
            $('#' + token_params_input_id).val('Token参数信息');
            alert("address不能为空，请输入对应的内容");
            return;
        }
        tokenParams["address"] = address;

        var compName = $axure("@compName_input").text();
        if(compName == "Token所属组织的名称")
        {
            $('#' + token_params_input_id).val('Token参数信息');
            alert("compName不能为空，请输入对应的内容");
            return;
        }
        tokenParams["compName"] = compName;

        var compID = $axure("@compID_input").text();
        if(compID == "Token所属组织的编号")
        {
            $('#' + token_params_input_id).val('Token参数信息');
            alert("compID不能为空，请输入对应的内容");
            return;
        }
        tokenParams["compID"] = compID;

        tokenParams["version"] = 1;

        var sortObj = SortObjectKeys(tokenParams);
        var msgStrBuffer = Buffer.from(JSON.stringify(sortObj));
        var msgHexBuffer = Buffer.from(msgStrBuffer.toString('hex'));
        var msgHash = BullockChain.crypto.hash256(msgHexBuffer);
        var ecpair = BullockChain.ECPair.fromWIF(reservePrivkey);
        var sigature = ecpair.sign(msgHash);
        var sigHex = sigature.toDER().toString('hex');
        sortObj["sign"] = sigHex;

        var token_params = base58.encode(Buffer.from(JSON.stringify(sortObj)));

        $('#' + token_params_input_id).val(token_params);

        var json = BuildParams(category);
        if(!json)
            return;

        json["token_params"] = token_params;

        var strJson = JsonToString(json);
        //console.log(strJson);
        ExecuteCmd(category, strJson);
    })

    // 币币互换交易
    var strSendJson = "";
    $axure("@next_button").click(function(){
        var json = BuildParams("sender");
        if(!json){
            $axure("@Tab_Content").SetPanelState(1, {}, false);
            $axure("@tab_sender").selected(true);
            $axure("@tab_sender").bringToFront();
            return;
        }

        strSendJson = JsonToString(json);
        //console.log(strSendJson);
    })
    $axure("@create_exchange_tx").click(function(){
        var strJson = "{";

        if(strSendJson == ""){
            alert("请先配置发送方相关数据");
            return;
        }
        strJson += ('"send_utxo":' + strSendJson);

        // receiver utxo
        var recvJson = BuildParams("receiver");
        if(!recvJson)
            return;
        strJson += (',"recv_utxo":' + JsonToString(recvJson));

        strJson += "}";

        //console.log(strJson);
        ExecuteCmd("exchange", strJson);
    })

    // 创建合约
    $axure("@create_contract_tx").click(function(){
        var category = "create";

        // publish params
        var ownerPrivkey = $axure("@ownerPrivkey_input").text();
        if(ownerPrivkey == "合约所有者的私钥")
        {
            alert("ownerPrivkey不能为空，请输入对应的内容");
            return;
        }
        var feeBackAddr = $axure("@" + category + "_feeBackAddr_input").text();
        if(feeBackAddr == "FeeBack地址")
        {
            alert("feeBackAddr不能为空，请输入对应的内容");
            return;
        }
        var base58Type = $axure("@base58Type_input").text();
        if(base58Type == "合约类型")
        {
            alert("base58Type不能为空，请输入对应的内容");
            return;
        }
        var sourceType = $axure("@sourceType_input").text();
        var code = $axure("@code_input").text();
        if(code == "合约代码")
        {
            alert("code不能为空，请输入对应的内容");
            return;
        }

        var contractRequest = {};
        contractRequest["address"] = "";
        contractRequest["feeBackAddr"] = feeBackAddr;
        contractRequest["params"] = {};

        var contractInfo = {};
        contractInfo["base58Type"] = parseInt(base58Type);
        contractInfo["owner_privkey"] = ownerPrivkey;
        contractInfo["sourceType"] = sourceType;
        contractInfo["code"] = code;

        var contractParams = [];
        contractParams[0] = contractRequest;
        contractParams[1] = contractInfo;

        var json = BuildParams(category);
        if(!json)
            return;

        json["contract_params"] = contractParams;

        var strJson = JsonToString(json);
        //console.log(strJson);
        ExecuteCmd("contract", strJson);
    })

    // 调用合约
    $axure("@call_contract_tx").click(function(){
        var category = "call";

        // publish params
        var address = $axure("@contractAddr_input").text();
        if(address == "合约地址")
        {
            alert("address不能为空，请输入对应的内容");
            return;
        }
        var feeBackAddr = $axure("@" + category + "_feeBackAddr_input").text();
        if(feeBackAddr == "FeeBack地址")
        {
            alert("feeBackAddr不能为空，请输入对应的内容");
            return;
        }
        var functionName = $axure("@function_input").text();
        if(functionName == "调用的函数")
        {
            alert("function不能为空，请输入对应的内容");
            return;
        }
        var params = {};
        var param_arr = $axure("@param_input").getElements();
        for(var i = 0; i < param_arr.length; i++){
            var param = param_arr[i].children[1].value;
            if(param == "调用参数（采用Key-Value的方式，比如：a:123    b:\"hello world\"）"){
                alert("第" + (i+1) + "个param不能为空，请输入对应的内容");
                return;
            }
            var temp = param.split(':');
            if(temp.length != 2){
                alert("第" + (i+1) + "个param不合法，请输入正确格式的内容");
            }
            params[temp[0]] = temp[1];
        }

        var contractRequest = {};
        contractRequest["address"] = address;
        contractRequest["feeBackAddr"] = feeBackAddr;
        contractRequest["function"] = functionName;
        contractRequest["params"] = params;

        var contractParams = [];
        contractParams[0] = contractRequest;

        var json = BuildParams(category);
        if(!json)
            return;

        json["contact_params"] = contractParams;

        var strJson = JsonToString(json);
        //console.log(strJson);
        ExecuteCmd("contract", strJson);
    })

    function ExecuteCmd(category, strJson){
        var txType = 0;
        switch(category){
            case "common":
                txType = 1;
                break;
            case "multisig":
                txType = 2;
                break;
            case "publish":
                txType = 3;
                break;
            case "exchange":
                txType = 4;
                break;
            case "contract":
                txType = 5;
                break;
            default:
                alert("Unknow transaction type");
                return;
        }

        $.ajax({
            type: "POST",
            url: "/exec",
            data: {
                ip: ip,
                port: port,
                txType: txType,
                txParam: strJson
            },
            success: function(data){
                var ret = JSON.parse(data);
                if(ret["stderr"] != ""){
                    alert("构建交易失败，情况如下：\n" + ret["stderr"]);
                }else{
                    if(ret["stdout"].toUpperCase().indexOf("ERROR:") != -1){
                        alert("构建或发送交易失败，情况如下：\n" + ret["stdout"]);
                    }else{
                        alert("构建和发送交易成功，情况如下：\n" + ret["stdout"]);
                    }
                }
            },
            error: function(){
            }
        })
    }
})
