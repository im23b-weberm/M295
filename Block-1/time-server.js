var port = Number(process.argv[2])
const net = require('net')

function addzero(numb) {
    if (numb < 10) {
        numb = "0" + numb;
        return numb;
    } else {
        return numb;
    }
}



function gettime() {
    const d = new Date();
    let year = d.getFullYear();               // ✅ function calls need ()
    let month = addzero(d.getMonth() + 1);    // getMonth() is 0-based, so +1
    let day = addzero(d.getDate());           // getDate() gives the day of the month
    let hour = addzero(d.getHours());
    let minute = addzero(d.getMinutes());

    return `${year}-${month}-${day} ${hour}:${minute}`;
}



const server = net.createServer(function (socket) {
    socket.end(gettime() + '\n')
    })
server.listen(port)