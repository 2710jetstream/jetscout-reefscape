import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { Suspense } from "react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { ScoutingForm } from "./components/ScoutingForm";
import { DataViewer } from "./components/DataViewer";
import { useState } from "react";

type Page = "scout" | "data";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>("scout");

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    }>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <header className="sticky top-0 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">JetScout</h1>
              <span className="text-sm text-gray-600 dark:text-gray-400">2025 ReefScape</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <SignOutButton />
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto p-4">
          <Content currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </main>
        <Toaster />
      </div>
    </div>
    </Suspense>
  );
}

function Content({ currentPage, setCurrentPage }: { currentPage: Page; setCurrentPage: (page: Page) => void }) {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Authenticated>
        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1">
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage("scout")}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  currentPage === "scout"
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/20"
                }`}
              >
                Scout
              </button>
              <button
                onClick={() => setCurrentPage("data")}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  currentPage === "data"
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/20"
                }`}
              >
                Data
              </button>
            </div>
          </nav>
        </div>

        {/* Page Content */}
        <div className="transition-opacity duration-300">
          {currentPage === "scout" && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Match Scouting Form
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Welcome, {loggedInUser?.email ?? "Scouter"}
                </p>
              </div>
              <ScoutingForm />
            </div>
          )}
          
          {currentPage === "data" && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Real-Time Data Viewer
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Live scouting data from all matches
                </p>
              </div>
              <DataViewer />
            </div>
          )}
        </div>
      </Authenticated>
      
      <Unauthenticated>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              JetScout
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to start scouting matches
            </p>
          </div>
          <SignInForm />
        </div>
      </Unauthenticated>
    </div>
  );
}
