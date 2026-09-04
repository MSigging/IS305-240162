class DiningAccount {
    #accountNumber;
    #balance;
    #transactions;

    constructor(accountNumber, openingBalance = 0) {
        if (!accountNumber || typeof accountNumber !== 'string' || accountNumber.trim() === '') {
            throw new Error("Account number cannot be empty.");
        }
        if (typeof openingBalance !== 'number' || openingBalance < 0) {
            throw new Error("Opening balance cannot be negative.");
        }

        this.#accountNumber = accountNumber.trim();
        this.#balance = openingBalance;
        this.#transactions = [];
    }

    get accountNumber() {
        return this.#accountNumber;
    }

    getBalance() {
        return this.#balance;
    }

    getTransactions() {
        return [...this.#transactions];
    }

    deposit(amount, description = "Standard Deposit") {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error("Deposit amount must be greater than zero.");
        }

        this.#balance += amount;
        this._recordTransaction("DEPOSIT", amount, description);
        return true;
    }

    payForMeal(amount, description = "Meal Payment") {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error("Payment amount must be greater than zero.");
        }

        if (this.#balance >= amount) {
            this.#balance -= amount;
            this._recordTransaction("PAYMENT", amount, description);
            return true;
        } else {
            return false;
        }
    }

    displayAccountSummary() {
        console.log(`[Base Account] Number: ${this.#accountNumber} | Balance: K${this.#balance.toFixed(2)}`);
    }

    _recordTransaction(type, amount, description) {
        const tx = {
            transactionId: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            timestamp: new Date().toISOString(),
            type: type,
            amount: amount,
            resultingBalance: this.#balance,
            description: description
        };
        this.#transactions.push(tx);
    }

    _adjustBalanceForCredit(amount) {
        this.#balance += amount;
    }
}

module.exports = DiningAccount;