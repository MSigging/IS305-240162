/*
  Program: Dining Meal Booking Feature
  Student Name: Megdelene SIGGING
  Student ID: 240162
  Date: 17 July 2026
  Updated for PART2 date: 04/08/2026
  
*/

/*
  Program: Dining Meal Booking Feature - Class Definition
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
    this.#studentId = studentId ? String(studentId).trim() : "";
    this.#studentName = studentName ? String(studentName).trim() : "";
    this.#mealDate = mealDate ? String(mealDate).trim() : "";
    this.#mealType = mealType ? String(mealType).trim() : "";
    this.#quantity = parseInt(quantity, 10);
    this.#dietaryNote = dietaryNote ? String(dietaryNote).trim() : "None";
    this.#bookingStatus = "Pending"; // Default status: Pending
  }

  // Getters and Setters
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
    if (!value) throw new Error("Meal Date cannot be empty.");
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
    if (isNaN(value) || value < 1) throw new Error("Quantity must be at least 1.");
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

  // =========================================================
  // REQUIRED METHODS
  // =========================================================

  /**
   * Method: validate()
   * Rejects missing student ID, student name, meal date, invalid meal type, or quantity < 1.
   */
  validate() {
    if (!this.#studentId) {
      throw new Error("Validation Error: Missing student ID.");
    }
    if (!this.#studentName) {
      throw new Error("Validation Error: Missing student name.");
    }
    if (!this.#mealDate) {
      throw new Error("Validation Error: Missing meal date.");
    }

    // Accept only Breakfast, Lunch, or Dinner
    const validMealTypes = ["Breakfast", "Lunch", "Dinner"];
    const matchedType = validMealTypes.find(
      (type) => type.toLowerCase() === this.#mealType.toLowerCase()
    );

    if (!matchedType) {
      throw new Error(`Validation Error: Invalid meal type "${this.#mealType}". Must be Breakfast, Lunch, or Dinner.`);
    }
    this.#mealType = matchedType; // Standardize capitalization

    // Reject a quantity below 1
    if (isNaN(this.#quantity) || this.#quantity < 1) {
      throw new Error("Validation Error: Quantity must be at least 1.");
    }
  }

  /**
   * Method: calculateTotal()
   * Return selected meal price multiplied by quantity (Total cost = meal price × quantity).
   */
  calculateTotal() {
    let pricePerMeal = 0;

    switch (this.#mealType.toLowerCase()) {
      case "breakfast":
        pricePerMeal = 10.00;
        break;
      case "lunch":
        pricePerMeal = 15.00;
        break;
      case "dinner":
        pricePerMeal = 20.00;
        break;
      default:
        pricePerMeal = 0;
    }

    return pricePerMeal * this.#quantity;
  }

  /**
   * Method: confirmBooking()
   * Change the booking status from Pending to Confirmed.
   */
  confirmBooking() {
    this.#bookingStatus = "Confirmed";
  }

  /**
   * Method: cancelBooking()
   * Change the booking status to Cancelled.
   */
  cancelBooking() {
    this.#bookingStatus = "Cancelled";
  }

  /**
   * Method: getSummary()
   * Return or display a clear booking receipt formatted as specified.
   */
  getSummary() {
    const totalInKina = this.calculateTotal().toFixed(2);
    return [
      "========================================",
      "          BOOKING CREATED               ",
      "========================================",
      `Student: ${this.#studentName} (${this.#studentId})`,
      `Meal: ${this.#mealType} x ${this.#quantity}`,
      `Date: ${this.#mealDate}`,
      `Dietary note: ${this.#dietaryNote}`,
      `Status: ${this.#bookingStatus}`,
      `Total cost: K${totalInKina}`,
      "========================================"
    ].join("\n");
  }
}

module.exports = MealBooking;