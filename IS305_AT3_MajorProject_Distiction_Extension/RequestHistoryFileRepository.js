import { readJsonArray, writeJsonArray } from "./jsonFileStore.js";


 // RequestHistoryFileRepository.js
 //All reading/writing of requestHistory.json lives here. Each record is
 //one history entry 

export class RequestHistoryFileRepository {
  #filePath;

  constructor(filePath) {
    this.#filePath = filePath;
  }

  async loadAll() {
    return readJsonArray(this.#filePath);
  }

  async saveAll(records) {
    await writeJsonArray(this.#filePath, records);
  }

  async findByRequestId(requestId) {
    const records = await this.loadAll();
    return records.filter((r) => r.requestId === requestId);
  }

  
   // Replaces every history entry belonging to one request with a fresh
   
 
  async replaceForRequest(requestId, entries) {
    const records = await this.loadAll();
    const others = records.filter((r) => r.requestId !== requestId);
    const tagged = entries.map((entry) => ({ requestId, ...entry }));
    await this.saveAll([...others, ...tagged]);
  }
}
