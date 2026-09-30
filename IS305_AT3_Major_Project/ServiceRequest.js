import { User } from "./User.js";

export const CATEGORIES = Object.freeze([
  "ICT Support",
  "Facilities Maintenance",
  "Cleaning and Sanitation",
  "General Campus Service"
]);

export const PRIORITIES = Object.freeze(["Low", "Normal", "High", "Urgent"]);

export const STATUSES = Object.freeze(["Submitted", "Cancelled"]);

export class ServiceRequest {
  #requestId;
  #requester;
  #title;
  #description;
  #location;
  #category;
  #priority;
  #status;
  #dateSubmitted;
  #dateUpdated;

  constructor(requestId, requester, title, description, location, category, priority = "Normal") {
    this.requestId = requestId;
    this.requester = requester;
    this.title = title;
    this.description = description;
    this.location = location;
    this.category = category;
    this.priority = priority;
    this.#status = "Submitted";
    this.#dateSubmitted = new Date();
    this.#dateUpdated = new Date();
  }

  // ---- Getters ----
  get requestId() { return this.#requestId; }
  get requester() { return this.#requester; }
  get title() { return this.#title; }
  get description() { return this.#description; }
  get location() { return this.#location; }
  get category() { return this.#category; }
  get priority() { return this.#priority; }
  get status() { return this.#status; }
  get dateSubmitted() { return this.#dateSubmitted; }
  get dateUpdated() { return this.#dateUpdated; }

  // ---- Controlled setters ----

  set requestId(value) {
    if (typeof value !== "string" || value.trim() === "")
      throw new Error("Request ID is required.");
    this.#requestId = value.trim();
  }

  set requester(value) {
    if (!(value instanceof User))
      throw new Error("Requester must be a valid registered User.");
    this.#requester = value;
  }

  // Set title(value)
  
   set title(value) {
  if (typeof value !== "string" || value.trim() === "")
    throw new Error("Request title is required.");
  this.#title = value.trim();
}

  // Set description(value)
  
    set description(value) {
  if (typeof value !== "string" || value.trim() === "")
    throw new Error("Request description is required.");
  this.#description = value.trim();
}

  // Set location(value)
 
    set location(value)  {
        if (typeof value !== "string" || value.trim() === "")
            throw new Error("Campus location is required.")
        this.#location = value.trim();
    }

   //Set category(value)
  
    set category(value) {
  if (!CATEGORIES.includes(value))
    throw new Error(`Category must be one of: ${CATEGORIES.join(", ")}`);
  this.#category = value;
}

    // Set Priority

     set priority(value) {
    if (!PRIORITIES.includes(value))
      throw new Error(`Priority must be one of: ${PRIORITIES.join(", ")}`);
    this.#priority = value;
  } 

 

  // TODO 6: validate()
  validate() {
  const errors = [];

  if (!this.#requestId || this.#requestId.trim() === "")
    errors.push("Request ID is required.");

  if (!(this.#requester instanceof User))
    errors.push("A valid registered requester is required.");

  if (!this.#title || this.#title.trim() === "")
    errors.push("Request title is required.");

  if (!this.#description || this.#description.trim() === "")
    errors.push("Request description is required.");

  if (!this.#location || this.#location.trim() === "")
    errors.push("Campus location is required.");

  if (!CATEGORIES.includes(this.#category))
    errors.push(`Category must be one of: ${CATEGORIES.join(", ")}`);

  if (!PRIORITIES.includes(this.#priority))
    errors.push(`Priority must be one of: ${PRIORITIES.join(", ")}`);

  return errors;
}


  // TODO 7: updateDetails(changes)
  updateDetails(changes = {}) {
  if (this.#status === "Cancelled")
    throw new Error("Cannot update a cancelled request.");

  const { title, description, location, category, priority } = changes;

  if (title !== undefined) this.title = title;
  if (description !== undefined) this.description = description;
  if (location !== undefined) this.location = location;
  if (category !== undefined) this.category = category;
  if (priority !== undefined) this.priority = priority;

  this.#dateUpdated = new Date();
}


  // TODO 8: cancelRequest()
  cancelRequest() {
  if (this.#status === "Cancelled")
    throw new Error("This request has already been cancelled.");

  this.#status = "Cancelled";
  this.#dateUpdated = new Date();
}

  // TODO 9: getRequestSummary()
        getRequestSummary() {
  return `Request ID: ${this.requestId}
Title: ${this.title}
Requester: ${this.requester.getFullName()} (${this.requester.userId})
Category: ${this.category}
Priority: ${this.priority}
Status: ${this.status}
Location: ${this.location}
Description: ${this.description}
Submitted: ${this.dateSubmitted.toLocaleString()}
Updated: ${this.dateUpdated.toLocaleString()}`;
}

}