# Campus Service Request Management System — Pass Component

**Divine Word University — Faculty of Business and Informatics**
**Department of Information Systems — IS305 Object-Oriented Programming**
**AT3 Major Project — Pass Component (25 marks)**

A Node.js console application that lets students and staff register,
submit, view, update, cancel and search campus service requests across
four categories: ICT Support, Facilities Maintenance, Cleaning and
Sanitation, and General Campus Service. This is the foundation layer of
the full system — Credit (inheritance/roles) and Distinction
(polymorphism, JSON persistence, reporting, testing) will extend these
same files rather than replace them.

## Requirements

- Node.js v18 or later (tested on v22). No external packages and no
  database are required — the app uses only the Node.js standard
  library and ES modules (`import`/`export`).

## How to Run

\`\`\`bash
node CampusServiceApp.js
\`\`\`

You'll see the main menu:

\`\`\`
============================================
     CAMPUS SERVICE REQUEST SYSTEM
============================================
1. Register User
2. Submit Service Request
3. View Request by ID
4. View My Requests
5. View All Requests
6. Update My Request
7. Cancel My Request
8. Search Requests
9. View Request Summary
10. Exit
============================================
\`\`\`

Type a number and press Enter to choose an option, then answer the
prompts. Data is held in memory for the duration of the session —
nothing is saved to disk yet, since JSON file persistence is a
Distinction-level feature and deliberately out of scope here.

### A note on input handling

The app checks whether it's running in a real interactive terminal or
receiving piped/redirected input. In a terminal, it prompts normally
using Node's `readline` module. If input is piped in from a file (e.g.
`node CampusServiceApp.js < demo-input.txt`, useful for demonstrating
or testing the whole workflow in one go), it reads all of stdin
up-front and serves it back one line per prompt. This avoids a known
timing issue where `readline` can silently drop later prompts if the
entire input arrives at once.

## Project Structure

\`\`\`
campus-service-system/
├── User.js                  # User class
├── ServiceRequest.js        # ServiceRequest class
├── ServiceRequestManager.js # Manages users & requests using arrays
├── CampusServiceApp.js      # Console menu / application entry point
└── README.md
\`\`\`

## Class Design

### `User.js`
Exports `USER_TYPES` (currently `["Student", "Staff"]` — the two
requester-facing roles used at Pass level) and the `User` class.

Private fields: `#userId`, `#firstName`, `#lastName`, `#email`,
`#userType`.

- Uses JavaScript `get`/`set` accessor syntax rather than
  `getX()`/`setX()` methods, so a field reads and writes like a normal
  property (`user.firstName`) while still routing through validation
  behind the scenes.
- The constructor assigns through `this.userId = userId`, `this.email =
  email`, etc. — meaning every setter's validation runs automatically
  the moment a `User` is constructed. An invalid `User` can never
  actually be created; the constructor throws immediately instead.
- `setEmail` checks the format with a regular expression
  (`^[^\s@]+@[^\s@]+\.[^\s@]+$`); `setUserType` checks membership in
  `USER_TYPES`.
- `getFullName()` returns `"${firstName} ${lastName}"`.
- `validate()` independently re-checks all five fields and returns an
  array of error strings (an empty array means the user is valid). In
  normal use this will rarely find a problem — since the setters
  already enforce validity on every assignment — but it exists as a
  standalone check that `ServiceRequestManager` calls before
  registering a user, and it matches the array-of-errors pattern used
  throughout the rest of the system.
- `displayInfo()` returns a formatted multi-line string of the user's
  details.

### `ServiceRequest.js`
Exports `CATEGORIES`, `PRIORITIES`, `STATUSES`, and the `ServiceRequest`
class.

Private fields: `#requestId`, `#requester` (a `User`), `#title`,
`#description`, `#location`, `#category`, `#priority`, `#status`,
`#dateSubmitted`, `#dateUpdated`.

- `status` defaults to `"Submitted"` in the constructor and is never
  exposed through a public setter — the only ways it can change are the
  controlled methods `cancelRequest()` (Pass level) and, in future,
  additional status-transition methods added for Credit/Distinction.
  This stops any outside code from setting an arbitrary status string.
- `requestId` and `requester` are set once in the constructor and have
  no further update path — they identify *which* request this is and
  *who* it belongs to, and shouldn't change after creation.
- `title`, `description`, `location`, `category` and `priority` each
  have a controlled setter; `category`/`priority` validate membership
  in `CATEGORIES`/`PRIORITIES`.
- `validate()` follows the same array-of-errors pattern as `User`,
  including an `instanceof User` check on the requester.
- `updateDetails(changes)` accepts a partial object (e.g. `{ priority:
  "Urgent" }`) and only updates the fields actually present, by
  re-using the class's own public setters — so an update is validated
  exactly the same way as a fresh field assignment. It refuses to run
  at all if the request's status is already `"Cancelled"`, and if any
  individual field update throws, the request is left in its last
  valid state rather than being half-updated.
- `cancelRequest()` refuses to cancel a request that is already
  `"Cancelled"`.
- `getRequestSummary()` returns a formatted multi-line string,
  including the requester's name and ID via `requester.getFullName()`
  and `requester.userId` — reading those through `User`'s own public
  interface rather than reaching into its private fields.
- Composition: a `ServiceRequest` *has a* `User` as its requester
  rather than duplicating the requester's details as separate fields.

### `ServiceRequestManager.js`
Holds two private arrays, `#users` and `#requests`, and coordinates
every operation between them: `registerUser`, `findUserById`,
`submitRequest`, `findRequestById`, `getRequestsByUser`,
`getAllRequests`, `updateRequest`, `cancelRequest`, `searchRequests`,
`getRequestSummaryByStatus`.

- `registerUser()` and `submitRequest()` both call the object's own
  `validate()` first, then separately check for a duplicate ID using
  `find...ById()`. `submitRequest()` also checks that the requester is
  actually registered with *this* manager (not just that they're *some*
  valid `User` object) — a `ServiceRequest` can be constructed with any
  `User` instance, but the manager won't accept it unless that user has
  gone through `registerUser()` first.
- `updateRequest()` and `cancelRequest()` are where the ownership rules
  live: both look the request up, then check `request.requester.userId
  === userId` before doing anything else, throwing `"You may only
  update/cancel your own requests."` otherwise. Note this check happens
  in the manager, not inside `ServiceRequest` itself — `ServiceRequest`
  doesn't know or care who's calling it; the manager is the layer that
  knows "who is currently acting" and enforces that rule, then
  delegates the actual work to the request's own `updateDetails()` /
  `cancelRequest()` methods.
- `getAllRequests()` returns a **copy** of the internal array
  (`[...this.#requests]`), not the live array itself — returning the
  real private array would let outside code push or splice it directly,
  silently corrupting the manager's internal state without going
  through any validation.
- `searchRequests()` does a case-insensitive substring match across
  title, description, location, category and request ID.
- `getRequestSummaryByStatus()` pre-seeds a count of `0` for every value
  in `STATUSES` before counting, so a status with zero requests (e.g.
  `Cancelled` before anything has been cancelled) still appears in the
  result instead of being missing entirely.

### `CampusServiceApp.js`
Pure console/UI layer: prints the menu, collects input, calls the
manager, and prints results or `[ERROR]` messages. It contains no
business logic of its own — every rule enforced here is really being
enforced inside `User`, `ServiceRequest` or `ServiceRequestManager`; the
app just displays the outcome. This separation means the three classes
could be reused behind a different front end later without any changes.

## Validation Covered

- Missing user ID / first name / last name
- Invalid email address format
- Duplicate user ID
- Duplicate request ID
- Missing request title or description
- Unsupported category
- Unsupported priority value
- Update attempted by a user other than the requester
- Cancellation attempted by a user other than the requester
- Cancellation of a request that is already `Cancelled`

## Required Pass Tests

| # | Test | Expected Result | Verified |
|---|------|------------------|----------|
| 1 | Valid user registration | User is added successfully | ✅ |
| 2 | Duplicate user ID | Second registration is rejected | ✅ |
| 3 | Valid request submission | Request is stored with `Submitted` status | ✅ |
| 4 | Invalid request category | Request is rejected with a clear error | ✅ |
| 5 | View requester records | Only the selected user's requests are returned | ✅ |
| 6 | Cancel a `Submitted` request | Status changes to `Cancelled` | ✅ |

All six scenarios were exercised through the running console application
(registering two users, submitting requests for each, attempting a
cross-user update and cancellation, and checking the final status
summary) and behaved as required.

## Manual Demo Walkthrough

1. Choose **1** and register a user, e.g. ID `S001`, name `Mary Kapal`,
   email `mary.kapal@dwu.ac.pg`, type `Student`.
2. Choose **2** and submit a request as `S001` (e.g. category
   `ICT Support`, priority `High`).
3. Choose **4** and view `S001`'s requests — only that user's request(s)
   appear.
4. Choose **6** to update the request's title/priority (leave other
   fields blank to keep them unchanged).
5. Choose **8** and search for a keyword from the title/description.
6. Choose **9** to see the count of requests by status.
7. Choose **7** to cancel the request — its status becomes `Cancelled`.
8. Try cancelling it again, or updating it, to see the appropriate
   `[ERROR]` messages.
9. Choose **10** to exit.

## Design Decisions / Assumptions

- User IDs and request IDs are treated as case-sensitive strings.
  Request IDs are auto-generated by the app (`REQ-0001`, `REQ-0002`, …)
  so users never have to type or duplicate one themselves.
- `USER_TYPES` currently lists `Student` and `Staff` only — the two
  requester-facing roles needed at Pass level. `Service Officer`,
  `Technician` and `Administrator` will be introduced as part of the
  Credit component's role-based classes.
- `validate()` on both `User` and `ServiceRequest` returns an array of
  error messages rather than throwing directly, so the same validation
  logic can be reused by the manager (which combines the errors into a
  single thrown message) and, in future, by other callers that may want
  to collect errors without an exception.
- `ServiceRequest.STATUSES` currently only lists `Submitted` and
  `Cancelled`, per the Pass-level brief. Additional statuses (e.g.
  `Assigned`, `In Progress`, `Resolved`, `Closed`) will be added at the
  Credit/Distinction stage.

## Author

Prepared for IS305 AT3 — Campus Service Request Management System
(Pass Component).

//This is done with the Aid of ChatGPT.