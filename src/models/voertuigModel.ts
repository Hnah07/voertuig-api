import mongoose from "mongoose";

const voertuigSchema = new mongoose.Schema(
{
  merk: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  bouwjaar: {
    type: Number,
    required: true,
  },
  prijs: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['auto', 'moto'],
    required: true,
  },
  cilinderinhoud: {
    type: Number,
    required: [function(this: { type: string }) {
      return this.type === 'moto';
    }, 'cilinderinhoud is required when type is moto'],
  }
},
  {
    timestamps: true,
  }
);

export const Voertuig = mongoose.model("Voertuig", voertuigSchema);
