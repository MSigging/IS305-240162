/*
  Program: Dining Meal Booking Feature - Console Application Entry Point
  Student Name: Megdelene SIGGING
  Student ID: 240162
  Date: 17 July 2026
  Updated for PART2 date: 12/08/2026
*/


const DiningAccount = require('./DiningAccount');
const RewardsDiningAccount = require('./RewardsDiningAccount');
const CreditDiningAccount = require('./CreditDiningAccount');
const Student = require('./Student');
const MealBooking = require('./MealBooking');

function runFullApplicationDemonstration() {
    const divider = "============================================================";

    console.log(divider);
    console.log("    DWU DINING SERVICES - FULL SYSTEM DEMONSTRATION");
    console.log(divider);

    // 1. Task 1 Demonstration: Credit Account
    console.log("\n--- TASK 1: CREDIT ACCOUNT DEMONSTRATION ---");
    const creditAccount = new CreditDiningAccount("CA001", 1000.00, 500.00);
    console.log(`Opening Balance: K${creditAccount.getBalance().toFixed(2)} | Limit: K${creditAccount.creditLimit.toFixed(2)}`);

    console.log("Attempting K1,500.00 payment (using full balance + full credit limit)...");
    creditAccount.payForMeal(1500.00, "Catering Event");
    console.log(`Resulting Balance: K${creditAccount.getBalance().toFixed(2)}`);

    console.log("Attempting additional K100.00 payment (exceeding limit)...");
    creditAccount.payForMeal(100.00, "Extra Lunch");

    // 2. Task 2 Demonstration: Polymorphism Array Processing
    console.log("\n--- TASK 2: POLYMORPHIC ACCOUNT SUMMARY ---");
    const baseAcc = new DiningAccount("DA101", 300.00);
    const rewardAcc = new RewardsDiningAccount("RA102", 500.00, 5.0);
    const credAcc = new CreditDiningAccount("CA103", 200.00, 300.00);

    const accountList = [baseAcc, rewardAcc, credAcc];

    // Polymorphic processing loop
    for (const acc of accountList) {
        acc.displayAccountSummary();
    }

    // 3. Task 3 & 4 Demonstration: Student Assignment & Booking Processing
    console.log("\n--- TASK 3 & 4: STUDENT & MEAL BOOKING PAYMENTS ---");
    const student1 = new Student("S202601", "John Mary");
    student1.assignDiningAccount(rewardAcc);

    const booking1 = new MealBooking("B1001", "Dinner Banquet", 150.00);
    console.log(student1.getDetails());
    console.log(`Initial Status: ${booking1.getDetails()}`);

    // Process Payment Polymorphically
    booking1.processPayment(student1.diningAccount);
    console.log(`Updated Status: ${booking1.getDetails()}`);

    // Attempt Duplicate Payment
    console.log("\nAttempting duplicate payment on same booking:");
    booking1.processPayment(student1.diningAccount);

    // 4. Task 5 Demonstration: Transaction History Display
    console.log("\n--- TASK 5: TRANSACTION HISTORY AUDIT ---");
    console.log(`Transaction Log for Account ${rewardAcc.accountNumber}:`);
    const history = rewardAcc.getTransactions();
    history.forEach(tx => {
        console.log(`[${tx.timestamp}] ID: ${tx.transactionId} | Type: ${tx.type} | Amount: K${tx.amount.toFixed(2)} | Resulting Balance: K${tx.resultingBalance.toFixed(2)} | Desc: ${tx.description}`);
    });

    console.log("\n" + divider);
    console.log("                   ALL TESTS COMPLETED");
    console.log(divider);
}

runFullApplicationDemonstration();