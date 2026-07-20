/*
  Program: Dining Meal Booking Feature
  Student Name: Megdelene SIGGING
  Student ID: 240162
  Date: 17 July 2026
  
*/


class MealBooking {
  // Declare private fields
  #studentId;
  #studentName;
  #mealDate;
  #mealType;
  #quantity;
  #dietaryNote;
  #bookingStatus;

  constructor({ studentId, studentName, mealDate, mealType, quantity, dietaryNote = "None" }) {
    this.#studentId = studentId;
    this.#studentName = studentName;
    this.#mealDate = mealDate;
    this.#mealType = mealType;
    this.#quantity = quantity;
    this.#dietaryNote = dietaryNote;
    this.#bookingStatus = "Pending"; 
  }

  // Add Getters and Setters

  get studentId() {
    return this.#studentId;
  }

  set studentId(value) {
    if (!value) throw new Error("Student ID cannot be empty.");
    this.#studentId = value;
  }

  get studentName() {
    return this.#studentName;
  }

  set studentName(value) {
    if (!value) throw new Error("Student Name cannot be empty.");
    this.#studentName = value;
  }

  get mealDate() {
    return this.#mealDate;
  }

  set mealDate(value) {
    this.#mealDate = value;
  }

  get mealType() {
    return this.#mealType;
  }

  set mealType(value) {
    this.#mealType = value;
  }

  get quantity() {
    return this.#quantity;
  }

  set quantity(value) {
    if (value <= 0) throw new Error("Quantity must be at least 1.");
    this.#quantity = value;
  }

  get dietaryNote() {
    return this.#dietaryNote;
  }

  set dietaryNote(value) {
    this.#dietaryNote = value;
  }

  get bookingStatus() {
    return this.#bookingStatus;
  }

  set bookingStatus(value) {
    const validStatuses = ["Pending", "Confirmed", "Cancelled"];
    if (!validStatuses.includes(value)) {
      throw new Error(`Invalid status. Choose from: ${validStatuses.join(", ")}`);
    }
    this.#bookingStatus = value;
  }

  // Calculation for meal costs

  /**
   * Calculates total cost based on meal type and quantity.
   * @returns {number} Total cost
   */
  calculateTotal() {
    let pricePerMeal = 0;

    
    switch (this.#mealType.toLowerCase()) {
      case "breakfast":
        pricePerMeal = 8.50;
        break;
      case "lunch":
        pricePerMeal = 12.00;
        break;
      case "dinner":
        pricePerMeal = 15.50;
        break;
      default:
        pricePerMeal = 10.00; 
    }

    return pricePerMeal * this.#quantity;
  }

  /**
   * Constructs a formatted string containing the booking details.
   * @returns {string} Summary layout
   */
  getSummary() {
    return `
=========================================
          MEAL BOOKING SUMMARY          
=========================================
Status:        [ ${this.#bookingStatus} ]
Student ID:    ${this.#studentId}
Student Name:  ${this.#studentName}
Date:          ${this.#mealDate}
Meal Type:     ${this.#mealType}
Quantity:      ${this.#quantity}
Dietary Note:  ${this.#dietaryNote}
-----------------------------------------
Total Cost:    $${this.calculateTotal().toFixed(2)}
=========================================`;
  }
}


module.exports = MealBooking;