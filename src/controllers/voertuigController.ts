import { Request, Response } from "express";
import { Voertuig } from "../models/voertuigModel";
import { Error as MongooseError } from "mongoose";
import { get } from "http";
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

function getMotoRijbewijs(voertuig: any) {
  if (voertuig.type === "moto" && voertuig.cilinderinhoud) {
    if (voertuig.cilinderinhoud <= 125) voertuig.rijbewijs = "A1";
    else if (voertuig.cilinderinhoud > 125 && voertuig.cilinderinhoud <= 500) voertuig.rijbewijs = "A2";
    else voertuig.rijbewijs = "A";
  }
  return voertuig;
}

export const getVoertuigen = async (req: Request, res: Response) => {
  try {
    const { type, minPrijs, maxPrijs, page = 1, limit = 5 } = req.query;

    let filter: any = {};

    if (type) filter.type = type;
    
    if (minPrijs || maxPrijs) {
      filter["prijs"] = {}; 
      if (minPrijs) filter["prijs"].$gte = parseInt(minPrijs as string);
      if (maxPrijs) filter["prijs"].$lte = parseInt(maxPrijs as string);
    }

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;

    const voertuigen = await Voertuig.find(filter).skip(skip).limit(limitNumber).lean();
    const total = await Voertuig.countDocuments(filter);

    voertuigen.forEach((voertuig: any) => {
      getMotoRijbewijs(voertuig);
    });

    res.status(200).json({
      total,
      page: pageNumber,
      limit: limitNumber,
      results: voertuigen
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getVoertuigById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const voertuig = await Voertuig.findById(id);

    if (!voertuig) {
      return res.status(404).json({ message: "Voertuig niet gevonden" });
    }

    let motoRijbewijs: any = voertuig.toObject();

    getMotoRijbewijs(motoRijbewijs);

    res.status(200).json(motoRijbewijs);
  } catch (err) {
    res.status(500).json({ message: "Er is iets misgegaan", error: err });
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