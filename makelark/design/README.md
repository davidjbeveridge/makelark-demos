# MakeLark homepage design evidence

## Decision and result

The selected direction is **The working Studio**: a business website inside a usable request/review workspace. The page explains website creation and ongoing improvement, preserves MakeLark's existing identity, and describes Studio's development status honestly.

Three rendered composition studies informed the choice. The implementation adds six business examples, a reversible request/compare/approve demonstration, and a contact form that prepares an email draft with a copy fallback. It does not execute AI, publish a customer website, or send email.

## Review status

- **15/15 functional checks passed** across desktop and mobile workflows; initial layout checked at widths 320, 390, 768, 1024, and 1440.
- **Independent visual score: 8.2/10. Target: 9.0/10.** The score was retained after two practical refinements: selecting an industry can open its Studio example, and the mobile workspace is more compact.
- **Production design gate: FAIL against the aesthetic target.** The compiler reports the same unmet target through both its critic and workflow checks. It reports no remaining functional failure. No issue was waived.
- Strict fresh-context isolation of the separate reviewer is not established; that limitation remains explicit.
- The self-contained export was tested offline with zero network requests, working business examples, no missing images, and no message sent.

The gate is review evidence. It does not establish that the site is unusable, claim a 9/10 result, or certify complete accessibility or measured conversion improvement.

## Main records

- `design-brief.json` — executable design contract; `brief-validation.json` has no errors or warnings.
- `direction-record.json` — scoped ambition expansion, seeded exploration, candidates and selection.
- `studies/` and `study-review.md` — rendered hero alternatives and observed decisions.
- `visual-design-run.json` — technique ledger, evidence, source hashes, checked requirements, and unresolved quality target.
- `design-gate.md` and `design-gate.json` — compiled final result.
- `audit/raw/` — preserved original audit outputs.
- `audit/functional.json` — explicit adapter of final functional results for Xenia's compiler.
- `audit/copy-review.json` and `audit/ai-tell-review.json` — contextual adjudication; raw findings remain available.
- `audit/inspect-reviewed.json` — raw browser observations with only the intentionally hidden `#studio-live` region excluded from visible-text clipping. The six exclusions and exact rationale are recorded.
- `audit/signature-proof.json` — evidence for the native request, comparison, local approval and reset loop.
- `audit/asset-provenance.json` — supplied brand assets, generated example imagery, and font license provenance.
- `evidence/` — selected final renders, final render manifest and production-source hashes.

The final production input hashes match the final functional and critic reports. Files under this design directory are evidence and do not alter the website implementation.

## Render image encoding

Repository screenshots use WebP quality 90 to reduce transfer size. Original PNG captures were preserved outside the repository. `evidence/image-derivations.json` records original and derived SHA-256 hashes, dimensions, byte counts, and encoding. Raw reports retain their original capture names; the image-derivation manifest maps those names to the published review images. `audit/raw/critic-original.json` is a retained review snapshot, not evidence of a distinct pre-refinement score.
