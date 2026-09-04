/*
  Program: Dining Meal Booking Feature
  Student Name: Megdelene SIGGING
  Student ID: 240162
  Date: 17 July 2026
  Updated for PART2 date: 12/08/2026
  
*/


const Student = require('./Student');


class MealBooking {
    #bookingId;
    #mealType;
    #cost;
    #status; // 'Pending' or 'Confirmed'

    constructor(bookingId, mealType, cost) {
        if (!bookingId || !mealType || cost <= 0) {
            throw new Error("Invalid booking initialization parameters.");
        }
        this.#bookingId = bookingId;
        this.#mealType = mealType;
        this.#cost = cost;
        this.#status = "Pending";
    }

    get bookingId() { return this.#bookingId; }
    get mealType() { return this.#mealType; }
    get cost() { return this.#cost; }
    get status() { return this.#status; }

    processPayment(diningAccount) {
        // Prevent duplicate payments
        if (this.#status === "Confirmed") {
            console.log(`[DUPLICATE PAYMENT BLOCKED] Booking ${this.#bookingId} is already paid and confirmed.`);
            return false;
        }

        // Polymorphic Call: Executes payForMeal on whatever account type is passed
        const isPaid = diningAccount.payForMeal(this.#cost, `Meal Booking: ${this.#mealType}`);

        if (isPaid) {
            this.#status = "Confirmed";
            console.log(`[BOOKING CONFIRMED] Payment of K${this.#cost.toFixed(2)} processed for ${this.#mealType} (${this.#bookingId}).`);
            return true;
        } else {
            console.log(`[BOOKING PENDING] Payment failed for ${this.#mealType} (${this.#bookingId}). Status remains Pending.`);
            return false;
        }
    }

    getDetails() {
        return `Booking ID: ${this.#bookingId} | Meal: ${this.#mealType} | Cost: K${this.#cost.toFixed(2)} | Status: ${this.#status}`;
    }
}

module.exports = MealBooking;