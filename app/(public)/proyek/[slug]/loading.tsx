// app/proyek/[slug]/loading.tsx
export default function ProjectDetailLoading() {
  return (
    <div className="bg-background min-h-screen py-12 animate-pulse">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-4 bg-gray-200 w-32 mb-8" />
        <div className="bg-white border border-bordergray overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-2 aspect-[3/4] bg-gray-200" />
            <div className="lg:col-span-3 p-6 md:p-10 space-y-4">
              <div className="h-6 bg-gray-200 w-3/4" />
              <div className="h-4 bg-gray-200 w-1/2" />
              <div className="h-4 bg-gray-200 w-full" />
              <div className="h-4 bg-gray-200 w-5/6" />
              <div className="h-4 bg-gray-200 w-4/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
