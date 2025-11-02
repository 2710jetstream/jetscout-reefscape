import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  scoutingData: defineTable({
    // Prematch
    scouterInitials: v.string(),
    matchNumber: v.number(),
    robot: v.string(), // "Red 1", "Red 2", etc.
    teamNumber: v.number(),
    startingPosition: v.string(),
    noShow: v.boolean(),
    cagePosition: v.string(),
    
    // Autonomous
    autoMoved: v.boolean(),
    autoTimer: v.number(), // in seconds
    autoCoralL1: v.number(),
    autoCoralL2: v.number(),
    autoCoralL3: v.number(),
    autoCoralL4: v.number(),
    autoBargeAlgae: v.number(),
    autoProcessorAlgae: v.number(),
    autoIntentionallyRemovedAlgae: v.boolean(),
    autoFoul: v.number(),
    
    // Teleop
    teleopIntentionallyRemovedAlgae: v.boolean(),
    teleopPickupLocation: v.string(),
    teleopCoralL1: v.number(),
    teleopCoralL2: v.number(),
    teleopCoralL3: v.number(),
    teleopCoralL4: v.number(),
    teleopBargeAlgae: v.number(),
    teleopProcessorAlgae: v.number(),
    teleopCrossedField: v.boolean(),
    teleopWasDefended: v.boolean(),
    teleopTouchedOpposingCage: v.boolean(),
    
    // Endgame
    endPosition: v.string(), // "Not Parked", "Parked", "Climbed"
    died: v.boolean(),
    tippedOver: v.boolean(),
    
    // Postmatch
    offenseSkill: v.number(), // 0-5
    defensiveSkill: v.number(), // 0-5
    yellowCard: v.string(), // "No Card", "Yellow Card"
    comments: v.string(),
    
    // Metadata
    scouterId: v.id("users"),
  })
    .index("by_match", ["matchNumber"])
    .index("by_team", ["teamNumber"])
    .index("by_scouter", ["scouterId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
