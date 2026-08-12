/*
  Program: Dining Meal Booking Feature - Console Application Entry Point
  Student Name: Megdelene SIGGING
  Student ID: 240162
  Date: 17 July 2026
  Updated for PART2 date: 12/08/2026
*/


const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const Student = require("./Student"); // <-- Inserted: Import Student class
const MealBooking = require("./MealBooking");

// Store created MealBooking objects in an array
const bookingsArray = [];

/**
 * Prevent a duplicate booking where student ID, meal date, and meal type match.
 */
function isDuplicate(studentId, mealDate, mealType) {
  return bookingsArray.some(
    (b) =>
      b.studentId.toLowerCase() === studentId.toLowerCase() &&
      b.mealDate === mealDate &&
      b.mealType.toLowerCase() === mealType.toLowerCase()
  );
}

/**
 * Creates, validates, and stores a new booking.
 */
function createBooking(bookingDetails) {
  const booking = new MealBooking(bookingDetails);

  booking.validate();

  if (isDuplicate(booking.studentId, booking.mealDate, booking.mealType)) {
    throw new Error(
      `Duplicate booking error: Student ID ${booking.studentId} already has a ${booking.mealType} booking on ${booking.mealDate}.`
    );
  }

  bookingsArray.push(booking);
  return booking;
}

/**
 * Application Entry Function
 */
async function runApplication() {
  const rl = readline.createInterface({ input, output });

  try {
    // --- LAB 2 PART 1: Interactive Console Entry for Student ---
    const studentId = await rl.question("Student ID: ");
    const firstName = await rl.question("First name: ");
    const lastName = await rl.question("Last name: ");

    console.log(""); // Blank line separator

    // Create the Student object using entered information
    const student = new Student(studentId, firstName, lastName);

    // Call displayInfo() to output student details
    student.displayInfo();

  } catch (err) {
    console.log("\n========================================");
    console.log("             ENTRY REJECTED             ");
    console.log("========================================");
    console.log(`Reason: ${err.message}`);
    console.log("========================================");
  } finally {
    rl.close();
  }
}

// Execute application
runApplication();