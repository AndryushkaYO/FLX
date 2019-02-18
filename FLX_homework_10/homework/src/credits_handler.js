function userCard(index) {
    let balance = 100;
    let transactionLimit = 100;
    let historyLogs = [];
    let key = index;
    return {
        getCardOptions: function() {
            return {
                'key': key,
                'balance': balance,
                'transactionLimit': transactionLimit,
                'historyLogs': historyLogs
            };
        },
        putCredits: function(credits) {
            balance += credits;
            historyLogs.push({
                'operation Type': 'Received credits',
                'credits': credits,
                'operationTime': new Date().toLocaleString()
            });
        },
        takeCredits: function(credits) {
            if (balance < credits) {
                console.error('There are not enough money on your card!');
            } else if (transactionLimit < credits) {
                console.error('Transaction limit on your card is too small!');
            } else {
                balance -= credits;
            }
            historyLogs.push({
                'operation Type': 'Withdrawal of credits',
                'credits': credits,
                'operationTime': new Date().toLocaleString()
            });
        },
        setTransactionLimit: function(credits) {
            transactionLimit = credits;
            historyLogs.push({
                'operation Type': 'Transaction limit change',
                'credits': credits,
                'operationTime': new Date().toLocaleString()
            });
        },
        transferCredits: function(credits, card) {
            let allPersent = 100,
                ourPersentAmount = 100.5;
            let withTaxes = credits * ourPersentAmount / allPersent;
            if (balance < withTaxes) {
                console.error('There are not enough money on your card!');
            } else if (transactionLimit < withTaxes) {
                console.error('Transaction limit on your card is too small!');
            } else {
                this.takeCredits(withTaxes);
                card.putCredits(credits);
            }
        }
    }
}

class UserAccount {
    constructor(name_) {
        this.name = name_;
        this.cards = [];
    }
    addCard(card) {
        let allCards = 3;
        if (this.cards.length < allCards) {
            if (typeof card !== 'undefined') {
                this.cards.push(card);
            } else {
                this.cards.push(userCard(this.cards.length + 1));
            }
        } else {
            console.error('User can have only 3 or less cards!');
        }
    }
    getCardByKey(key) {
        return this.cards[key - 1];
    }
}

/********  EXAMPLE  **********/
/*
let user = new UserAccount('Bob');

user.addCard();
user.addCard();

let card1 = user.getCardByKey(1);
let card2 = user.getCardByKey(2);

card1.putCredits(500);
card1.setTransactionLimit(800);
card1.transferCredits(300, card2);

card2.takeCredits(50);

console.log(card1.getCardOptions());
console.log(card2.getCardOptions());
console.log(user);
*/
