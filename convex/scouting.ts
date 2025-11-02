import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const submitScoutingData = mutation({
  args: {
    // Prematch
    scouterInitials: v.string(),
    matchNumber: v.number(),
    robot: v.string(),
    teamNumber: v.number(),
    startingPosition: v.string(),
    noShow: v.boolean(),
    cagePosition: v.string(),
    
    // Autonomous
    autoMoved: v.boolean(),
    autoTimer: v.number(),
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
    endPosition: v.string(),
    died: v.boolean(),
    tippedOver: v.boolean(),
    
    // Postmatch
    offenseSkill: v.number(),
    defensiveSkill: v.number(),
    yellowCard: v.string(),
    comments: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to submit scouting data");
    }

    return await ctx.db.insert("scoutingData", {
      ...args,
      scouterId: userId,
    });
  },
});

export const getScoutingData = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("scoutingData")
      .withIndex("by_scouter", (q) => q.eq("scouterId", userId))
      .order("desc")
      .collect();
  },
});

export const getAllScoutingData = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("scoutingData")
      .order("desc")
      .collect();
  },
});

export const getMatchData = query({
  args: { matchNumber: v.number() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("scoutingData")
      .withIndex("by_match", (q) => q.eq("matchNumber", args.matchNumber))
      .collect();
  },
});

export const getTeamData = query({
  args: { teamNumber: v.number() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("scoutingData")
      .withIndex("by_team", (q) => q.eq("teamNumber", args.teamNumber))
      .collect();
  },
});
