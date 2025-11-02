import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function DataViewer() {
  const [searchTerm, setSearchTerm] = useState("");
  const scoutingData = useQuery(api.scouting.getAllScoutingData) || [];

  const filteredData = useMemo(() => {
    if (!searchTerm) return scoutingData;
    
    const term = searchTerm.toLowerCase();
    return scoutingData.filter(entry => 
      entry.teamNumber.toString().includes(term) ||
      entry.matchNumber.toString().includes(term)
    );
  }, [scoutingData, searchTerm]);

  const exportToCSV = () => {
    if (filteredData.length === 0) return;

    const headers = [
      "Match Number",
      "Team Number",
      "Alliance",
      "Auto Coral L1",
      "Auto Coral L2", 
      "Auto Coral L3",
      "Auto Coral L4",
      "Teleop Coral L1",
      "Teleop Coral L2",
      "Teleop Coral L3", 
      "Teleop Coral L4",
      "End Position",
      "Offense Skill",
      "Comments",
      "Scouter",
      "Timestamp"
    ];

    const csvContent = [
      headers.join(","),
      ...filteredData.map(entry => [
        entry.matchNumber,
        entry.teamNumber,
        entry.robot,
        entry.autoCoralL1,
        entry.autoCoralL2,
        entry.autoCoralL3,
        entry.autoCoralL4,
        entry.teleopCoralL1,
        entry.teleopCoralL2,
        entry.teleopCoralL3,
        entry.teleopCoralL4,
        `"${entry.endPosition}"`,
        entry.offenseSkill,
        `"${entry.comments.replace(/"/g, '""')}"`,
        `"${entry.scouterInitials}"`,
        new Date(entry._creationTime).toLocaleString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `jetscout-data-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const isRecent = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    return diff < 5 * 60 * 1000; // 5 minutes
  };

  return (
    <div className="space-y-6">
      {/* Search and Export Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex-1 max-w-md">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search by Team or Match Number
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter team or match number..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredData.length} entries
            </span>
            <button
              onClick={exportToCSV}
              disabled={filteredData.length === 0}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredData.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 dark:text-gray-500 mb-2">
              📊
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? "No data matches your search" : "No scouting data available"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Match</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Team</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Alliance</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Auto L1</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Auto L2</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Auto L3</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Auto L4</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Tele L1</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Tele L2</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Tele L3</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Tele L4</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">End Pos</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Offense</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Comments</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredData.map((entry, index) => (
                  <tr 
                    key={entry._id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                      isRecent(entry._creationTime) 
                        ? 'bg-purple-50 dark:bg-purple-900/20 animate-pulse' 
                        : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {entry.matchNumber}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-purple-600 dark:text-purple-400">
                      {entry.teamNumber}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        entry.robot.startsWith('Red') 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                        {entry.robot}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-white">
                      {entry.autoCoralL1}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-white">
                      {entry.autoCoralL2}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-white">
                      {entry.autoCoralL3}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-white">
                      {entry.autoCoralL4}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-white">
                      {entry.teleopCoralL1}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-white">
                      {entry.teleopCoralL2}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-white">
                      {entry.teleopCoralL3}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-white">
                      {entry.teleopCoralL4}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                      {entry.endPosition}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        entry.offenseSkill >= 4 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : entry.offenseSkill >= 2
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {entry.offenseSkill}/5
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                      {entry.comments || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {formatTimestamp(entry._creationTime)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
