import { categories } from "@/lib/products";

export function getCategoryPathByValue(
  value: number,
): { path: string; label: string } | null {
  for (const category of categories) {
    const sub = category.subcategories.find((s) => s.value === value);
    if (sub) {
      return {
        path: `${category.name} > ${sub.label}`,
        label: sub.label,
      };
    }
  }
  return null;
}
