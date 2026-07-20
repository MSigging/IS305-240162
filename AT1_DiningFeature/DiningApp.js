/*
  Program: Dining Meal Booking Feature
  Student Name: Megdelene SIGGING
  Student ID: 240162
  Date: 17 July 2026
  
*/


const MealBooking = require("./MealBooking");

const studentBooking = new MealBooking({
  studentId: "STU987654",
  studentName: "Alex Mercer",
  mealDate: "2026-07-22",
  mealType: "Dinner",
  quantity: 2,
  dietaryNote: "Nut allergy"
});


console.log("Initial state after constructor call:");
console.log(studentBooking.getSummary());

console.log("\nUpdating booking status via setter...");
studentBooking.bookingStatus = "Confirmed";


console.log(studentBooking.getSummary());
console.log(`Direct Total verification check: $${studentBooking.calculateTotal().toFixed(2)}`);
