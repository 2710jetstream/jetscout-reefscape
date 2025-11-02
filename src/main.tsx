import { createRoot } from "react-dom/client";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import "./index.css";
import App from "./App";

const convexUrl = import.meta.env.VITE_CONVEX_URL;
console.log('Convex URL:', convexUrl); // Debug log

if (!convexUrl) {
  throw new Error('VITE_CONVEX_URL is not defined! Check your environment variables.');
}

const convex = new ConvexReactClient(convexUrl);

// Add error handling for Convex client
convex.onError((error) => {
  console.error('Convex client error:', error);
});

const root = createRoot(document.getElementById("root")!);

try {
  root.render(
    <ConvexAuthProvider client={convex}>
      <App />
    </ConvexAuthProvider>,
  );
} catch (error) {
  console.error('Error rendering app:', error);
  // Render a fallback error UI
  root.render(
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Something went wrong</h1>
      <p>Please check the console for more details.</p>
    </div>
  );
}
