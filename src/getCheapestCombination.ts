import { Bundle } from "./types";

export function getCostPerPortion(bundle: Bundle): number {
  return bundle.pricePerBundle / bundle.portions;
}

export function getCheapestCombination(totalPortions: number, bundles: Bundle[]): Bundle[] {
  // Sort bundles by cost per portion (ascending)
  const sortedBundles = [...bundles].sort((a, b) => getCostPerPortion(a) - getCostPerPortion(b));
  const result: Bundle[] = [];
  let remainingPortions = totalPortions;

  // Iterate through the sorted bundles and allocate portions
  for (const bundle of sortedBundles) {
    if (remainingPortions <= 0) break;

    if (bundle.portions <= remainingPortions) {
      result.push(bundle);
      remainingPortions -= bundle.portions;
    } else {
      // Allocate only the remaining portions as a partial bundle
      const partialBundle = { ...bundle, portions: remainingPortions };
      result.push(partialBundle);
      remainingPortions = 0;
    }
  }

  return result;
}