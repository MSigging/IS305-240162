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