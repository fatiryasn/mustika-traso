// app/artikel/loading.tsx
export default function ArtikelLoading() {
  return (
    <div className="bg-background min-h-screen pb-16 pt-4 animate-pulse">
      {/* Banner skeleton – matches dark banner */}
      <div className="max-w-[100rem] mx-auto relative bg-darkslate text-white overflow-hidden mb-12 p-8 md:p-16 lg:p-20 rounded">
        {/* Background pattern placeholder */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Angled accent placeholder */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-navy/20 -skew-x-12 transform origin-top-right" />

        <div className="relative max-w-7xl z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-cyan-500 rounded-full" />
                <div className="h-3 bg-cyan-400/30 w-28 rounded" />
              </div>
              <div className="h-8 sm:h-10 lg:h-12 bg-white/20 w-3/4 rounded" />
              <div className="h-4 bg-white/20 w-2/3 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Article grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border overflow-hidden">
              <div className="aspect-video bg-gray-200" />
              <div className="p-6 space-y-3">
                <div className="h-3 bg-gray-200 w-28 rounded" />
                <div className="h-5 bg-gray-200 w-3/4 rounded" />
                <div className="h-4 bg-gray-200 w-full rounded" />
                <div className="h-4 bg-gray-200 w-5/6 rounded" />
                <div className="pt-5 mt-5 border-t border-gray-200 flex justify-between">
                  <div className="h-3 bg-gray-200 w-1/3 rounded" />
                  <div className="h-3 bg-gray-200 w-1/4 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
