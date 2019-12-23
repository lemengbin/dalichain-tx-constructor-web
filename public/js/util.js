function GetSymbol(category){
    //var symbol = $axure("@" + category + "_symbol_input").text().toUpperCase();
    var symbol = $axure("@" + category + "_symbol_input").text();
    if(symbol == "交易的币种"){
        Alert(category, "symbol不能为空，请输入对应的内容");
        return;
    }
    return symbol;
}

function GetVin(category, withPrivkey){
    var vin = [];

    var txid_arr = $axure("@" + category + "_txid_input").getElements();
    var outtype_arr = $axure("@" + category + "_outtype_input").getElements();
    var vout_arr = $axure("@" + category + "_vout_input").getElements();
    var scriptPubKey_arr = $axure("@" + category + "_scriptPubKey_input").getElements();
    var privkey_arr = [];
    if(withPrivkey)
        privkey_arr = $axure("@" + category + "_privkey_input").getElements();

    for(var i = 0; i < txid_arr.length; i++){
        var txin = {};
        txin["txid"] = txid_arr[i].children[1].value;
        txin["outtype"] = outtype_arr[i].children[1].value;
        txin["vout"] = vout_arr[i].children[1].value;
        txin["scriptPubKey"] = scriptPubKey_arr[i].children[1].value;
        if(withPrivkey)
            txin["privkey"] = privkey_arr[i].children[1].value;

        if(txin["txid"] == "交易ID")
        {
            Alert(category, "第" + (i+1) + "个输入中的txid不能为空，请输入对应的内容");
            return;
        }
        if(txin["outtype"] == "交易输出类型")
        {
            Alert(category, "第" + (i+1) + "个输入中的outtype不能为空，请输入对应的内容");
            return;
        }
        if(txin["vout"] == "交易输出序号")
        {
            Alert(category, "第" + (i+1) + "个输入中的vout不能为空，请输入对应的内容");
            return;
        }
        if(txin["scriptPubKey"] == "公钥脚本")
        {
            Alert(category, "第" + (i+1) + "个输入中的scriptPubKey不能为空，请输入对应的内容");
            return;
        }
        if(withPrivkey && txin["privkey"] == "私钥")
        {
            Alert(category, "第" + (i+1) + "个输入中的privkey不能为空，请输入对应的内容");
            return;
        }

        txin["outtype"] = parseInt(txin["outtype"]);
        txin["vout"] = parseInt(txin["vout"]);
        vin[i] = txin;
    };

    return vin;
}

function GetVout(category){
    var vout = {};

    var address_arr = $axure("@" + category + "_address_input").getElements();
    var amount_arr = $axure("@" + category + "_amount_input").getElements();

    for(var i = 0; i < address_arr.length; i++){
        var address = address_arr[i].children[1].value;
        var amount = amount_arr[i].children[1].value;

        if(address == "目标地址")
        {
            Alert(category, "第" + (i+1) + "个输出中的address不能为空，请输入对应的内容");
            return;
        }
        if(amount == "数量")
        {
            Alert(category, "第" + (i+1) + "个输出中的amount不能为空，请输入对应的内容");
            return;
        }
        /*
        if(vout[address]){
            Alert(category, "第" + (i+1) + "个输出中的address已存在，请检查是否正确");
            return;
        }
        vout[address] = amount;
        */

        if(!vout[address])
            vout[address] = [];
        vout[address].push(amount);
    };

    return vout;
}

function GetGasSymbol(category){
    //var symbol = $axure("@" + category + "_gas_symbol_input").text().toUpperCase();
    var symbol = $axure("@" + category + "_gas_symbol_input").text();
    if(symbol == "交易的币种")
    {
        Alert(category, "gas_symbol不能为空，请输入对应的内容");
        return;
    }
    return symbol;
}

function GetGasVin(category, withPrivkey){
    var vin = [];

    var txid_arr = $axure("@" + category + "_gas_txid_input").getElements();
    var outtype_arr = $axure("@" + category + "_gas_outtype_input").getElements();
    var vout_arr = $axure("@" + category + "_gas_vout_input").getElements();
    var scriptPubKey_arr = $axure("@" + category + "_gas_scriptPubKey_input").getElements();
    var privkey_arr = [];
    if(withPrivkey)
        privkey_arr = $axure("@" + category + "_gas_privkey_input").getElements();

    for(var i = 0; i < txid_arr.length; i++){
        var txin = {};
        txin["txid"] = txid_arr[i].children[1].value;
        txin["outtype"] = outtype_arr[i].children[1].value;
        txin["vout"] = vout_arr[i].children[1].value;
        txin["scriptPubKey"] = scriptPubKey_arr[i].children[1].value;
        if(withPrivkey)
            txin["privkey"] = privkey_arr[i].children[1].value;

        if(txin["txid"] == "交易ID")
        {
            Alert(category, "GasToken: 第" + (i+1) + "个输入中的txid不能为空，请输入对应的内容");
            return;
        }
        if(txin["outtype"] == "交易输出类型")
        {
            Alert(category, "GasToken: 第" + (i+1) + "个输入中的outtype不能为空，请输入对应的内容");
            return;
        }
        if(txin["vout"] == "交易输出序号")
        {
            Alert(category, "GasToken: 第" + (i+1) + "个输入中的vout不能为空，请输入对应的内容");
            return;
        }
        if(txin["scriptPubKey"] == "公钥脚本")
        {
            Alert(category, "GasToken: 第" + (i+1) + "个输入中的scriptPubKey不能为空，请输入对应的内容");
            return;
        }
        if(withPrivkey && txin["privkey"] == "私钥")
        {
            Alert(category, "GasToken: 第" + (i+1) + "个输入中的privkey不能为空，请输入对应的内容");
            return;
        }

        txin["outtype"] = parseInt(txin["outtype"]);
        txin["vout"] = parseInt(txin["vout"]);
        vin[i] = txin;
    };

    return vin;
}

function GetGasVout(category){
    var vout = {};

    var address_arr = $axure("@" + category + "_gas_address_input").getElements();
    var amount_arr = $axure("@" + category + "_gas_amount_input").getElements();

    for(var i = 0; i < address_arr.length; i++){
        var address = address_arr[i].children[1].value;
        var amount = amount_arr[i].children[1].value;

        if(address == "目标地址")
        {
            Alert(category, "GasToken: 第" + (i+1) + "个输出中的address不能为空，请输入对应的内容");
            return;
        }
        if(amount == "数量")
        {
            Alert(category, "GasToken: 第" + (i+1) + "个输出中的amount不能为空，请输入对应的内容");
            return;
        }
        /*
        if(vout[address]){
            Alert(category, "GasToken: 第" + (i+1) + "个输出中的address已存在，请检查是否正确");
            return;
        }
        vout[address] = amount;
        */
        if(!vout[address])
            vout[address] = [];
        vout[address].push(amount);
    };

    return vout;
}

function BuildParams(category){
    var json = {};

    if(category != "publish")
    {
        if(!(json["symbol"] = GetSymbol(category)))
            return;

        if(!(json["vin"] = GetVin(category, category != "multisig")))
            return;

        if(!(json["vout"] = GetVout(category)))
            return;
    }

    if(category == "publish" || $axure("@" + category + "_config_gasToken").checked()){
        if(!(json["gas_symbol"] = GetGasSymbol(category)))
            return;

        if(!(json["gas_vin"] = GetGasVin(category, category != "multisig")))
            return;

        if(!(json["gas_vout"] = GetGasVout(category)))
            return;
    }

    return json;
}

function Alert(category, msg){
    if(category == "sender")
        alert("发送者的" + msg);
    else if(category == "receiver")
        alert("接收者的" + msg);
    else
        alert(msg);
}

function FormatNumber(num){
    var arrNum = num.split('.');
    if(arrNum.length < 2){
        arrNum[1] = "00000000";
        return arrNum.join('.');
    }

    if((arrNum[0] > 0) && arrNum[1].length < 8)
        arrNum[1] = Math.pow(10, 8-arrNum[1].length) * arrNum[1];

    return arrNum.join('.');
}

function SortObjectKeys(obj){
    var tmp = {};
    Object.keys(obj).sort().forEach(function(k){tmp[k]=obj[k]});
    return tmp;
}

function JsonToString(json){
    var strJson = "{";

    // handle vout and gasvout
    for(var key in json){
        if(key != "vout" && key != "gas_vout"){
            strJson += JSON.stringify(key);
            strJson += ":";
            strJson += JSON.stringify(json[key]);
            strJson += ",";
        }else{
            var tempJson = json[key];
            var strTempJson = JSON.stringify(key) + ":{";
            for(var address in tempJson){
                for(var i = 0; i < tempJson[address].length; i++){
                    strTempJson += JSON.stringify(address);
                    strTempJson += ":";
                    strTempJson += JSON.stringify(tempJson[address][i]);
                    strTempJson += ",";
                }
            }
            strTempJson = strTempJson.substring(0, strTempJson.length - 1);
            strTempJson += "},";
            strJson += strTempJson;
        }
    }

    strJson = strJson.substring(0, strJson.length - 1);
    strJson += "}";

    return strJson;
}
