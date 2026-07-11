const evidence = [
  ["Successful payment webhook creates a reviewable evidence record", "payment-webhook-evidence.md", "—", "Needs a test"],
  ["Expired token is rejected before processing", "—", "—", "Unproven"],
];

const display = { fontFamily: '"Fraunces", Georgia, serif' };
const mono = { fontFamily: '"DM Mono", ui-monospace, monospace' };

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f2ed] text-[#1c1b19]" style={{ fontFamily: '"DM Sans", ui-sans-serif, system-ui' }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <nav className="flex items-center justify-between border-b border-[#1c1b19]/15 py-5 text-[11px] font-bold uppercase tracking-[0.16em]">
          <a href="#top">CopyMuse <span className="mx-1 text-[#a4492e]">×</span> MergeProof</a>
          <a className="border-b border-[#1c1b19] pb-0.5 transition hover:text-[#a4492e]" href="mailto:hello@copymuse.digital?subject=MergeProof%20private%20beta">Request access</a>
        </nav>

        <section id="top" className="grid items-end gap-12 py-16 lg:min-h-[660px] lg:grid-cols-[1.08fr_.92fr] lg:py-24">
          <div>
            <p className="mb-8 text-[11px] font-bold uppercase tracking-[0.16em] text-[#a4492e]">A calmer way to review AI-assisted code</p>
            <h1 className="max-w-3xl text-[3.65rem] leading-[0.9] tracking-[-0.065em] sm:text-7xl lg:text-8xl" style={display}>
              The PR said<br />“done.” <em className="font-normal text-[#a4492e]">Did the code?</em>
            </h1>
            <p className="mt-9 max-w-lg text-[17px] leading-8 text-[#5d5952]">
              MergeProof turns the promise in a pull request into a short, inspectable trail: what changed, what was tested, and what still needs a human eye.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a className="bg-[#1c1b19] px-5 py-3 text-sm font-bold text-[#f4f2ed] transition hover:bg-[#a4492e]" href="mailto:hello@copymuse.digital?subject=MergeProof%20private%20beta">Join the private beta</a>
              <a className="text-sm font-bold underline decoration-[#a4492e] decoration-2 underline-offset-4" href="#evidence">Read a real brief</a>
            </div>
          </div>

          <aside className="relative border border-[#1c1b19]/20 bg-[#fdfcf9] p-6 shadow-[8px_9px_0_#dfd9cf] sm:p-8">
            <div className="flex items-center justify-between border-b border-[#1c1b19]/15 pb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5d5952]" style={mono}>
              <span>Review note / 014</span><span>Open</span>
            </div>
            <h2 className="mt-8 text-4xl leading-[0.95] tracking-[-0.05em]" style={display}>A merge is a decision,<br />not a green tick.</h2>
            <dl className="mt-9 space-y-5 border-l-2 border-[#a4492e] pl-4 text-sm leading-6">
              <div><dt className="font-bold">The promise</dt><dd className="text-[#5d5952]">An expired token never reaches payment processing.</dd></div>
              <div><dt className="font-bold">The evidence</dt><dd className="text-[#a4492e]">No matching implementation or test found.</dd></div>
              <div><dt className="font-bold">The next move</dt><dd className="text-[#5d5952]">Ask the question before approving the PR.</dd></div>
            </dl>
            <p className="mt-8 text-[10px] uppercase tracking-[0.13em] text-[#817a70]" style={mono}>Evidence, not an auto-approval.</p>
          </aside>
        </section>

        <section className="border-t border-[#1c1b19]/15 py-14">
          <div className="grid gap-8 md:grid-cols-[.7fr_1fr]">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a4492e]">What changes</p>
            <div className="grid gap-7 sm:grid-cols-3">
              {[
                ["Less diff fatigue", "Start from the acceptance criteria instead of reading 400 changed lines cold."],
                ["Tests in context", "See where coverage exists—and where an important path has no evidence."],
                ["One useful comment", "A brief your reviewer can act on, rather than another noisy bot thread."],
              ].map(([title, copy], index) => (
                <article key={title} className="border-t border-[#1c1b19]/20 pt-4">
                  <span className="text-[10px] font-bold text-[#a4492e]" style={mono}>0{index + 1}</span>
                  <h3 className="mt-4 text-xl tracking-[-0.035em]" style={display}>{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5d5952]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="evidence" className="border-y border-[#1c1b19]/15 py-16">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1fr]">
            <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a4492e]">The output</p><h2 className="mt-4 text-5xl leading-[0.92] tracking-[-0.06em]" style={display}>A short brief<br />for the person<br />who signs off.</h2></div>
            <div className="overflow-hidden border border-[#1c1b19]/20 bg-[#fdfcf9]">
              <div className="flex justify-between border-b border-[#1c1b19]/15 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5d5952]" style={mono}><span>MergeProof</span><span>Evidence gate</span></div>
              <div className="overflow-x-auto p-5">
                <table className="min-w-[590px] w-full text-left text-sm">
                  <thead className="border-b border-[#1c1b19]/15 text-[10px] uppercase tracking-[0.1em] text-[#817a70]"><tr><th className="pb-3 pr-4 font-bold">Criterion</th><th className="pb-3 pr-4 font-bold">Code</th><th className="pb-3 pr-4 font-bold">Test</th><th className="pb-3 font-bold">Verdict</th></tr></thead>
                  <tbody>{evidence.map(([criterion, code, test, verdict]) => <tr key={criterion} className="border-b border-[#1c1b19]/10 last:border-0"><td className="py-4 pr-4 leading-5">{criterion}</td><td className="py-4 pr-4 text-xs text-[#5d5952]" style={mono}>{code}</td><td className="py-4 pr-4 text-xs text-[#5d5952]" style={mono}>{test}</td><td className="py-4 font-bold text-[#a4492e]">{verdict}</td></tr>)}</tbody>
                </table>
                <p className="mt-5 border-t border-dashed border-[#1c1b19]/20 pt-4 text-xs leading-5 text-[#5d5952]"><b className="text-[#1c1b19]">Reviewer focus:</b> verify the payment flow; add the expired-token path before merge.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-start justify-between gap-8 py-16 sm:flex-row sm:items-end">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a4492e]">Built for teams who still read the diff</p><h2 className="mt-4 text-5xl leading-[0.92] tracking-[-0.06em]" style={display}>Ship with a little<br />more certainty.</h2></div>
          <a className="border border-[#1c1b19] px-5 py-3 text-sm font-bold transition hover:bg-[#1c1b19] hover:text-[#f4f2ed]" href="mailto:hello@copymuse.digital?subject=MergeProof%20private%20beta">Request early access →</a>
        </section>
      </div>
    </main>
  );
}