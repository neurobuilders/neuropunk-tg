/**
 * ! Executing this script will delete all data in your database and seed it with 10 auth_users.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";

const main = async () => {
  const seed = await createSeedClient({ dryRun: false });

  // Truncate all tables in the database
  await seed.$resetDatabase();

  // Seed the database with 10 auth_users
  await seed.public_users([
    {
      first_name: "Maxim",
      last_name: "M",
      email: null,
      tg_id: "278171105",
      tg_avatar_url: "",
      tg_language_code: "en",
      is_tg_premium: true,
    },
    {
      first_name: "Konstantin",
      last_name: "C",
      email: null,
      tg_id: "16595612",
      tg_avatar_url: "",
      tg_language_code: "en",
      is_tg_premium: true,
    },
  ]);

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  // console.log("Database seeded successfully!");

  process.exit();
};

main();
