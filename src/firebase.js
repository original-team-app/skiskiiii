// 必要な関数を import
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAaGxVJawEjhbuqn4MZkg1pNo7R75VMo1c",
  authDomain: "team-skiing.firebaseapp.com",
  projectId: "team-skiing",
  storageBucket: "team-skiing.appspot.com",
  messagingSenderId: "371368152028",
  appId: "1:371368152028:web:48edad0f922e2f7b63dd19",
  measurementId: "G-QYNJL9P90W",
}

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig)
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app)
