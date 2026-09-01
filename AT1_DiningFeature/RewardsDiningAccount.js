const DiningAccount = require('./DiningAccount');

class RewardsDiningAccount extends DiningAccount {
    #rewardRate;

    constructor(accountNumber, openingBalance = 0, rewardRate = 0) {
    
        super(accountNumber, openingBalance);

        if (typeof rewardRate !== 'number' || rewardRate < 0) {
            throw new Error("Reward rate cannot be negative.");
        }

        this.#rewardRate = rewardRate;
    }

    get rewardRate() {
        return this.#rewardRate;
    }

    calculateReward() {
        // Reward = current balance * reward rate / 100
        return (this.getBalance() * this.#rewardRate) / 100;
    }

    applyReward() {
        const rewardAmount = this.calculateReward();
        if (rewardAmount > 0) {
            // Deposit reward into account balance
            this.deposit(rewardAmount, `Reward Credit (${this.#rewardRate}% rate)`);
            console.log(`Applied reward credit of K${rewardAmount.toFixed(2)}.`);
        } else {
            console.log("No reward applied (calculated reward amount is zero).");
        }
        return rewardAmount;
    }

    // Override displayAccountSummary to include Rewards details
    displayAccountSummary() {
        console.log(`[Rewards Account] Number: ${this.accountNumber} | Type: Rewards Dining Account | Balance: K${this.getBalance().toFixed(2)} | Reward Rate: ${this.#rewardRate}%`);
    }
}

module.exports = RewardsDiningAccount;




// ==========================================
      //PART 1 REQUIRED DEMONSTRATION RUNNER
// ==========================================
if (require.main === module) {
    const divider = "==================================================";

    // DINING_ACCOUNT DEMO
    console.log(divider);
    console.log("          STANDARD DINING ACCOUNT");
    console.log(divider);

    const openingBalance = 1000.00;
    const account = new DiningAccount("DA001", openingBalance);

    console.log(`Account Number: ${account.accountNumber}`);
    console.log(`Opening Balance: K${openingBalance.toFixed(2)}`);

    const depositAmount = 500.00;
    account.deposit(depositAmount);
    console.log(`Deposit: K${depositAmount.toFixed(2)}`);

    const mealCost = 200.00;
    const paymentSuccess = account.payForMeal(mealCost);
    console.log(`Meal Payment: K${mealCost.toFixed(2)}`);
    console.log(`Payment Status: ${paymentSuccess ? "Successful" : "Failed"}`);
    console.log(`Final Balance: K${account.getBalance().toFixed(2)}`);

    console.log("\n");

    // REWARDS_DINING_ACCOUNT DEMO
    console.log(divider);
    console.log("           REWARDS DINING ACCOUNT");
    console.log(divider);

    const rewardsAccount = new RewardsDiningAccount("RA001", 1500.00, 2.5);
    rewardsAccount.deposit(500.00);

    console.log(`Account Number: ${rewardsAccount.accountNumber}`);
    console.log(`Balance Before Reward: K${rewardsAccount.getBalance().toFixed(2)}`);
    console.log(`Reward Rate: ${rewardsAccount.rewardRate}%`);

    const rewardEarned = rewardsAccount.calculateReward();
    console.log(`Reward Earned: K${rewardEarned.toFixed(2)}`);

    rewardsAccount.applyReward();
    console.log(`Final Balance: K${rewardsAccount.getBalance().toFixed(2)}`);
    console.log(divider);
}