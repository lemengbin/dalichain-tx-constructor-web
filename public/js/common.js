function CreateCommonTx(){
    var category = "common";

    var strParam = BuildBasicParam(category);
    if(!strParam)
        return;
    console.log(strParam);
}

function CreateMultisigTx(){
    var category = "multisig";

    var strParam = BuildBasicParam(category);
    if(!strParam)
        return;
    console.log(strParam);
}

function BuildBasicParam(category){
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

    if($axure("@" + category + "_config_gasToken").checked()){
        if(!(json["gas_symbol"] = GetGasSymbol(category)))
            return;

        if(!(json["gas_vin"] = GetGasVin(category, category != "multisig")))
            return;

        if(!(json["gas_vout"] = GetGasVout(category)))
            return;
    }

    return JSON.stringify(json);
}