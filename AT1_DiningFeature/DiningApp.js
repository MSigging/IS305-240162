/*
  Program: Dining Meal Booking Feature - Console Application Entry Point
  Student Name: Megdelene SIGGING
  Student ID: 240162
  Date: 17 July 2026
  Updated for PART2 date: 04/08/2026
*/

const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const MealBooking = require("./MealBooking");

// Requirement: Store all created MealBooking objects in a JavaScript array
const bookingsArray = [];

/**
 * Requirement: Prevent a duplicate booking where student ID, meal date, and meal type match.
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

  // 1. Run validate() method
  booking.validate();

  // 2. Prevent duplicate booking
  if (isDuplicate(booking.studentId, booking.mealDate, booking.mealType)) {
    throw new Error(
      `Duplicate booking error: Student ID ${booking.studentId} already has a ${booking.mealType} booking on ${booking.mealDate}.`
    );
  }

  // 3. Save to JavaScript array
  bookingsArray.push(booking);
  return booking;
}

/**
 * Application Entry Function
 */
async function runApplication() {
  console.log("========================================");
  console.log("       DWU DINING MEAL BOOKING");
  console.log("========================================\n");

  // REQUIRED TEST DEMONSTRATIONS

  console.log(">>> DEMONSTRATING REQUIRED TEST CASES <<<\n");

  // TEST 1: Valid Booking
  console.log("--- Test 1: Valid Booking ---");
  try {
    const test1 = createBooking({
      studentId: "DWU2026001",
      studentName: "Maria Kila",
      mealDate: "2026-07-18",
      mealType: "Lunch",
      quantity: 2,
      dietaryNote: "No peanuts"
    });
    console.log(test1.getSummary());
  } catch (err) {
    console.error("Test 1 Failed:", err.message);
  }

  // TEST 2: Invalid Booking (Missing/invalid fields)
  console.log("\n--- Test 2: Invalid Booking ---");
  try {
    createBooking({
      studentId: "DWU2026002",
      studentName: "Alex Mercer",
      mealDate: "2026-07-18",
      mealType: "Snack", // Invalid meal type
      quantity: 0,       // Quantity below 1
      dietaryNote: "None"
    });
  } catch (err) {
    console.log("Result: Booking rejected with error message as expected.");
    console.log(`Error Displayed: "${err.message}"`);
  }

  // TEST 3: Duplicate Booking
  console.log("\n--- Test 3: Duplicate Booking ---");
  try {
    createBooking({
      studentId: "DWU2026001", // Matches Student ID, Meal Date, and Meal Type from Test 1
      studentName: "Maria Kila",
      mealDate: "2026-07-18",
      mealType: "Lunch",
      quantity: 1,
      dietaryNote: "Extra rice"
    });
  } catch (err) {
    console.log("Result: Duplicate booking rejected with error message as expected.");
    console.log(`Error Displayed: "${err.message}"`);
  }

  // Demonstration of confirmBooking() and cancelBooking()
  console.log("\n--- Method Demonstrations: Status Changes ---");
  const sampleBooking = bookingsArray[0];
  console.log(`Current Status: ${sampleBooking.bookingStatus}`);

  sampleBooking.confirmBooking();
  console.log(`After confirmBooking(): ${sampleBooking.bookingStatus}`);

  sampleBooking.cancelBooking();
  console.log(`After cancelBooking(): ${sampleBooking.bookingStatus}`);


  console.log("\n========================================");
  console.log("       INTERACTIVE CONSOLE ENTRY");
  console.log("========================================\n");

  const rl = readline.createInterface({ input, output });

  try {
    const studentId = await rl.question("Student ID: ");
    const studentName = await rl.question("Student name: ");
    const mealDate = await rl.question("Meal date: ");
    const mealType = await rl.question("Meal type: ");
    const quantity = await rl.question("Quantity: ");
    const dietaryNote = await rl.question("Dietary note: ");

    console.log(""); // Blank line separator

    const userBooking = createBooking({
      studentId,
      studentName,
      mealDate,
      mealType,
      quantity,
      dietaryNote
    });

    console.log(userBooking.getSummary());

  } catch (err) {
    console.log("\n========================================");
    console.log("           BOOKING REJECTED             ");
    console.log("========================================");
    console.log(`Reason: ${err.message}`);
    console.log("========================================");
  } finally {
    rl.close(); 
  }
}

// Execute application
runApplication();