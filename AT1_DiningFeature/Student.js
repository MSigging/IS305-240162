 
 /*
 THIS IS LAB2_PART1 - Student Class & Constructor
  Student Name: Megdelene SIGGING
  Student ID: 240162
  Date: 12/08/2026
  
  */

class Student {
  // Private fields
  #studentId;
  #firstName;
  #lastName;

  /**
   * Constructs a Student instance.
   * @param {string} studentId 
   * @param {string} firstName 
   * @param {string} lastName 
   */
  constructor(studentId, firstName, lastName) {
   
    this.studentId = studentId;
    this.firstName = firstName;
    this.lastName = lastName;
  }

 

  get studentId() {
    return this.#studentId;
  }

  set studentId(value) {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      throw new Error("Student ID cannot be empty.");
    }
    this.#studentId = value.trim();
  }

  get firstName() {
    return this.#firstName;
  }

  set firstName(value) {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      throw new Error("First name cannot be empty.");
    }
    this.#firstName = value.trim();
  }

  get lastName() {
    return this.#lastName;
  }

  set lastName(value) {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      throw new Error("Last name cannot be empty.");
    }
    this.#lastName = value.trim();
  }

  // --- Required Methods ---

  /**
   * Returns the student's full name as a single string.
   * @returns {string}
   */
  getFullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }

 
  displayInfo() {
    console.log("========================================");
    console.log("             STUDENT DETAILS            ");
    console.log("========================================");
    console.log(`Student ID: ${this.#studentId}`);
    console.log(`Student Name: ${this.getFullName()}`);
    console.log("========================================");
  }
}

module.exports = Student;