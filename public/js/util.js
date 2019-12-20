function GetSymbol(category){
    var symbol = $axure("@" + category + "_symbol_input").text();
    if(symbol == "交易的币种")
    {
        alert("symbol不能为空, 请输入对应的内容");
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
            alert("第" + (i+1) + "个输入中的txid不能为空，请输入对应的内容");
            return;
        }
        if(txin["outtype"] == "交易输出类型")
        {
            alert("第" + (i+1) + "个输入中的outtype不能为空，请输入对应的内容");
            return;
        }
        if(txin["vout"] == "交易输出序号")
        {
            alert("第" + (i+1) + "个输入中的vout不能为空，请输入对应的内容");
            return;
        }
        if(txin["scriptPubKey"] == "公钥脚本")
        {
            alert("第" + (i+1) + "个输入中的scriptPubKey不能为空，请输入对应的内容");
            return;
        }
        if(withPrivkey && txin["privkey"] == "私钥")
        {
            alert("第" + (i+1) + "个输入中的privkey不能为空，请输入对应的内容");
            return;
        }

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
            alert("第" + (i+1) + "个输出中的address不能为空，请输入对应的内容");
            return;
        }
        if(amount == "数量")
        {
            alert("第" + (i+1) + "个输出中的amount不能为空，请输入对应的内容");
            return;
        }

        vout[address] = amount;
    };

    return vout;
}

function GetGasSymbol(category){
    var symbol = $axure("@" + category + "_gas_symbol_input").text();
    if(symbol == "交易的币种")
    {
        alert("gas_symbol不能为空, 请输入对应的内容");
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
            alert("GasToken: 第" + (i+1) + "个输入中的txid不能为空，请输入对应的内容");
            return;
        }
        if(txin["outtype"] == "交易输出类型")
        {
            alert("GasToken: 第" + (i+1) + "个输入中的outtype不能为空，请输入对应的内容");
            return;
        }
        if(txin["vout"] == "交易输出序号")
        {
            alert("GasToken: 第" + (i+1) + "个输入中的vout不能为空，请输入对应的内容");
            return;
        }
        if(txin["scriptPubKey"] == "公钥脚本")
        {
            alert("GasToken: 第" + (i+1) + "个输入中的scriptPubKey不能为空，请输入对应的内容");
            return;
        }
        if(withPrivkey && txin["privkey"] == "私钥")
        {
            alert("GasToken: 第" + (i+1) + "个输入中的privkey不能为空，请输入对应的内容");
            return;
        }

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
            alert("GasToken: 第" + (i+1) + "个输出中的address不能为空，请输入对应的内容");
            return;
        }
        if(amount == "数量")
        {
            alert("GasToken: 第" + (i+1) + "个输出中的amount不能为空，请输入对应的内容");
            return;
        }

        vout[address] = amount;
    };

    return vout;
}