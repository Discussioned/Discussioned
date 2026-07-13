"use client";

import { FormEvent, useMemo, useState } from "react";

type Topic = {
  id: number;
  title: string;
  category: string;
  type: string;
  prompt: string;
  excerpt: string;
  replies: number;
  sources: number;
  active: number;
  reactions: { agree: number; disagree: number; interesting: number; source: number };
  color: string;
};

const seedTopics: Topic[] = [
  {
    id: 1,
    title: "Olaplex No. 7 Bonding Oil",
    category: "Beauty",
    type: "Product",
    prompt: "Is it genuinely repairing hair, or mostly a well-marketed finishing oil?",
    excerpt: "Hairdressers, ingredient-focused users and long-term customers are comparing results across different hair types.",
    replies: 486,
    sources: 31,
    active: 42,
    reactions: { agree: 164, disagree: 73, interesting: 219, source: 28 },
    color: "#f4d8cc",
  },
  {
    id: 2,
    title: "Artificial intelligence and entry-level work",
    category: "Technology",
    type: "Idea",
    prompt: "Will AI remove the first rung of the career ladder before it creates a new one?",
    excerpt: "Employers, recent graduates, researchers and workers are challenging assumptions about productivity and opportunity.",
    replies: 1284,
    sources: 87,
    active: 119,
    reactions: { agree: 302, disagree: 244, interesting: 611, source: 95 },
    color: "#d8e3ef",
  },
  {
    id: 3,
    title: "Istanbul",
    category: "Places",
    type: "City",
    prompt: "Is Istanbul still a good city for young professionals who want culture, community and affordability?",
    excerpt: "Residents, returnees, visitors and remote workers are discussing daily life beyond tourism.",
    replies: 734,
    sources: 22,
    active: 58,
    reactions: { agree: 188, disagree: 92, interesting: 340, source: 18 },
    color: "#dce7cf",
  },
  {
    id: 4,
    title: "The Prestige",
    category: "Film",
    type: "Movie",
    prompt: "Which interpretation of the ending best explains what the film is actually saying about obsession?",
    excerpt: "A spoiler-heavy discussion covering the final reveal, unreliable narration and repeated visual clues.",
    replies: 922,
    sources: 14,
    active: 35,
    reactions: { agree: 281, disagree: 86, interesting: 507, source: 6 },
    color: "#e7d8c7",
  },
  {
    id: 5,
    title: "Canada's immigration system",
    category: "Policy",
    type: "Country",
    prompt: "Can the system remain economically useful while becoming more predictable and humane?",
    excerpt: "Applicants, employers, lawyers and residents are separating official policy from personal experience.",
    replies: 2103,
    sources: 146,
    active: 208,
    reactions: { agree: 434, disagree: 391, interesting: 908, source: 187 },
    color: "#ead7d7",
  },
  {
    id: 6,
    title: "Independent cafés staying open late",
    category: "Local",
    type: "Business",
    prompt: "Would later hours create sustainable demand, or only increase labour costs?",
    excerpt: "Students, café owners, workers and neighbours are comparing what would make late-night local spaces viable.",
    replies: 218,
    sources: 9,
    active: 17,
    reactions: { agree: 104, disagree: 31, interesting: 96, source: 7 },
    color: "#d9e5df",
  },
];

const categories = ["All", "Products", "Technology", "Places", "Film", "Policy", "Local"];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Trending");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [topics, setTopics] = useState(seedTopics);
  const [selected, setSelected] = useState<Topic | null>(null);
  const [showPost, setShowPost] = useState(false);
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return topics.filter((topic) => {
      const categoryMatch = category === "All" || topic.category === category || topic.type === category.slice(0, -1);
      const queryMatch = !q || `${topic.title} ${topic.prompt} ${topic.excerpt} ${topic.category}`.toLowerCase().includes(q);
      return categoryMatch && queryMatch;
    });
  }, [topics, category, query]);

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  function submitTopic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") || "").trim();
    const prompt = String(form.get("prompt") || "").trim();
    const categoryValue = String(form.get("category") || "Ideas");
    if (!title || !prompt) return;
    const newTopic: Topic = {
      id: Date.now(), title, prompt, category: categoryValue, type: "Topic",
      excerpt: "A newly opened public discussion. Add context, experience, evidence or a different perspective.",
      replies: 0, sources: 0, active: 1,
      reactions: { agree: 0, disagree: 0, interesting: 0, source: 0 },
      color: "#ece7db",
    };
    setTopics((current) => [newTopic, ...current]);
    setShowPost(false);
    flash("Your discussion is now live anonymously.");
  }

  return (
    <main className="min-h-screen">
      <header className="header-blur sticky top-0 z-40 border-b border-[#dedbd5]">
        <div className="shell flex h-16 items-center justify-between gap-5">
          <button className="text-xl font-semibold tracking-[-0.04em]" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Discussioned</button>
          <nav className="desktop-nav flex items-center gap-6 text-sm text-[#5f5f5f]">
            {["Home", "Trending", "Latest", "About"].map((item) => (
              <button key={item} className="transition hover:text-black" onClick={() => item === "About" ? document.getElementById("about")?.scrollIntoView() : setActiveTab(item === "Home" ? "Trending" : item)}>{item}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button className="hidden rounded-full px-4 py-2 text-sm sm:block" onClick={() => flash("Accounts are optional. Public participation stays anonymous.")}>Sign in</button>
            <button className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:scale-[1.02]" onClick={() => setShowPost(true)}>Post a discussion</button>
          </div>
        </div>
      </header>

      <section className="shell pb-12 pt-16 md:pb-16 md:pt-24">
        <div className="max-w-5xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.22em] text-[#777]">The public discussion database</p>
          <h1 className="display max-w-5xl text-5xl font-semibold leading-[0.98] md:text-7xl lg:text-[88px]">Find the complete conversation behind anything.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#5d5d5d] md:text-xl">Every product, movie, place, business, technology, claim and idea — with opposing perspectives, experience, questions and evidence organized in one place.</p>
        </div>

        <div className="mt-10 max-w-4xl rounded-2xl border border-[#d8d4cd] bg-white p-2 card-shadow">
          <div className="flex items-center gap-3 px-3">
            <span aria-hidden className="text-xl">⌕</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="h-14 min-w-0 flex-1 bg-transparent text-base outline-none md:text-lg" placeholder="Search a product, movie, person, place, business, claim or idea..." />
            {query && <button onClick={() => setQuery("")} className="rounded-full px-3 py-2 text-sm text-[#666] hover:bg-[#f2f0eb]">Clear</button>}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-sm text-[#656565]">
          <span>Try:</span>{["Olaplex", "Istanbul", "The Prestige", "AI jobs"].map((term) => <button key={term} onClick={() => setQuery(term)} className="underline decoration-[#b8b3aa] underline-offset-4 hover:text-black">{term}</button>)}
        </div>
      </section>

      <section className="border-y border-[#dedbd5] bg-[#efede7]">
        <div className="shell py-5">
          <div className="grid gap-4 text-sm md:grid-cols-3">
            <div><strong>Anonymous in public.</strong><span className="text-[#666]"> Ideas are judged before identities.</span></div>
            <div><strong>Complete, not one-sided.</strong><span className="text-[#666]"> Find agreement, criticism and evidence.</span></div>
            <div><strong>Relationships stay private.</strong><span className="text-[#666]"> Connect only when both people choose.</span></div>
          </div>
        </div>
      </section>

      <section className="shell py-12 md:py-16">
        <div className="flex flex-col justify-between gap-5 border-b border-[#d8d4cd] pb-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-[#777]">Explore</p>
            <h2 className="display mt-2 text-4xl font-semibold md:text-5xl">Conversations people are opening now</h2>
          </div>
          <div className="flex gap-1 rounded-full border border-[#d8d4cd] bg-white p-1">
            {["Trending", "Latest", "Most replied"].map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-full px-4 py-2 text-sm transition ${activeTab === tab ? "bg-black text-white" : "text-[#666] hover:text-black"}`}>{tab}</button>)}
          </div>
        </div>

        <div className="my-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${category === item ? "bg-[#ff5b3d] text-white" : "tag text-[#555] hover:border-black"}`}>{item}</button>)}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((topic, index) => (
            <article key={topic.id} className="fade-in group rounded-3xl border border-[#d8d4cd] bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl" style={{ animationDelay: `${index * 45}ms` }}>
              <button onClick={() => setSelected(topic)} className="w-full text-left">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.13em] text-[#656565]"><span className="h-3 w-3 rounded-full" style={{ background: topic.color }} />{topic.type} · {topic.category}</div>
                  {topic.active > 10 && <span className="rounded-full bg-[#f0f8ec] px-3 py-1 text-xs text-[#3f6736]">{topic.active} here now</span>}
                </div>
                <h3 className="text-2xl font-semibold leading-tight tracking-[-0.035em] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{topic.title}</h3>
                <p className="mt-4 text-lg leading-7">{topic.prompt}</p>
                <p className="mt-3 text-sm leading-6 text-[#696969]">{topic.excerpt}</p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#ece9e3] pt-4 text-sm text-[#666]"><span><strong className="text-black">{topic.replies}</strong> replies</span><span><strong className="text-black">{topic.sources}</strong> sources</span><span><strong className="text-black">{topic.reactions.interesting}</strong> interesting</span><span className="ml-auto text-black">Open →</span></div>
              </button>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <div className="rounded-3xl border border-dashed border-[#bdb8af] p-12 text-center"><h3 className="text-2xl font-semibold">No complete discussion exists yet.</h3><p className="mt-2 text-[#666]">Be the person who opens it.</p><button onClick={() => setShowPost(true)} className="mt-6 rounded-full bg-black px-5 py-3 text-white">Start this discussion</button></div>}
      </section>

      <section id="about" className="bg-black text-white">
        <div className="shell grid gap-12 py-16 md:grid-cols-[1.2fr_.8fr] md:py-24">
          <div><p className="text-sm uppercase tracking-[0.2em] text-[#aaa]">Why Discussioned</p><h2 className="display mt-4 text-5xl font-semibold leading-none md:text-6xl">The internet has information everywhere. The full conversation is nowhere.</h2></div>
          <div className="space-y-7 text-lg leading-8 text-[#c8c8c8]"><p>Discussioned gives every subject a permanent home for questions, experiences, criticism, evidence and opposing views.</p><p>Everyone appears as <strong className="text-white">Anonymous</strong> in public. There are no public follower counts, popularity profiles or searchable posting histories.</p><p>When a contribution matters to you, you may privately request a connection. The other person decides whether the relationship continues.</p></div>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="rounded-[36px] border border-[#d8d4cd] bg-white p-8 md:p-14 card-shadow">
          <div className="grid gap-10 md:grid-cols-[1fr_.8fr] md:items-center">
            <div><p className="text-sm uppercase tracking-[0.2em] text-[#777]">Open the first conversation</p><h2 className="display mt-3 text-4xl font-semibold md:text-6xl">What deserves to be Discussioned?</h2><p className="mt-5 max-w-xl text-lg leading-8 text-[#666]">A product nobody reviews honestly. A movie everyone interprets differently. A city people misunderstand. A claim that needs evidence.</p></div>
            <div className="flex flex-col gap-3"><button onClick={() => setShowPost(true)} className="rounded-2xl bg-[#ff5b3d] px-6 py-5 text-lg font-medium text-white transition hover:brightness-95">Post a discussion anonymously</button><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="rounded-2xl border border-[#d8d4cd] px-6 py-5 text-lg">Search first</button></div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#d8d4cd]">
        <div className="shell flex flex-col gap-5 py-8 text-sm text-[#666] md:flex-row md:items-center md:justify-between"><strong className="text-black">Discussioned</strong><div className="flex flex-wrap gap-5"><a href="#about">About</a><button onClick={() => flash("Community guidelines page is prepared for the full launch.")}>Guidelines</button><button onClick={() => flash("Privacy controls are built around public anonymity.")}>Privacy</button><a href="mailto:hello@discussioned.com">Contact</a></div><span>© 2026 Discussioned</span></div>
      </footer>

      {showPost && <Modal title="Post a discussion" onClose={() => setShowPost(false)}><form onSubmit={submitTopic} className="space-y-5"><p className="text-sm leading-6 text-[#666]">Your identity will not appear publicly. The subject and question should be clear enough for people with different perspectives to contribute.</p><label className="block"><span className="mb-2 block text-sm font-medium">Subject</span><input name="title" required className="w-full rounded-xl border border-[#ccc7be] px-4 py-3 outline-none focus:border-black" placeholder="Example: Olaplex No. 7 Bonding Oil" /></label><label className="block"><span className="mb-2 block text-sm font-medium">The question or tension</span><textarea name="prompt" required rows={4} className="w-full resize-none rounded-xl border border-[#ccc7be] px-4 py-3 outline-none focus:border-black" placeholder="What should people actually discuss about it?" /></label><label className="block"><span className="mb-2 block text-sm font-medium">Category</span><select name="category" className="w-full rounded-xl border border-[#ccc7be] bg-white px-4 py-3"><option>Products</option><option>Technology</option><option>Places</option><option>Film</option><option>Policy</option><option>Local</option><option>Ideas</option></select></label><button className="w-full rounded-xl bg-black px-5 py-4 font-medium text-white">Publish anonymously</button></form></Modal>}

      {selected && <DiscussionModal topic={selected} onClose={() => setSelected(null)} onFlash={flash} />}
      {toast && <div className="fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 rounded-full bg-black px-5 py-3 text-sm text-white shadow-xl">{toast}</div>}
    </main>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 md:items-center md:p-6" onMouseDown={onClose}><div className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-[#f7f5f0] p-6 md:max-w-2xl md:rounded-3xl md:p-8" onMouseDown={(e) => e.stopPropagation()}><div className="mb-6 flex items-center justify-between"><h2 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h2><button onClick={onClose} className="rounded-full border border-[#d8d4cd] px-3 py-1.5">Close</button></div>{children}</div></div>;
}

function DiscussionModal({ topic, onClose, onFlash }: { topic: Topic; onClose: () => void; onFlash: (message: string) => void }) {
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([
    "The strongest argument here depends on what outcome we are measuring, not only the immediate impression.",
    "I had the opposite experience. The missing context is how differently this works across people and situations.",
    "Does anyone have a reliable source for the central claim? Personal experience is useful, but it cannot answer everything.",
  ]);
  function addReply(e: FormEvent) { e.preventDefault(); if (!reply.trim()) return; setReplies((r) => [reply.trim(), ...r]); setReply(""); onFlash("Reply added as Anonymous."); }
  return <Modal title={topic.title} onClose={onClose}><div className="rounded-2xl border border-[#d8d4cd] bg-white p-5"><div className="text-xs uppercase tracking-[0.15em] text-[#777]">{topic.type} · {topic.category}</div><h3 className="mt-3 text-2xl font-semibold leading-tight">{topic.prompt}</h3><p className="mt-4 leading-7 text-[#666]">{topic.excerpt}</p><div className="mt-5 flex flex-wrap gap-2"><Reaction label="Agree" count={topic.reactions.agree} onClick={() => onFlash("Reaction recorded anonymously.")} /><Reaction label="Disagree" count={topic.reactions.disagree} onClick={() => onFlash("Reaction recorded anonymously.")} /><Reaction label="Interesting" count={topic.reactions.interesting} onClick={() => onFlash("Reaction recorded anonymously.")} /><Reaction label="Needs source" count={topic.reactions.source} onClick={() => onFlash("Source request recorded.")} /></div></div><form onSubmit={addReply} className="mt-5 rounded-2xl border border-[#d8d4cd] bg-white p-4"><div className="mb-3 text-sm font-medium">Reply as Anonymous</div><textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={3} className="w-full resize-none rounded-xl bg-[#f4f2ed] p-4 outline-none" placeholder="Add experience, evidence, a question or an opposing perspective..." /><div className="mt-3 flex justify-end"><button className="rounded-full bg-black px-5 py-2.5 text-sm text-white">Reply</button></div></form><div className="mt-7 space-y-3"><h4 className="font-semibold">Discussion</h4>{replies.map((text, i) => <div key={`${text}-${i}`} className="rounded-2xl border border-[#d8d4cd] bg-white p-5"><div className="flex items-center justify-between text-sm"><strong>Anonymous</strong><button onClick={() => onFlash("Private connection request sent. Their public activity remains hidden.")} className="text-[#666] underline underline-offset-4">Request private connection</button></div><p className="mt-3 leading-7 text-[#333]">{text}</p><div className="mt-4 flex gap-4 text-xs text-[#777]"><button onClick={() => onFlash("Marked helpful.")}>Helpful</button><button onClick={() => onFlash("Reply box opened for this contribution.")}>Reply</button><button onClick={() => onFlash("Source request sent.")}>Needs source</button></div></div>)}</div></Modal>;
}

function Reaction({ label, count, onClick }: { label: string; count: number; onClick: () => void }) {
  return <button onClick={onClick} className="rounded-full border border-[#d8d4cd] px-3 py-2 text-sm transition hover:border-black">{label} <span className="text-[#777]">{count}</span></button>;
}
