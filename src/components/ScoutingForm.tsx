import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { CollapsibleSection } from "./CollapsibleSection";
import { Counter } from "./Counter";
import { Toggle } from "./Toggle";
import { Slider } from "./Slider";
import { Timer } from "./Timer";
import { AnimatedSelect } from "./AnimatedSelect";

interface ScoutingData {
  // Prematch
  scouterInitials: string;
  matchNumber: number;
  robot: string;
  teamNumber: number;
  startingPosition: string;
  noShow: boolean;
  cagePosition: string;
  
  // Autonomous
  autoMoved: boolean;
  autoTimer: number;
  autoCoralL1: number;
  autoCoralL2: number;
  autoCoralL3: number;
  autoCoralL4: number;
  autoBargeAlgae: number;
  autoProcessorAlgae: number;
  autoIntentionallyRemovedAlgae: boolean;
  autoFoul: number;
  
  // Teleop
  teleopIntentionallyRemovedAlgae: boolean;
  teleopPickupLocation: string;
  teleopCoralL1: number;
  teleopCoralL2: number;
  teleopCoralL3: number;
  teleopCoralL4: number;
  teleopBargeAlgae: number;
  teleopProcessorAlgae: number;
  teleopCrossedField: boolean;
  teleopWasDefended: boolean;
  teleopTouchedOpposingCage: boolean;
  
  // Endgame
  endPosition: string;
  died: boolean;
  tippedOver: boolean;
  
  // Postmatch
  offenseSkill: number;
  defensiveSkill: number;
  yellowCard: string;
  comments: string;
}

const initialData: ScoutingData = {
  // Prematch
  scouterInitials: "",
  matchNumber: 1,
  robot: "Red 1",
  teamNumber: 0,
  startingPosition: "Left",
  noShow: false,
  cagePosition: "Left",
  
  // Autonomous
  autoMoved: false,
  autoTimer: 0,
  autoCoralL1: 0,
  autoCoralL2: 0,
  autoCoralL3: 0,
  autoCoralL4: 0,
  autoBargeAlgae: 0,
  autoProcessorAlgae: 0,
  autoIntentionallyRemovedAlgae: false,
  autoFoul: 0,
  
  // Teleop
  teleopIntentionallyRemovedAlgae: false,
  teleopPickupLocation: "Ground",
  teleopCoralL1: 0,
  teleopCoralL2: 0,
  teleopCoralL3: 0,
  teleopCoralL4: 0,
  teleopBargeAlgae: 0,
  teleopProcessorAlgae: 0,
  teleopCrossedField: false,
  teleopWasDefended: false,
  teleopTouchedOpposingCage: false,
  
  // Endgame
  endPosition: "Not Parked",
  died: false,
  tippedOver: false,
  
  // Postmatch
  offenseSkill: 3,
  defensiveSkill: 3,
  yellowCard: "No Card",
  comments: "",
};

export function ScoutingForm() {
  const [data, setData] = useState<ScoutingData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitData = useMutation(api.scouting.submitScoutingData);

  const updateData = (field: keyof ScoutingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!data.scouterInitials.trim()) {
      toast.error("Please enter scouter initials");
      return;
    }
    if (data.teamNumber <= 0) {
      toast.error("Please enter a valid team number");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitData(data);
      toast.success("Scouting data submitted successfully!");
      setData(initialData);
    } catch (error) {
      toast.error("Failed to submit data. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setData(initialData);
    toast.info("Form reset");
  };

  return (
    <div className="space-y-4">
      {/* Prematch Section */}
      <CollapsibleSection title="PREMATCH" defaultOpen>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Fields marked with <span className="text-red-500">*</span> are required
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Scouter Initials <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.scouterInitials}
              onChange={(e) => updateData("scouterInitials", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="ABC"
            />
          </div>
          
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Match Number
            </label>
            <input
              type="number"
              value={data.matchNumber}
              onChange={(e) => updateData("matchNumber", parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              min="1"
            />
          </div>
          
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Robot
            </label>
            <AnimatedSelect
              value={data.robot}
              onChange={(value) => updateData("robot", value)}
              options={[
                { value: "Red 1", label: "Red 1" },
                { value: "Red 2", label: "Red 2" },
                { value: "Red 3", label: "Red 3" },
                { value: "Blue 1", label: "Blue 1" },
                { value: "Blue 2", label: "Blue 2" },
                { value: "Blue 3", label: "Blue 3" }
              ]}
            />
          </div>
          
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Team Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={data.teamNumber || ""}
              onChange={(e) => updateData("teamNumber", parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="1234"
            />
          </div>
          
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Starting Position
            </label>
            <AnimatedSelect
              value={data.startingPosition}
              onChange={(value) => updateData("startingPosition", value)}
              options={[
                { value: "Left", label: "Left" },
                { value: "Center", label: "Center" },
                { value: "Right", label: "Right" }
              ]}
            />
          </div>
          
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cage Position
            </label>
            <AnimatedSelect
              value={data.cagePosition}
              onChange={(value) => updateData("cagePosition", value)}
              options={[
                { value: "Left", label: "Left" },
                { value: "Center", label: "Center" },
                { value: "Right", label: "Right" }
              ]}
            />
          </div>
        </div>
        
        <div className="mt-6">
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg flex items-center justify-center">
            <Toggle
              label="No Show"
              value={data.noShow}
              onChange={(value) => updateData("noShow", value)}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Autonomous Section */}
      <CollapsibleSection title="AUTONOMOUS">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg flex items-center justify-center">
              <Toggle
                label="Moved?"
                value={data.autoMoved}
                onChange={(value) => updateData("autoMoved", value)}
              />
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <Timer
                label="Timer"
                value={data.autoTimer}
                onChange={(value) => updateData("autoTimer", value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <Counter
                label="Coral L1"
                value={data.autoCoralL1}
                onChange={(value) => updateData("autoCoralL1", value)}
              />
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <Counter
                label="Coral L2"
                value={data.autoCoralL2}
                onChange={(value) => updateData("autoCoralL2", value)}
              />
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <Counter
                label="Coral L3"
                value={data.autoCoralL3}
                onChange={(value) => updateData("autoCoralL3", value)}
              />
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <Counter
                label="Coral L4"
                value={data.autoCoralL4}
                onChange={(value) => updateData("autoCoralL4", value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <Counter
                label="Barge Algae"
                value={data.autoBargeAlgae}
                onChange={(value) => updateData("autoBargeAlgae", value)}
              />
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <Counter
                label="Processor Algae"
                value={data.autoProcessorAlgae}
                onChange={(value) => updateData("autoProcessorAlgae", value)}
              />
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <Counter
                label="Auto Foul"
                value={data.autoFoul}
                onChange={(value) => updateData("autoFoul", value)}
              />
            </div>
          </div>
          
          <Toggle
            label="Intentionally Removed Algae?"
            value={data.autoIntentionallyRemovedAlgae}
            onChange={(value) => updateData("autoIntentionallyRemovedAlgae", value)}
          />
        </div>
      </CollapsibleSection>

      {/* Teleop Section */}
      <CollapsibleSection title="TELEOP">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <Toggle
              label="Intentionally Removed Algae?"
              value={data.teleopIntentionallyRemovedAlgae}
              onChange={(value) => updateData("teleopIntentionallyRemovedAlgae", value)}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pickup Location
              </label>
              <AnimatedSelect
                value={data.teleopPickupLocation}
                onChange={(value) => updateData("teleopPickupLocation", value)}
                options={[
                  { value: "Ground", label: "Ground" },
                  { value: "Station", label: "Station" },
                  { value: "Barge", label: "Barge" }
                ]}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <Counter
                label="Coral L1"
                value={data.teleopCoralL1}
                onChange={(value) => updateData("teleopCoralL1", value)}
              />
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <Counter
                label="Coral L2"
                value={data.teleopCoralL2}
                onChange={(value) => updateData("teleopCoralL2", value)}
              />
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <Counter
                label="Coral L3"
                value={data.teleopCoralL3}
                onChange={(value) => updateData("teleopCoralL3", value)}
              />
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <Counter
                label="Coral L4"
                value={data.teleopCoralL4}
                onChange={(value) => updateData("teleopCoralL4", value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Counter
              label="Barge Algae"
              value={data.teleopBargeAlgae}
              onChange={(value) => updateData("teleopBargeAlgae", value)}
            />
            <Counter
              label="Processor Algae"
              value={data.teleopProcessorAlgae}
              onChange={(value) => updateData("teleopProcessorAlgae", value)}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg flex items-center justify-center">
              <Toggle
                label="Crossed Field/Played Defense?"
                value={data.teleopCrossedField}
                onChange={(value) => updateData("teleopCrossedField", value)}
              />
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg flex items-center justify-center">
              <Toggle
                label="Was Robot Defended?"
                value={data.teleopWasDefended}
                onChange={(value) => updateData("teleopWasDefended", value)}
              />
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg flex items-center justify-center">
              <Toggle
                label="Touched Opposing Cage?"
                value={data.teleopTouchedOpposingCage}
                onChange={(value) => updateData("teleopTouchedOpposingCage", value)}
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Endgame Section */}
      <CollapsibleSection title="ENDGAME">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Position
            </label>
            <select
              value={data.endPosition}
              onChange={(e) => updateData("endPosition", e.target.value)}
              className="w-full max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="Not Parked">Not Parked</option>
              <option value="Parked">Parked</option>
              <option value="Climbed">Climbed</option>
            </select>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Toggle
              label="Died?"
              value={data.died}
              onChange={(value) => updateData("died", value)}
            />
            <Toggle
              label="Tipped/Fell Over?"
              value={data.tippedOver}
              onChange={(value) => updateData("tippedOver", value)}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Postmatch Section */}
      <CollapsibleSection title="POSTMATCH">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Slider
              label="Offense Skill"
              value={data.offenseSkill}
              onChange={(value) => updateData("offenseSkill", value)}
              min={0}
              max={5}
            />
            <Slider
              label="Defensive Skill"
              value={data.defensiveSkill}
              onChange={(value) => updateData("defensiveSkill", value)}
              min={0}
              max={5}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Yellow Card
            </label>
            <select
              value={data.yellowCard}
              onChange={(e) => updateData("yellowCard", e.target.value)}
              className="w-full max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="No Card">No Card</option>
              <option value="Yellow Card">Yellow Card</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Comments
            </label>
            <textarea
              value={data.comments}
              onChange={(e) => updateData("comments", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Additional notes about the match..."
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Commit"}
        </button>
        <button
          onClick={handleReset}
          disabled={isSubmitting}
          className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          Reset Form
        </button>
      </div>
    </div>
  );
}
