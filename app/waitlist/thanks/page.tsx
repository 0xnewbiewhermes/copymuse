export default function ThanksPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f4f2ed] px-5 text-[#1c1b19]" style={{ fontFamily: '"DM Sans", ui-sans-serif, system-ui' }}>
      <div className="max-w-lg border border-[#1c1b19]/20 bg-[#fdfcf9] p-9 text-center shadow-[8px_9px_0_#dfd9cf]">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a4492e]">Request received</p>
        <h1 className="mt-5 text-5xl leading-[0.92] tracking-[-0.06em]" style={{ fontFamily: '"Fraunces", Georgia, serif' }}>Thanks for joining the review.</h1>
        <p className="mt-6 leading-7 text-[#5d5952]">We&apos;ll be in touch when your beta slot is ready. Bring a real pull request.</p>
        <a className="mt-8 inline-block border border-[#1c1b19] px-5 py-3 text-sm font-bold transition hover:bg-[#1c1b19] hover:text-[#f4f2ed]" href="/">Back to MergeProof</a>
      </div>
    </main>
  );
}
