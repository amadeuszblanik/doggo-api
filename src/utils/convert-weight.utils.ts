import { WeightUnits } from '../types/weight-units.types';

const KG_TO_G = 1000;
const LB_TO_G = 453.59;
const OZ_TO_G = 28.35;

const convertWeightUtils = (value: number, from: WeightUnits, to: WeightUnits = WeightUnits.Gram): number => {
  let valueInG = value;

  switch (from) {
    case WeightUnits.Gram:
      valueInG = value;
      break;
    case WeightUnits.Kilogram:
      valueInG = value * KG_TO_G;
      break;
    case WeightUnits.Pound:
      valueInG = value * LB_TO_G;
      break;
    case WeightUnits.Ounce:
      valueInG = value * OZ_TO_G;
      break;
    default:
      throw new Error('Unknown unit');
  }

  switch (to) {
    case WeightUnits.Gram:
      return valueInG;
    case WeightUnits.Kilogram:
      return valueInG / KG_TO_G;
    case WeightUnits.Pound:
      return valueInG / LB_TO_G;
    case WeightUnits.Ounce:
      return valueInG / OZ_TO_G;
    default:
      throw new Error('Unknown unit');
  }
};

export default convertWeightUtils;
