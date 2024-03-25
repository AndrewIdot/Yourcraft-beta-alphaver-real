// Here it is, the (mostly) original unobfuscated code.
// This originally ran off PHP.

// 简单的字符串哈希函数
function hashCode(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function GenerateKeyForName(name){
    // 使用用户名的哈希值作为种子来生成随机数
    var seed = hashCode(name);
    var random = new Math.seedrandom(seed);

    // 用于存储生成的 Access Key
    var accessKeyBuilder = "";

    // 生成5个5位长度的随机字符串并组成 Access Key
    for (var i = 0; i < 5; i++) {
        // 生成5位长度的随机字符串
        var partBuilder = "";
        for (var j = 0; j < 5; j++) {
            // 随机生成大写字母或数字的 ASCII 码值（A-Z: 65-90，0-9: 48-57）
            var randomChar = Math.floor(random() * 36);
            if (randomChar < 26) {
                // 生成大写字母
                partBuilder += String.fromCharCode(randomChar + 65);
            } else {
                // 生成数字
                partBuilder += String.fromCharCode(randomChar - 26 + 48);
            }
        }
        // 添加到 Access Key 中
        accessKeyBuilder += partBuilder;
        if (i < 4) {
            accessKeyBuilder += "-";
        }
    }

    return accessKeyBuilder;
}

function genKeyAfterTime(){

    document.getElementById("key").innerHTML = "Please wait...";
    setTimeout(function(){
        generateKey();
    }, 1000)
}

function generateKey(){
    var name = document.getElementById("name").value;
    if (name == ""){
        document.getElementById("key").innerHTML = "Errors occurred during key generation:<br> * name cannot be empty";
        return;
    }
    var key = GenerateKeyForName(name);
    if (name.startsWith("dev")){
        document.getElementById("key").innerHTML = "Errors occurred during key generation:<br> * this username format is reserved for internal use";
    } 
    else if (name.length >= 15){
        document.getElementById("key").innerHTML = "Errors occurred during key generation:<br> * username too long";
    }
    else if (key == "#"){
        document.getElementById("key").innerHTML = "Errors occurred during key generation:<br> * invalid character in username";
    }
    else {
        document.getElementById("key").innerHTML = "Success! Your key is: <br>" + key + "<br>Copied to clipboard.";
				navigator.clipboard.writeText(key);
    }
}