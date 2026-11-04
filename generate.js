// Serverless function (Vercel or Netlify style). Real research agent: searches the web, fetches
// provider docs, then returns the same guide JSON the UI renders. Set ANTHROPIC_API_KEY in env.
const SYSTEM = `You research how a developer gets an OAuth app approved for a provider.
Use web_search to find the provider's OFFICIAL developer docs first, then app review, verification and rate limit pages.
Return ONLY JSON: {"n","d":1to5,"hands","wait","sum","steps":[["agent|you","title","detail"]],"req":[],"blk":[["issue","fix"]],"src":[["label","url"]],"unc":[],"ver":[["claim","Confirmed|Corrected|Unverified","source"]]}.
Rules: mark a step "agent" only if software can do it. Cite only URLs you actually retrieved. Any timeline without an official figure goes in unc and ver as Unverified. 6 to 9 steps. Avoid dashes in prose.`;

module.exports = async (req, res) => {
  const q = String((req.body && req.body.q) || req.query.q || "").slice(0, 200);
  if (!q) return res.status(400).json({ error: "missing q" });
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-sonnet-5-5", max_tokens: 4000, system: SYSTEM,
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 8 }],
      messages: [{ role: "user", content: `Build the OAuth setup guide for: ${q}` }],
    }),
  });
  const data = await r.json();
  const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("");
  try { res.status(200).json(JSON.parse(text.replace(/```json|```/g, "").trim())); }
  catch (e) { res.status(502).json({ error: "unparseable", text }); }
};
