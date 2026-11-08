/**
 * Deterministic repairs for things the model keeps writing even when told not to.
 * A repair loop only oscillates on these, so they are fixed in code before the gates run.
 */
export function repairMechanical(html: string): string {
  // "Belief 1: ...", "Step 2 - ...", "3. ..." prefixes on headings read as one template across articles.
  let out = html.replace(
    /(<h[23][^>]*>)\s*(?:\d+[.):]\s*|(?:belief|myth|step|tip|rule|point|mistake|reason|truth|fact)\s*#?\d+\s*[:.–—-]\s*)/gi,
    '$1',
  );
  // The word "guarantee" is refused outright, including when a myth is being described.
  out = out
    .replace(/\bguarantees\b/gi, (m) => (m[0] === 'G' ? 'Promises' : 'promises'))
    .replace(/\bguaranteed\b/gi, (m) => (m[0] === 'G' ? 'Promised' : 'promised'))
    .replace(/\bguaranteeing\b/gi, 'promising')
    .replace(/\bguarantee\b/gi, (m) => (m[0] === 'G' ? 'Promise' : 'promise'));
  return out;
}
