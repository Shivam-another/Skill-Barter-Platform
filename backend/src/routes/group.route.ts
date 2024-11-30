import express from "express";
import { addMembers, createGroup, deleteGroup, getMembersInAGroup, getSpecificGroupDetails, groupJoinedbyAuthenticatedUser, groupsCreatedByAuthenticatedUser, removeMembers } from "../controllers/group.controller.js";

const router = express.Router()

router.get("/groups/:groupId", getSpecificGroupDetails)
router.get("/groups/:groupId/members", getMembersInAGroup)
router.get("/groups/:groupId/messages", getMembersInAGroup)

router.get("/groupsJoinedbyAuthenticatedUser", groupJoinedbyAuthenticatedUser)
router.get("/groupsCreatedByAuthenticatedUser", groupsCreatedByAuthenticatedUser)

router.post("/createGroup", createGroup)
router.post("/addMembers", addMembers)
router.post("/removeMembers", removeMembers)

router.delete("/deleteGroup", deleteGroup)

export default router;
