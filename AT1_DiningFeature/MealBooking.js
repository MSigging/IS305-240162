/*
  Program: Dining Meal Booking Feature
  Student Name: Megdelene SIGGING
  Student ID: 240162
  Date: 17 July 2026
  Updated for PART2 date: 12/08/2026
  
*/


const Student = require('./Student');


class MealBooking {
  #student; // Holds reference to a Student instance
  #mealDate;
  #mealType;
  #quantity;
  #dietaryNote;
  #bookingStatus;

  /**
   * Constructs a MealBooking.
   * @param {Object} details 
   * @param {Student} details.student - Reference to a Student object
   * @param {string} details.mealDate
   * @param {string} details.mealType
   * @param {number} details.quantity
   * @param {string} details.dietaryNote
   * @param {string} [details.bookingStatus="Pending"]
   */
  constructor({ student, mealDate, mealType, quantity, dietaryNote, bookingStatus = "Pending" }) {
    this.student = student; // Enforces Student object validation via setter
    this.mealDate = mealDate;
    this.mealType = mealType;
    this.quantity = quantity;
    this.dietaryNote = dietaryNote;
    this.bookingStatus = bookingStatus;
  }

  // Getters & Setters 

  get student() {
    return this.#student;
  }

  set student(value) {
    if (!(value instanceof Student)) {
      throw new Error("Invalid student: Booking must be connected to a valid Student object.");
    }
    this.#student = value;
  }

  // Convenient getter for duplicate check logic
  get studentId() {
    return this.#student.studentId;
  }

  get mealDate() {
    return this.#mealDate;
  }

  set mealDate(value) {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      throw new Error("Meal date cannot be empty.");
    }
    this.#mealDate = value.trim();
  }

  get mealType() {
    return this.#mealType;
  }

  set mealType(value) {
    const validMeals = ["Breakfast", "Lunch", "Dinner"];
    if (!value || !validMeals.some(m => m.toLowerCase() === value.trim().toLowerCase())) {
      throw new Error(`Invalid meal type. Must be one of: ${validMeals.join(", ")}.`);
    }
    this.#mealType = value.trim();
  }

  get quantity() {
    return this.#quantity;
  }

  set quantity(value) {
    const parsed = Number(value);
    if (isNaN(parsed) || parsed < 1) {
      throw new Error("Quantity must be a number greater than or equal to 1.");
    }
    this.#quantity = parsed;
  }

  get dietaryNote() {
    return this.#dietaryNote;
  }

  set dietaryNote(value) {
    this.#dietaryNote = value ? value.trim() : "None";
  }

  get bookingStatus() {
    return this.#bookingStatus;
  }

  set bookingStatus(value) {
    const validStatuses = ["Pending", "Confirmed", "Cancelled"];
    if (!value || !validStatuses.includes(value)) {
      throw new Error(`Invalid status. Must be: ${validStatuses.join(", ")}.`);
    }
    this.#bookingStatus = value;
  }

  

  
   // Validates all fields manually if needed.
   
  validate() {
    if (!(this.#student instanceof Student)) throw new Error("Invalid Student object.");
    if (!this.#mealDate) throw new Error("Invalid meal date.");
    if (!this.#mealType) throw new Error("Invalid meal type.");
    if (this.#quantity < 1) throw new Error("Invalid quantity.");
  }

  /**
   * Calculates total meal price (Base price: K15.00 for Lunch, K20.00 for Dinner, K10.00 for Breakfast).
   * @returns {number}
   */
  calculateTotal() {
    const baseRates = { Breakfast: 10, Lunch: 15, Dinner: 20 };
    const rate = baseRates[this.#mealType] || 15;
    return this.#quantity * rate;
  }


  confirmBooking() {
    this.#bookingStatus = "Confirmed";
  }

  cancelBooking() {
    this.#bookingStatus = "Cancelled";
  }

  /**
   * Returns a summary string referencing the connected Student object.
   * @returns {string}
   */
  getSummary() {
    return `${this.#mealType} - ${this.#mealDate}\n` +
           `   Student: ${this.#student.getFullName()} (${this.#student.studentId})\n` +
           `   Quantity: ${this.#quantity}\n` +
           `   Status: ${this.#bookingStatus}\n` +
           `   Cost: K${this.calculateTotal().toFixed(2)}`;
  }
}

module.exports = MealBooking;