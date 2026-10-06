# MakeLark demos

Static previews in top-level subdirectories. Publish directly from `main` using GitHub Pages **Deploy from a branch**, with `/ (root)` as the source folder. No custom Actions workflow, build command, publisher script, or dependency installation is required.

## One-time Pages setting

Open [Settings → Pages](https://github.com/davidjbeveridge/makelark-demos/settings/pages). Under **Build and deployment** select:

- **Source:** Deploy from a branch
- **Branch:** main
- **Folder:** / (root)

Click **Save**. This activates branch publishing; committing these files alone does not change the Pages setting. GitHub will publish subsequent pushes to `main` automatically.

The root `.nojekyll` file disables Jekyll processing. GitHub still uses its own managed Pages deployment internally, so runs may appear in the Actions tab, but there is no workflow YAML to maintain or run manually.

## Auto Vos

The complete approved homepage is in [`auto-vos/`](auto-vos/): HTML, CSS, JavaScript, original-logo SVGs, all images, and desktop and mobile videos. The switch to branch publishing leaves all 15 approved site files unchanged.

Expected URL after activation and deployment:

https://davidjbeveridge.github.io/makelark-demos/auto-vos/

An account-level custom Pages domain can change the host. The URL shown in Pages settings is authoritative. The repository is prepared for branch publishing; a live deployment has not yet been verified.

Keep the demo's `noindex,nofollow` metadata. This is a preview, not a replacement of the business's live domain. The site is publicly reachable once published, even if the repository is private; `noindex` is not access control. Do not change repository visibility or purchase a plan without the owner's approval.

## Updates and new demos

Edit the static files and push to `main`. For another demo, add `<demo-name>/index.html` and its assets, then add a relative link to the root `index.html`. Keep secrets, private documents, and development artifacts out of the publishing source.

`.github/auto-vos-deployment-manifest.json` records the original approved-file checksums for reference. It is no longer an automatic deployment gate, so ordinary edits do not require updating it. The one-time transfer helpers were removed; the site has no dependency on temporary download links.

[GitHub branch-publishing documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
