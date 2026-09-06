import { db, auth } from "../firebase";
import {
  collection, addDoc, getDocs, GeoPoint, Timestamp
} from "firebase/firestore";

export async function submitReport({ lat, lng, category, description }) {
  if (!auth.currentUser) throw new Error("User not authenticated yet");

  const docRef = await addDoc(collection(db, "reports"), {
    location: new GeoPoint(lat, lng),
    category,
    description,
    timestamp: Timestamp.now(),
    upvotes: 0,
    downvotes: 0,
    credibilityScore: 0.5,
    status: "pending",
    reporterId: auth.currentUser.uid
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