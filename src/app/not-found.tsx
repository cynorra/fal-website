import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto py-24 text-center space-y-6">
      <p className="text-xs font-mono uppercase tracking-widest text-purple-300">Error 404</p>
      <h1 className="text-4xl font-serif font-black text-white">This path has faded into the void</h1>
      <p className="text-sm text-white/60">
        The page you are looking for does not exist or has moved. Try one of our guides instead.
      </p>
      <div className="flex flex-wrap justify-center gap-3 text-sm">
        <Link href="/" className="px-5 py-2 rounded-full bg-purple-600/30 border border-purple-500/40 text-white">Home</Link>
        <Link href="/dreams" className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/80">Dream Dictionary</Link>
        <Link href="/symbols" className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/80">Angel Numbers</Link>
        <Link href="/tools" className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/80">Tools</Link>
      </div>
    </div>
  );
}
