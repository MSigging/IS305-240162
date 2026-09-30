export const USER_TYPES = Object.freeze(["Student", "Staff"]);

export class User {
  #userId;
  #firstName;
  #lastName;
  #email;
  #userType;

  constructor(userId, firstName, lastName, email, userType) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userType = userType;
  }

  // ---- Getters ----
  get userId() { return this.#userId; }
  get firstName() { return this.#firstName; }
  get lastName() { return this.#lastName; }
  get email() { return this.#email; }
  get userType() { return this.#userType; }

  // ---- Controlled setters ----
  set userId(value) {
    if (typeof value !== "string" || value.trim() === "")
      throw new Error("User ID is required.");
    this.#userId = value.trim();
  }

  set firstName(value) {
    if (typeof value !== "string" || value.trim() === "")
      throw new Error("First name is required.");
    this.#firstName = value.trim();
  }

  set email(value) {
    if (typeof value !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
      throw new Error("Invalid email address.");
    this.#email = value.trim();
  }

  // TODO 1: set lastName(value)  -> copy the firstName setter, change the names and message
  set lastName(value) {
  if (typeof value !== "string" || value.trim() === "") 
    throw new Error("Last name is required.");
  this.#lastName = value.trim();
}
  // TODO 2: set userType(value)  -> throw if !USER_TYPES.includes(value)
  //         (put the allowed types in the error message)
 set userType(value) {
  if (!USER_TYPES.includes(value))
    throw new Error(`User type must be one of: ${USER_TYPES.join(", ")}`);
  this.#userType = value;
}

  // TODO 3: getFullName()  -> return the first and last name joined with a space
  getFullName() {
  return `${this.firstName} ${this.lastName}`;
}
  // TODO 4: validate()     -> re-check all five fields (see hint below)
 validate() {
  const errors = [];
  if (!this.#userId) errors.push("User ID is required.");
  if (!this.#firstName) errors.push("First name is required.");
  if (!this.#lastName) errors.push("Last name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.#email ?? "")) errors.push("Invalid email address.");
  if (!USER_TYPES.includes(this.#userType)) errors.push(`User type must be one of: ${USER_TYPES.join(", ")}`);
  return errors;
}
 
  // TODO 5: displayInfo()  -> return a formatted string, one detail per line
displayInfo() {
  return `User ID: ${this.userId}\nName: ${this.getFullName()}\nEmail: ${this.email}\nType: ${this.userType}`;
  }
} 