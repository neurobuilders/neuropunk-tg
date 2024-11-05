import { loadEnvConfig } from "@next/env";
import { exec } from "child_process";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const projectId = process.env.SUPABASE_PROJECT_ID;
if (!projectId) {
  console.error("Error: SUPABASE_PROJECT_ID is not set in .env file");
  process.exit(1);
}

const command = `supabase gen types typescript --project-id ${projectId} > src/types/database-generated.types.ts`;
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`ready.${stdout}`);
});
