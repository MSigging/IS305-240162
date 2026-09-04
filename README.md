### GitHub Repository URL
https://github.com/MSigging/IS305-240162.git



# Dining Account Distinction Extension (Lab 3)
**Faculty of Business and Informatics - Department of Information Systems**  
**Course:** IS305 – Object-Oriented Programming  
**Technology:** JavaScript (Node.js)  

---

## Simulated Method and Constructor Overloading Explanation (Task 6)

JavaScript does not natively support traditional method overloading (defining multiple functions with identical names but different argument lists). In this application, overloading behavior is simulated using **optional parameters and default parameter values**.

### 1. Constructor Overloading Simulation
The `DiningAccount` constructor simulates overloading by defaulting `openingBalance` to `0` when omitted:
```javascript
new DiningAccount("DA001");           // Uses default openingBalance = 0
new DiningAccount("DA002", 1000.00);   // Uses explicit openingBalance = 1000



account.deposit(100);                         // Description defaults to "Standard Deposit"
account.deposit(100, "Additional meal funds"); // Uses provided description