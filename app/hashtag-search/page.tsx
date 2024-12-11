import { HashtagSearch } from '@/components/HashtagSearch';

export default function HashtagSearchPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Instagram Hashtag Search
        </h1>
        <HashtagSearch />
      </div>
    </main>
  );
}
