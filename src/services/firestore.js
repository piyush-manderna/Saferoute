import { db, auth } from "../firebase";
import {
  collection, addDoc, getDocs, GeoPoint, Timestamp
} from "firebase/firestore";

export async function submitReport({ category, customCategory, description, lat, lng }) {
  if (!auth.currentUser) throw new Error("User not authenticated yet");

  const docRef = await addDoc(collection(db, "reports"), {
    location: (lat != null && lng != null) ? new GeoPoint(lat, lng) : null,
    category,
    customCategory: customCategory ?? null, // kept — required when category === "other"
    description,
    timestamp: Timestamp.now(),
    status: "pending",
    reporterID: auth.currentUser.uid
  });

  return docRef.id;
}

export async function getReports() {
  const snapshot = await getDocs(collection(db, "reports"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getSafeZones() {
  const snapshot = await getDocs(collection(db, "safe_zones"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}