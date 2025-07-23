import { StarRating } from "@/components/ui/star-rating";

export function Demo() {
  return (
    <div className="flex items-center justify-center h-full">
      <StarRating value={3} readonly />
    </div>
  );
}
