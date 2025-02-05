import { Request, Response } from "express";
import { Voertuig } from "../models/voertuigModel";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

export const addVoertuig = async (req: Request, res: Response) => {
  try {
    const { merk, model, bouwjaar, prijs, type, cilinderinhoud } = req.body;
    const voertuig = await Voertuig.create({ merk, model, bouwjaar, prijs, type, cilinderinhoud });
    res.status(201).json(voertuig);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const getVoertuigen = async (req: Request, res: Response) => {
  try {
    const { merk, bouwjaar } = req.query;
    let query: any = {};
    if (merk) {
      query.merk = merk;
    }
    if (bouwjaar) {
      query.bouwjaar = parseInt(bouwjaar as string);
    }
    const voertuigen = await Voertuig.find(query);
    res.status(200).json(voertuigen);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateVoertuig = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { merk, model, bouwjaar, prijs, type, cilinderinhoud } = req.body;
    const voertuig = await Voertuig.findByIdAndUpdate(
      id,
      { merk, model, bouwjaar, prijs, type, cilinderinhoud },
      { new: true }
    );
    res.status(200).json(voertuig);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteVoertuig = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const voertuig = await Voertuig.findByIdAndDelete(id);
    res.status(200).json(voertuig);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};