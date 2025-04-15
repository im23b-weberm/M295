function simuliereVerzoegerung(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addiereNachVerzoegerung(a, b, ms){
    simuliereVerzoegerung(ms).then
    return a + b
}