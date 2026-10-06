# MakeLark demos

Static previews live in separate top-level directories and are published by `.github/workflows/pages.yml`.

## Auto Vos

The complete approved homepage is committed in [`auto-vos/`](auto-vos/): HTML, CSS, JavaScript, original-logo SVGs, all images, and both desktop and mobile videos. All 15 files were imported without changing their bytes and verified against `.github/auto-vos-deployment-manifest.json`.

The design retains the approved cinematic hero and restores the original logo and monochrome branding. Keep the demo's `noindex,nofollow` metadata. This is a preview, not a replacement of the business's live domain.

Expected URL after GitHub Pages activation and successful deployment:

https://davidjbeveridge.github.io/makelark-demos/auto-vos/

A custom account-level Pages domain, if configured, can change the host. Use the deployment's reported URL as authoritative.

## Deployment status — 6 October 2026 UTC

- The approved-file import succeeded and committed all assets.
- The Pages build succeeded, verified every approved file, and uploaded the deployment artifact.
- Initial Pages activation failed with `Resource not accessible by integration` because the workflow token cannot create this repository's Pages site.
- The site is **not yet verified live**. Repository privacy has not been changed.

Build and activation attempt: https://github.com/davidjbeveridge/makelark-demos/actions/runs/37408842881

## One-time activation

Open [Settings → Pages](https://github.com/davidjbeveridge/makelark-demos/settings/pages) and select **GitHub Actions** under **Build and deployment → Source**. Then rerun the failed deployment job in the run above, or use **Run workflow** on [Deploy demos to GitHub Pages](https://github.com/davidjbeveridge/makelark-demos/actions/workflows/pages.yml).

No local publisher script or manual asset upload is needed. Do not change repository visibility or purchase a plan without the owner's approval. The published demo will be publicly reachable; `noindex` is not access control.

## Future updates

Push changes to the relevant demo directory on `main`. The workflow publishes only top-level directories containing an `index.html`, preserving other demo directories. It does not publish `.github`, repository metadata, or transfer helpers. For approved changes to the Auto Vos files, update their sizes and SHA-256 values in `.github/auto-vos-deployment-manifest.json` so the integrity gate accepts the new version.

The one-time transfer workflow and temporary transfer file were removed after import. The permanent site has no dependency on temporary download links.
