module.exports.getDate = function(){
    let date = new Date();
    let options = {
        weekday : "long",
        day : "numeric",
        month: "long"
    };
    
    return date.toLocaleDateString("en-US",options);
    // var Day = date.getDay();
}

module.exports.getDay = function(){
    let date = new Date();
    let options = {
        weekday : "long",
    };
    return date.toLocaleDateString("en-US",options);
    // var Day = date.getDay();
};