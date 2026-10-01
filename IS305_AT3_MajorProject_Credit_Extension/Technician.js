import { User } from "./User.js";



 // Carries out assigned work: begins, updates and resolves requests.
 //Extends User with a technical speciality field.
 
export class Technician extends User {
  #technicalSpeciality;

  // The Constructor.

  constructor(userId, firstName, lastName, email, technicalSpeciality) {
    super(userId, firstName, lastName, email, "Technician");
    this.technicalSpeciality = technicalSpeciality;
  }

  get technicalSpeciality() {
    return this.#technicalSpeciality;
  }

  set technicalSpeciality(value) {
    if (typeof value !== "string" || value.trim() === "")
      throw new Error("Technical speciality is required.");
    this.#technicalSpeciality = value.trim();
  }


  //Displays the information

  displayInfo() {
    return super.displayInfo() + `\nSpeciality : ${this.#technicalSpeciality}`;
  }
}