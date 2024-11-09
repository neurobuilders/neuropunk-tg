import fs from "fs";
import path from "path";
import util from "util";

const readFile = util.promisify(fs.readFile);

// Helper function to read JSON data from a file
export async function readJsonFile<T>(filePath: string): Promise<T> {
  const fullPath = path.resolve(filePath);
  const fileContent = await readFile(fullPath, "utf-8");
  return JSON.parse(fileContent) as T;
}
