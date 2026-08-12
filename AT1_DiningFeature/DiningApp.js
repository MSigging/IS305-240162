/*
  Program: Dining Meal Booking Feature - Console Application Entry Point
  Student Name: Megdelene SIGGING
  Student ID: 240162
  Date: 17 July 2026
  Updated for PART2 date: 12/08/2026
*/


const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const Student = require("./Student");
const MealBooking = require("./MealBooking");

// Global array storing created MealBooking objects
const bookingsArray = [];

/**
  Displays booking history for a specific student.
 * @param {Student} student 
 * @param {Array<MealBooking>} bookings 
 */
function displayBookingHistory(student, bookings) {
  // Find bookings belonging to this specific student
  const studentBookings = bookings.filter(
    (b) => b.studentId.toLowerCase() === student.studentId.toLowerCase()
  );

  console.log("========================================");
  console.log("          STUDENT INFORMATION           ");
  console.log("========================================");
  console.log(`Student ID: ${student.studentId}`);
  console.log(`Student Name: ${student.getFullName()}`);
  console.log("");
  console.log("========================================");
  console.log("            BOOKING HISTORY             ");
  console.log("========================================");

  if (studentBookings.length === 0) {
    console.log("No meal bookings found for this student.");
  } else {
    let combinedCost = 0;
    studentBookings.forEach((b, index) => {
      const cost = b.calculateTotal();
      combinedCost += cost;
      console.log(`${index + 1}. ${b.mealType} - ${b.mealDate}`);
      console.log(`   Quantity: ${b.quantity}`);
      console.log(`   Status: ${b.bookingStatus}`);
      console.log(`   Cost: K${cost.toFixed(2)}\n`);
    });

    console.log(`Total Bookings: ${studentBookings.length}`);
    console.log(`Combined Cost: K${combinedCost.toFixed(2)}`);
  }
  console.log("========================================\n");
}


 //Checks for duplicate bookings.
 
function isDuplicate(studentId, mealDate, mealType) {
  return bookingsArray.some(
    (b) =>
      b.studentId.toLowerCase() === studentId.toLowerCase() &&
      b.mealDate === mealDate &&
      b.mealType.toLowerCase() === mealType.toLowerCase()
  );
}


 // Helper to validate, check duplicates, and store bookings.
 
function createBooking(bookingDetails) {
  const booking = new MealBooking(bookingDetails);

  if (isDuplicate(booking.studentId, booking.mealDate, booking.mealType)) {
    throw new Error(
      `Duplicate booking error: Student ID ${booking.studentId} already has a ${booking.mealType} booking on ${booking.mealDate}.`
    );
  }

  bookingsArray.push(booking);
  return booking;
}


 // Application Entry Point
 
async function runApplication() {
  const rl = readline.createInterface({ input, output });

  try {
    console.log("========================================");
    console.log("       DWU DINING MEAL BOOKING          ");
    console.log("========================================\n");

    // Collect Student details & Create Student object ---
    console.log("--- Step 1: Student Information ---");
    const studentId = await rl.question("Student ID: ");
    const firstName = await rl.question("First name: ");
    const lastName = await rl.question("Last name: ");

    const student = new Student(studentId, firstName, lastName);

    // Collect First Meal Booking details 
    console.log("\n--- Step 2: Meal Booking Details ---");
    const mealDate = await rl.question("Meal date (e.g. 12 August 2026): ");
    const mealType = await rl.question("Meal type (Breakfast/Lunch/Dinner): ");
    const quantity = await rl.question("Quantity: ");
    const dietaryNote = await rl.question("Dietary note: ");

    console.log("\nCreating booking...");
    const booking1 = createBooking({
      student: student, // Connecting Student object
      mealDate,
      mealType,
      quantity: Number(quantity),
      dietaryNote
    });
    booking1.confirmBooking();

    // Create a second booking connected to the SAME Student object
    const booking2 = createBooking({
      student: student, // Shared Student object reference
      mealDate: "13 August 2026",
      mealType: "Dinner",
      quantity: 1,
      dietaryNote: "None"
    });

    console.log("\n--- Initial Student Booking History ---");
    displayBookingHistory(student, bookingsArray);

    // Controlled Student Name Update Demonstration 
    console.log("--- Task 4: Updating Student Name ---");
    console.log(`Updating student's last name from '${student.lastName}' to 'Kila-Buka'...\n`);
    
    student.lastName = "Kila-Buka"; // Modifies underlying Student object via setter

    console.log("--- Updated Booking History (Demonstrating Object References) ---");
    displayBookingHistory(student, bookingsArray);

  } catch (err) {
    console.log("\n========================================");
    console.log("             BOOKING REJECTED           ");
    console.log("========================================");
    console.log(`Reason: ${err.message}`);
    console.log("========================================");
  } finally {
    rl.close();
  }
}

runApplication();