# MakeLark demos

Static previews live in separate top-level directories and are published by `.github/workflows/pages.yml`.

## Auto Vos

Expected path: `/makelark-demos/auto-vos/` on the account's GitHub Pages site. A custom account domain, if configured, may change the host.

The approved version is the brand-restored homepage with the traced original logo, monochrome UI, and supplied hero video. Keep the demo's `noindex,nofollow` metadata. This is a preview, not a replacement of the business's live domain.

## Initial setup

1. Upload the approved static package into `auto-vos/`, including `index.html`, `styles.css`, `app.js`, and all files in `assets/`.
2. In Settings → Pages, choose **GitHub Actions** as the source, or enable Pages with an authorized GitHub CLI session: `gh api --method POST repos/davidjbeveridge/makelark-demos/pages -f build_type=workflow`.
3. Push the files to `main`, or run the **Deploy demos to GitHub Pages** workflow manually.

The workflow refuses to publish an incomplete Auto Vos package. It publishes only top-level directories containing an `index.html`; `.github`, repository metadata, and deployment helpers are not served. Other demo directories are preserved in subsequent deployments.

Repository visibility is not changed by the workflow. The generated website is public when Pages is enabled, while repository privacy can remain unchanged if the account's GitHub plan supports it. No paid plan or service is enabled automatically.

## Status at preparation

The deployment workflow is prepared, but the approved media files have not been imported. A previous attachment-based import returned HTTP 403; that expired import workflow and the temporary source-media diagnostic have been removed. A successful workflow run and an HTTP check of the final URL are required before calling the demo live.
