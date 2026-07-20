/*
  Program: Dining Meal Booking Feature
  Student Name: Megdelene SIGGING
  Student ID: 240162
  Date: 17 July 2026
  
*/


// Import the MealBooking class
const MealBooking = require("./MealBooking");

// Create a new MealBooking object 
const studentBooking = new MealBooking({
  studentId: "STU987654",
  studentName: "Alex Mercer",
  mealDate: "2026-07-22",
  mealType: "Dinner",
  quantity: 2,
  dietaryNote: "Nut allergy"
});

