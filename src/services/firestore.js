// TODO [Member 3]: Implement these functions per the Integration Contract.
// Signatures expected by Member 5's components:

export async function submitReport(data) {
  // Should write `data` (category, description, createdAt) to Firestore
  // e.g. await addDoc(collection(db, "reports"), data);
  throw new Error("submitReport() not implemented yet — waiting on Member 3");
}

export async function getReports() {
  // Should fetch all reports from Firestore, newest first
  throw new Error("getReports() not implemented yet — waiting on Member 3");
}

export async function getSafeZones() {
  // Should fetch safe_zones collection: police, hospital, metro, 24x7 spaces
  throw new Error("getSafeZones() not implemented yet — waiting on Member 3");
}

