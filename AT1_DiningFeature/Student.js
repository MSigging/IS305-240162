 
 /*
 THIS IS LAB2_PART1 - Student Class & Constructor
  Student Name: Megdelene SIGGING
  Student ID: 240162
  Date: 12/08/2026
  
  */

const DiningAccount = require('./DiningAccount');

class Student {
    #studentId;
    #name;
    #diningAccount;

    constructor(studentId, name, diningAccount = null) {
        if (!studentId || !name) {
            throw new Error("Student ID and Name are required.");
        }
        this.#studentId = studentId;
        this.#name = name;
        this.#diningAccount = null;

        if (diningAccount) {
            this.assignDiningAccount(diningAccount);
        }
    }

    get studentId() { return this.#studentId; }
    get name() { return this.#name; }
    get diningAccount() { return this.#diningAccount; }

    assignDiningAccount(account) {
        if (!(account instanceof DiningAccount)) {
            throw new Error("Invalid account: Object must be an instance of DiningAccount or its subclasses.");
        }
        this.#diningAccount = account;
    }

    getDetails() {
        const accInfo = this.#diningAccount ? `Account #${this.#diningAccount.accountNumber}` : "No Account Assigned";
        return `Student ID: ${this.#studentId} | Name: ${this.#name} | ${accInfo}`;
    }
}

module.exports = Student;