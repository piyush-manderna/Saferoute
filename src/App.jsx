import { useEffect } from "react";
import Home from "./pages/Home";
import { loginAnonymously } from "./services/auth";

function App() {
  useEffect(() => {
    const testAuth = async () => {
      try {
        const user = await loginAnonymously();

        console.log("✅ Firebase Authentication Working");
        console.log("User UID:", user.uid);
      } catch (error) {
        console.error(
          "❌ Firebase Authentication Failed:",
          error
        );
      }
    };

    testAuth();
  }, []);

  return <Home />;
}

export default App;