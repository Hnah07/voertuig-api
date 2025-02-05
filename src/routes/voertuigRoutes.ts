import express from "express";
import {
  addVoertuig,
  getVoertuigen
} from "../controllers/voertuigController";

const router = express.Router();

/**
 * @swagger 
 * /voertuig:
 *  post:
 *    summary: Create a new voertuig
 *    tags: [Voertuigen]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              naam:
 *                type: string
 *              merk:
 *                type: string
 *              type:
 *                type: string
 *              kleur:
 *                type: string
 *              prijs:
 *                type: number
 *              beschrijving:
 *                type: string
 *            required:
 *              - naam
 *              - merk
 *              - type
 *              - kleur
 *              - prijs
 *              - beschrijving
 *    responses:
 *      '201':
 *        description: Voertuig created successfully
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 * 
 * /voertuig:
 *  get:
 *    summary: Get all voertuigen
 *    tags: [Voertuigen]
 *    responses:
 *      '200':
 *        description: Voertuigen fetched successfully
 *      '500':
 *        description: Internal server error
 * 
 * /voertuig/:id:
 *  get:
 *    summary: Get a voertuig by id
 *    tags: [Voertuigen]
 *    responses:
 *      '200':
 *        description: Voertuig fetched successfully
 *      '404':
 *        description: Voertuig not found
 *      '500':
 *        description: Internal server error
 * 
 * /voertuig/:id:
 *  put:
 *    summary: Update a voertuig by id
 *    tags: [Voertuigen]
 *    responses:
 *      '200':
 *        description: Voertuig updated successfully
 *      '404':
 *        description: Voertuig not found
 *      '500':
 *        description: Internal server error
 * 
 * /voertuig/:id:
 *  delete:
 *    summary: Delete a voertuig by id
 *    tags: [Voertuigen]
 *    responses:
 *      '200':
 *        description: Voertuig deleted successfully
 *      '404':
 *        description: Voertuig not found
 *      '500':
 *        description: Internal server error
 */

router
.post("/voertuig", addVoertuig)
.get("/voertuig", getVoertuigen)
.get("/voertuig/:id", getVoertuigen)
.put("/voertuig/:id", getVoertuigen)
.delete("/voertuig/:id", getVoertuigen);


export default router;
