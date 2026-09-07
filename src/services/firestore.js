import { db, auth } from "../firebase";

import {
  collection,
  addDoc,
  getDocs,
  GeoPoint,
  Timestamp,
} from "firebase/firestore";

/**
 * Submit a safety report
 */
export async function submitReport({
  category,
  customCategory = null,
  description,
  lat,
  lng,
}) {
  // User must be anonymously authenticated
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  // Basic validation
  if (!category) {
    throw new Error("Category is required");
  }

  if (!description || !description.trim()) {
    throw new Error("Description is required");
  }

  if (lat == null || lng == null) {
    throw new Error("Location is required");
  }

  const reportData = {
    location: new GeoPoint(Number(lat), Number(lng)),
    category,
    customCategory: customCategory ?? null,
    description: description.trim(),
    timestamp: Timestamp.now(),
    status: "pending",
    reporterID: auth.currentUser.uid,
  };

  const docRef = await addDoc(
    collection(db, "reports"),
    reportData
  );

  return {
    id: docRef.id,
    ...reportData,
  };
}

/**
 * Get all safety reports
 */
export async function getReports() {
  const snapshot = await getDocs(
    collection(db, "reports")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/**
 * Get all safe zones
 */
export async function getSafeZones() {
  const snapshot = await getDocs(
    collection(db, "safe_zones")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}