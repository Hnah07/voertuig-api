import express from "express";
import {
  addVoertuig,
  getVoertuigen,
  getVoertuigById,
  updateVoertuig,
  deleteVoertuig,
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
 *              merk:
 *                type: string
 *              model:
 *                type: string
 *              bouwjaar:
 *                type: number
 *              prijs:
 *                type: number
 *              type:
 *                type: string
 *              cilinderinhoud:
 *                type: number
 *            required:
 *              - merk
 *              - model
 *              - bouwjaar
 *              - prijs
 *              - type
 *    responses:
 *      '201':
 *        description: Voertuig created successfully
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 * 
 *  get:
 *    summary: Get all voertuigen
 *    tags: [Voertuigen]
 *    responses:
 *      '200':
 *        description: Voertuigen fetched successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Voertuig'
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 * 
 * /voertuig/{id}:
 *  get:
 *    summary: Get a voertuig by id
 *    tags: [Voertuigen]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Voertuig fetched successfully
 *      '404':
 *        description: Voertuig not found
 *      '500':
 *        description: Internal server error
 * 
 *  put:
 *    summary: Update a voertuig by id
 *    tags: [Voertuigen]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              merk:
 *                type: string
 *              model:
 *                type: string
 *              bouwjaar:
 *                type: number
 *              prijs:
 *                type: number
 *              type:
 *                type: string
 *              cilinderinhoud:
 *                type: number
 *            required:
 *              - merk
 *              - model
 *              - bouwjaar
 *              - prijs
 *              - type
 *    responses:
 *      '200':
 *        description: Voertuig updated successfully
 *      '404':
 *        description: Voertuig not found
 *      '500':
 *        description: Internal server error
 * 
 *  delete:
 *    summary: Delete a voertuig by id
 *    tags: [Voertuigen]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
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
  .get("/voertuigen", getVoertuigen)
  .get("/voertuig/:id", getVoertuigById)
  .put("/voertuig/:id", updateVoertuig)
  .delete("/voertuig/:id", deleteVoertuig);

export default router;

