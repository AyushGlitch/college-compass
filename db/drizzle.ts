import { drizzle } from 'drizzle-orm/expo-sqlite';
import { deleteDatabaseAsync, openDatabaseSync } from 'expo-sqlite';

let expo = openDatabaseSync('db', { enableChangeListener: true });

// if (expo) {
//     deleteDatabaseAsync("db.db")
//     console.log("Database Deleted")
//     expo = openDatabaseSync("db.db")
// }

export const db = drizzle(expo);
