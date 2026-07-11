const options = {
  roles: ["Founder / CTO", "Engineering lead", "Senior engineer", "Product manager", "Other"],
  teams: ["Just me", "2–5 people", "6–15 people", "16–50 people", "51+"],
  agents: ["Cursor", "Claude Code", "Codex", "GitHub Copilot", "Windsurf", "Other / none"],
};

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-[#f4f2ed] px-5 py-6 text-[#1c1b19]" style={{ fontFamily: '"DM Sans", ui-sans-serif, system-ui' }}>
      <div className="mx-auto max-w-xl">
        <a href="/" className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a4492e]">← Back to MergeProof</a>
        <div className="mt-14 border border-[#1c1b19]/20 bg-[#fdfcf9] p-7 shadow-[8px_9px_0_#dfd9cf] sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a4492e]">Private beta</p>
          <h1 className="mt-5 text-5xl leading-[0.92] tracking-[-0.06em]" style={{ fontFamily: '"Fraunces", Georgia, serif' }}>Bring a real PR.<br />We&apos;ll bring the evidence.</h1>
          <p className="mt-6 max-w-md leading-7 text-[#5d5952]">Join the first group testing MergeProof on AI-assisted pull requests. We&apos;ll use this to invite the right teams into the beta.</p>
          <form className="mt-9 space-y-5" action="https://formsubmit.co/hello@copymuse.digital" method="POST">
            <input type="hidden" name="_subject" value="New MergeProof beta request" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://www.copymuse.digital/waitlist/thanks" />
            <input type="hidden" name="_captcha" value="false" />
            <label className="block text-sm font-bold">Work email<input required name="email" type="email" autoComplete="email" placeholder="you@company.com" className="mt-2 w-full border border-[#1c1b19]/25 bg-[#fdfcf9] px-4 py-3 text-base font-normal outline-none transition focus:border-[#a4492e] focus:ring-2 focus:ring-[#a4492e]/15" /></label>
            <label className="block text-sm font-bold">Your role<select required name="role" defaultValue="" className="mt-2 w-full border border-[#1c1b19]/25 bg-[#fdfcf9] px-4 py-3 text-base font-normal outline-none focus:border-[#a4492e]"><option value="" disabled>Select a role</option>{options.roles.map((option) => <option key={option}>{option}</option>)}</select></label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-bold">Team size<select required name="team_size" defaultValue="" className="mt-2 w-full border border-[#1c1b19]/25 bg-[#fdfcf9] px-4 py-3 text-base font-normal outline-none focus:border-[#a4492e]"><option value="" disabled>Select size</option>{options.teams.map((option) => <option key={option}>{option}</option>)}</select></label>
              <label className="block text-sm font-bold">Coding agent<select required name="coding_agent" defaultValue="" className="mt-2 w-full border border-[#1c1b19]/25 bg-[#fdfcf9] px-4 py-3 text-base font-normal outline-none focus:border-[#a4492e]"><option value="" disabled>Select tool</option>{options.agents.map((option) => <option key={option}>{option}</option>)}</select></label>
            </div>
            <label className="block text-sm font-bold">What makes PR review painful right now?<textarea name="review_pain" rows={4} placeholder="Optional, but this helps us build the right thing." className="mt-2 w-full resize-y border border-[#1c1b19]/25 bg-[#fdfcf9] px-4 py-3 text-base font-normal outline-none focus:border-[#a4492e] focus:ring-2 focus:ring-[#a4492e]/15" /></label>
            <button type="submit" className="w-full bg-[#1c1b19] px-5 py-3.5 text-sm font-bold text-[#f4f2ed] transition hover:bg-[#a4492e]">Request early access →</button>
          </form>
          <p className="mt-5 text-xs leading-5 text-[#817a70]">No sales sequence. Your details go to the CopyMuse beta inbox only.</p>
        </div>
      </div>
    </main>
  );
}
