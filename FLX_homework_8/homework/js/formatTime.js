//1440 -1 day
//60 - 1 hour
// d + " day(s) "+h+" hour(s) "+m+" minute(s)"
function formatTime(minutes) {
    var d = 0,
        h = 0,
        m = 0;    
        do {            
            if (minutes >= 60) {
                minutes -= 60;
                h++;
            }
            if (h === 24) {
                d++;
                h = 0;
            }
        } while (minutes >= 60);
        m = minutes;    
    return (d + " day(s) " + h + " hour(s) " + m + " minute(s)");
}
alert(formatTime(120));
alert(formatTime(59));
alert(formatTime(3061));
