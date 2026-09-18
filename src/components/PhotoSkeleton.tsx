export function PhotoSkeleton() {
  return (
    <div className="mb-4 animate-pulse">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      </div>
    </div>
  );
}