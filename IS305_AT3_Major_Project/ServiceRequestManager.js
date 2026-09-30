import { User } from "./User.js";
import { ServiceRequest, STATUSES } from "./ServiceRequest.js";

export class ServiceRequestManager {
  #users;
  #requests;

  constructor() {
    this.#users = [];
    this.#requests = [];
  }

  // User Management

  registerUser(user) {
    if (!(user instanceof User))
      throw new Error("registerUser() expects a User instance.");

    const errors = user.validate();
    if (errors.length > 0)
      throw new Error(`Cannot register user:\n- ${errors.join("\n- ")}`);

    if (this.findUserById(user.userId))
      throw new Error(`A user with ID "${user.userId}" is already registered.`);

    this.#users.push(user);
    return user;
  }

 
  findUserById(userId) {
    if (!userId) return null;
    return this.#users.find((u) => u.userId === userId) || null;
  }

  //  Request Management 

  // submitRequest(request)
   submitRequest(request) {
  if (!(request instanceof ServiceRequest))
    throw new Error("submitRequest() expects a ServiceRequest instance.");

  const errors = request.validate();
  if (errors.length > 0)
    throw new Error(`Cannot submit request:\n- ${errors.join("\n- ")}`);

  if (this.findRequestById(request.requestId))
    throw new Error(`A request with ID "${request.requestId}" already exists.`);

  if (!this.findUserById(request.requester.userId))
    throw new Error("Requester must be a registered user before submitting a request.");

  this.#requests.push(request);
  return request;
}


  // findRequestById(requestId)
  findRequestById(requestId) {
  if (!requestId) return null;
  return this.#requests.find((r) => r.requestId === requestId) || null;
}

  //  getRequestsByUser(userId)
     getRequestsByUser(userId) {
  if (!userId) return [];
  return this.#requests.filter((r) => r.requester.userId === userId);
}

  // getAllRequests()
  getAllRequests() {
  return [...this.#requests];
}
  // updateRequest(requestId, userId, changes)
 updateRequest(requestId, userId, changes) {
  const request = this.findRequestById(requestId);
  if (!request)
    throw new Error(`No request found with ID "${requestId}".`);

  if (request.requester.userId !== userId)
    throw new Error("You may only update your own requests.");

  request.updateDetails(changes);
  return request;
}

  //  cancelRequest(requestId, userId)
  cancelRequest(requestId, userId) {
  const request = this.findRequestById(requestId);
  if (!request)
    throw new Error(`No request found with ID "${requestId}".`);

  if (request.requester.userId !== userId)
    throw new Error("You may only cancel your own requests.");

  request.cancelRequest();
  return request;
}

  // SearchRequests(searchText)
 searchRequests(searchText) {
  if (!searchText || searchText.trim() === "") return [];

  const text = searchText.trim().toLowerCase();

  return this.#requests.filter((r) =>
    r.title.toLowerCase().includes(text) ||
    r.description.toLowerCase().includes(text) ||
    r.location.toLowerCase().includes(text) ||
    r.category.toLowerCase().includes(text) ||
    r.requestId.toLowerCase().includes(text)
  );
}


  // getRequestSummaryByStatus()
 getRequestSummaryByStatus() {
  const summary = {};

  for (const status of STATUSES) {
    summary[status] = 0;
  }

  for (const request of this.#requests) {
    summary[request.status] = (summary[request.status] || 0) + 1;
  }

  return summary;
}

}