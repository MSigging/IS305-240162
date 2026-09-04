const DiningAccount = require('./DiningAccount');

class CreditDiningAccount extends DiningAccount {
    #creditLimit;

    constructor(accountNumber, openingBalance = 0, creditLimit = 0) {
        // Constructor Chaining
        super(accountNumber, openingBalance);

        if (typeof creditLimit !== 'number' || creditLimit < 0) {
            throw new Error("Credit limit cannot be negative.");
        }

        this.#creditLimit = creditLimit;
    }

    get creditLimit() {
        return this.#creditLimit;
    }

    // Method Overriding: Allows balance to fall below zero down to -creditLimit
    payForMeal(amount, description = "Meal Payment") {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error("Payment amount must be greater than zero.");
        }

        const currentBalance = this.getBalance();
        const maxPayableAmount = currentBalance + this.#creditLimit;

        if (amount <= maxPayableAmount) {
            // Deduct payment and update balance directly via protected internal mechanics
            this._adjustBalanceForCredit(-amount);
            this._recordTransaction("CREDIT_PAYMENT", amount, description);
            return true;
        } else {
            console.log(`Payment Rejected: Transaction amount K${amount.toFixed(2)} exceeds available balance and credit limit. Available Credit/Funds: K${maxPayableAmount.toFixed(2)}.`);
            return false;
        }
    }

    displayAccountSummary() {
        console.log(`[Credit Account] Number: ${this.accountNumber} | Balance: K${this.getBalance().toFixed(2)} | Credit Limit: K${this.#creditLimit.toFixed(2)}`);
    }
}

module.exports = CreditDiningAccount;