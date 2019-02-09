//Task #2. Guessing game

var game = confirm("Do you want to play a game?");
var count = 1,
    money_count = 1,
    prize = 0;
if (!game) {
    alert("You did not become a millionaire, but can.");
} else {
    var continueGame = true;
    do {
        var min = 0,
            max = 5 * count;
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        var number, money;
        var lose = true;
        for (let i = 3; i > 0; i--) {
            if (i === 3) {
                money = 10 * money_count;
            } else if (i === 2) {
                money = 5 * money_count;
            } else {
                money = 2 * money_count;
            }
            number = prompt("Enter a number from 0 to " + max + "\nAttempts left: " +
                i + "\nTotal prize: " + prize + "$\nPossible prize on current attempt: " + money + "$", "");
            if (+number === random) {
                lose = false;
                prize += money;
                break;
            }
        }
        if (lose) {
            alert("Thank you for a game. Your prize is: " + prize + "$");
            continueGame = confirm("Do you want to play again?");
            prize = 0;
            count = 1;
            money_count = 1;
        } else {
            continueGame = confirm("Congratulation! Your prize is " + prize + "$\nDo you want to continue?");
            if (continueGame) {
                count *= 2;
                money_count *= 3;
            } else {
                alert("Thank you for a game. Your prize is: " + prize + "$");
                continueGame = confirm("Do you want to play again?");
                prize = 0;
                count = 1;
                money_count = 1;
            }
        }
    } while (continueGame);
}