export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-6">
          Coming Soon
        </p>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
          Discussioned
        </h1>

        <p className="mt-8 text-2xl md:text-3xl font-light">
          Every sentence deserves a discussion.
        </p>

        <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
          Read, question, highlight, agree, disagree, and build better ideas
          together.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-xl px-5 py-4 w-80 outline-none"
          />

          <button className="bg-black text-white rounded-xl px-8 py-4 hover:bg-gray-800 transition">
            Join Waitlist
          </button>
        </div>
      </div>
    </main>
  );
}