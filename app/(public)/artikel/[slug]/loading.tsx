// app/artikel/[slug]/loading.tsx
export default function ArtikelDetailLoading() {
  return (
    <div className="bg-background min-h-screen py-12 animate-pulse">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-4 bg-gray-200 w-32 mb-6" />
        <div className="aspect-video w-full bg-gray-200 mb-8" />
        <div className="flex gap-4 mb-6">
          <div className="h-3 bg-gray-200 w-24" />
          <div className="h-3 bg-gray-200 w-32" />
        </div>
        <div className="h-6 bg-gray-200 w-3/4 mb-8" />
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 w-full" />
          <div className="h-4 bg-gray-200 w-5/6" />
          <div className="h-4 bg-gray-200 w-4/6" />
        </div>
      </div>
    </div>
  );
}
