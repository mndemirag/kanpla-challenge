import { getCheapestCombination, getCostPerPortion } from './getCheapestCombination';
import { Bundle, Order, User } from './types';

export function allocatePortions(users: User[], bundles: Bundle[]): Order[] {
  const allocations: Order[] = [];

  for (const user of users) {
    // Filter bundles to only those the user can afford
    const affordableBundles = bundles.filter(bundle => getCostPerPortion(bundle) <= user.maxPricePerPortion);

    // Get the cheapest combination of bundles to satisfy the user's portion need
    const cheapestBundles = getCheapestCombination(user.portions, affordableBundles);

    if (cheapestBundles.length > 0) {
      let totalCost = 0;
      let totalPortions = 0;

      for (const bundle of cheapestBundles) {
        totalCost += bundle.pricePerBundle;
        totalPortions += bundle.portions;

        // Find and update the original bundle in the main bundle list
        const originalBundleIndex = bundles.findIndex(b =>
          b.portions === bundle.portions && b.pricePerBundle === bundle.pricePerBundle
        );
        if (originalBundleIndex !== -1) {
          bundles[originalBundleIndex].portions -= bundle.portions;
        }
      }

      const pricePerPortion = totalCost / totalPortions;

      allocations.push({
        userId: user.id,
        portions: totalPortions,
        pricePerPortion
      });
    }
  }
  return allocations;
}
