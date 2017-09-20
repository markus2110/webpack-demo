

export default function currentDate(){
    var dateTime = new Date();
    return dateTime.toDateString() + " : " + dateTime.getSeconds();
}

