//1440 -1 day
//60 - 1 hour
// d + " day(s) "+h+" hour(s) "+m+" minute(s)"
function formatTime(minutes) {
    var d = 0,
        h = 0,
        m = 0;
    if ((minutes % 1440) === 0) {
        d = minutes / 1440;
    } else if ((minutes % 60) === 0) {
        h = minutes / 60;
    } else if (minutes < 60) {
        m = minutes;
    } else {
        do {
            if (h === 24) {
                d++;
                h = 0;
            }
            if (minutes > 60) {
                minutes -= 60;
                h++;
            }
        } while (minutes > 60);
        m = minutes;
    }
    return (d + " day(s) " + h + " hour(s) " + m + " minute(s)");
}
alert(formatTime(120));
alert(formatTime(59));
alert(formatTime(3061));