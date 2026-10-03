import { readFile, writeFile, mkdir } from "fs/promises";
import { dirname } from "path";

/**
 * jsonFileStore.js
 * The one place in the whole application that actually touches
 * fs/promises. 
*/

export async function readJsonArray(filePath) {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error(`Expected an array in ${filePath}, but found ${typeof parsed}.`);
    }
    return parsed;
  } catch (err) {
    if (err.code === "ENOENT") {
      // File doesn't exist yet - treat as "no records saved so far".
      return [];
    }
    if (err instanceof SyntaxError) {
      throw new Error(`File-reading error: "${filePath}" contains invalid JSON (${err.message}).`);
    }
    throw new Error(`File-reading error for "${filePath}": ${err.message}`);
  }
}

/**
 * Writes an array to a JSON file, creating the containing folder first
 * if it doesn't exist yet (e.g. the very first save of the program).
 */

export async function writeJsonArray(filePath, records) {
  if (!Array.isArray(records)) {
    throw new Error(`writeJsonArray() expects an array, received ${typeof records}.`);
  }
  try {
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify(records, null, 2), "utf8");
  } catch (err) {
    throw new Error(`File-writing error for "${filePath}": ${err.message}`);
  }
}
