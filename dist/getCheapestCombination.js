"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCostPerPortion = getCostPerPortion;
exports.getCheapestCombination = getCheapestCombination;
function getCostPerPortion(bundle) {
    return bundle.pricePerBundle / bundle.portions;
}
function getCheapestCombination(totalPortions, bundles) {
    // Sort bundles by cost per portion (ascending)
    const sortedBundles = [...bundles].sort((a, b) => getCostPerPortion(a) - getCostPerPortion(b));
    const result = [];
    let remainingPortions = totalPortions;
    // Iterate through the sorted bundles and allocate portions
    for (const bundle of sortedBundles) {
        if (remainingPortions <= 0)
            break;
        if (bundle.portions <= remainingPortions) {
            result.push(bundle);
            remainingPortions -= bundle.portions;
        }
        else {
            // Allocate only the remaining portions as a partial bundle
            const partialBundle = Object.assign(Object.assign({}, bundle), { portions: remainingPortions });
            result.push(partialBundle);
            remainingPortions = 0;
        }
    }
    console.log(result);
    return result;
}
