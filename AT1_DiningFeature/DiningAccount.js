class DiningAccount {
    #accountNumber;
    #balance;
    #transactions;

    constructor(accountNumber, openingBalance = 0) {
        if (!accountNumber || typeof accountNumber !== 'string' || accountNumber.trim() === "") {
            throw new Error("Account number cannot be empty.");
        }
        if (typeof openingBalance !== 'number' || openingBalance < 0) {
            throw new Error("Opening balance cannot be negative.");
        }

        this.#accountNumber = accountNumber.trim();
        this.#balance = openingBalance;
        this.#transactions = [];

        // Log initial balance if provided
        if (openingBalance > 0) {
            this._recordTransaction("OPENING_BALANCE", openingBalance, "Initial account opening balance");
        }
    }

    get accountNumber() {
        return this.#accountNumber;
    }

    getBalance() {
        return this.#balance;
    }

    getTransactions() {
        // Return a safe shallow copy of the transactions array to preserve encapsulation
        return [...this.#transactions];
    }

    // Handles simulated overloading with default description parameter
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
            console.log("Payment successful");
            return true;
        } else {
            console.log(`Payment rejected: Insufficient funds. Available: K${this.#balance.toFixed(2)}, Required: K${amount.toFixed(2)}`);
            return false;
        }
    }

    displayAccountSummary() {
        console.log(`[Base Account] Number: ${this.#accountNumber} | Type: Dining Account | Balance: K${this.#balance.toFixed(2)}`);
    }

    // Internal protected helper for recording transactions
    _recordTransaction(type, amount, description) {
        const transaction = {
            transactionId: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            timestamp: new Date().toISOString(),
            type: type,
            amount: amount,
            resultingBalance: this.#balance,
            description: description
        };
        this.#transactions.push(transaction);
    }
}

module.exports = DiningAccount;