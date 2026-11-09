# Challenge 1 Visual Regression & Adversarial Test Suites

Automated multimodal QA suites for **Challenge 1** (`challenges/c1_image_outreach.py` + `static/challenge1.js`).
Generated test images and JSON audit reports are written to `/tmp/pamb_c1_*` by default (or `--out-dir`) so running tests keeps the Git workspace completely clean.

## Prerequisites
1. Start the local server on port `8095`:
   ```bash
   PROJECT_ID=<YOUR_GCP_PROJECT_ID> PORT=8095 python3 server.py
   ```
2. Ensure `gcloud auth print-access-token` is authenticated against a GCP project with Vertex AI (`gemini-3.1-flash-image`, `gemini-3-flash-preview`, `gemini-3.1-flash-lite`) enabled.

## 1. Run the Regression Suite (20 Outreach + 4 Face-Lock + 6 Named/Unnamed Recipient Cases)
```bash
# Run all regression suites:
python3 tests/c1/test_c1_regression.py \
  --api-url http://localhost:8095/api/ai \
  --project <YOUR_GCP_PROJECT_ID>

# Or run only the Named vs. Unnamed (Generic) Recipient Card suite:
python3 tests/c1/test_c1_regression.py \
  --suite named-unnamed \
  --api-url http://localhost:8095/api/ai \
  --project <YOUR_GCP_PROJECT_ID>
```
Verifies:
- **Static Source Hygiene**: Zero dummy recipient names (`Dato' & Datin Tan` / `拿督陈与夫人`) in Challenge 1 sample prompts or defaults
- **Named vs. Unnamed (Generic) Cards (`--suite named-unnamed`)**: Tests generic sample-pill cards (`clientName == ""`, zero dummy names in metadata, follow-up pills, or OCR) AND explicitly named recipient cards (`Mr. & Mrs. Wong`, `林先生与夫人`, plus a 3-turn stateful `Named -> Same-Card Refinement -> Generic Reset` flow)
- **Step 0 & Step 1 Image-First Gates** (`photoRequired` without image; `executive_headshot` forced before cards/banners unlock)
- **Zero WhatsApp leaks** across `assistantReply` and `suggestedFollowUps`
- **20 Outreach / Banner cases** across English, Mandarin, Cantonese, Bahasa Melayu, and Tamil
- **4 Real Selfie 3-Turn Face-Lock tracks** (`leader_1..4` in `static/sim_portraits/`)
- **Zero text overlap**, **single clean portrait medallion**, and **centered face cropping** audited via `gemini-3-flash-preview`

## 2. Run the 22-Case Adversarial Red-Team Suite (`adv01..adv22`)
```bash
# Run all 22 adversarial cases (or --subset orig12 / --subset new10):
python3 tests/c1/test_c1_adversarial.py \
  --api-url http://localhost:8095/api/ai \
  --project <YOUR_GCP_PROJECT_ID>
```
Stress-tests explicit bottom-right/left-side text collision traps, 4-corner text sieges, dense multi-line text walls, Traditional Chinese couplets, wide-wrapping Tamil script, Malaysian "Rojak" trilingual code-switching, JSON/quote escape injections, emoji floods (zero `□` tofu glyphs), `"Keep my card, only change the text"` regeneration traps, system-override + WhatsApp/logo prompt injections, tiny `160x160` grayscale thumbnails, tall `9:16` bottom-edge faces, wide `16:9` off-center faces, 300-char run-on paragraph overflows, and 4-turn cross-language/mode whiplash.

## 3. Run the Full 6-Language Coverage Suite (`en`, `zh-CN`, `yue`, `zh-TW`, `ms`, `ta`)
```bash
python3 tests/c1/test_c1_multilingual.py \
  --api-url http://localhost:8095/api/ai \
  --project <YOUR_GCP_PROJECT_ID>
```
Verifies all 6 Arena languages (`English`, `简体中文 Mandarin`, `廣東話 Cantonese`, `繁體中文 Traditional Chinese`, `Bahasa Melayu`, and `தமிழ் Tamil`):
- **Static & Heuristic Parity**: All 8 pills (`3 craft` + `5 work`) localized, generic, and deterministically routed in every language
- **Localized Gate 0**: Missing photo returns `photoRequired=True` with script-matched localized instructions in all 6 languages
- **18 Live Visual Turns (`6 languages × 3 turns`)**: Step 1 Studio Portrait → Step 2 Generic (Unnamed) Card → Step 2 Explicitly Named Recipient Card, audited via Gemini Vision OCR for script fidelity, recipient presence/absence, and `0.0%` text-badge overlap.
