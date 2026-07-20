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
    this.#bookingStatus = "Pending"; // Set to Pending by default
  }

  