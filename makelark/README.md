# MakeLark homepage

A product homepage for MakeLark Studio, built with semantic HTML, CSS and JavaScript. No build step, framework, analytics, external font service or runtime dependency is required.

## Run locally

From the repository root:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/makelark/.

## What works

- Responsive homepage and mobile navigation.
- Interactive Studio example: request a change, compare the original and updated website, approve the example, reset it.
- Six business scenarios. Select an industry, then choose **Try this example in Studio**.
- Keyboard navigation for tabs, example details and FAQs; reduced-motion support; useful content without JavaScript.
- Early-access form that prepares a correctly addressed email draft. The visitor chooses whether to open and send it. A copyable request is available if no email app is configured.

Studio is in development. The embedded workflow is an illustrative local interaction. It does not call AI, publish a website, or submit information to a server. Fictional businesses and illustrative photographs are identified in the page. The form uses the verified `admin@makelark.com` address.

## Design direction

**The working Studio:** explain the benefit immediately, then let a visitor make a small website change. The product interaction is the main visual. Industry examples connect that interaction to real business needs; the rest of the page explains ongoing use and early access.

The established MakeLark identity is retained: original folded-lark mark and wordmark, Manrope, cool white, ink and blue. Brand assets and six illustrative photographs were supplied in the MakeLark brand and storyboard guide. Font licensing is in `assets/manrope-OFL.txt`. No stock customer logos, testimonials, performance claims or pricing have been invented.

The design was developed with the Xenia workflow from https://github.com/davidjbeveridge/xenia-design. The selected concept, alternatives, review and validation evidence are in `design/`.

## Portable review file

```sh
python3 makelark/tools/export-preview.py /tmp/makelark-homepage.html
```

This embeds the styles, scripts, fonts and images in one HTML file. Open it in a browser, including offline. The email and clipboard actions still depend on the visitor's browser and local applications. Keep the generated file out of this repository; the normal source files remain easier to maintain.

## Verification

`tools/verify.cjs` exercises the homepage at 320, 390, 768, 1024 and 1440 pixels. It checks navigation, all business scenarios, the review flow, form validation, clipboard failure, reduced motion and the no-JavaScript fallback. It requires Playwright only for development checks.

```sh
MAKELARK_URL=http://localhost:8000/makelark/ node makelark/tools/verify.cjs
```

Set `PLAYWRIGHT_EXECUTABLE_PATH` to use an existing Chromium installation and `MAKELARK_PROOF_DIR` to select an output folder. Test email addresses use `example.com`; verification never opens or sends an email.

## Release boundary

This is the homepage only. The source can be served from a static host. Connecting a real access-request backend and the Studio application are separate product work. Merge the reviewed branch to publish through this repository's existing GitHub Pages configuration.
