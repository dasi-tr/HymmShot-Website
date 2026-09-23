# HymmShot family website (test version)

Upload everything in this folder to the root of the HymmShot-Website repository.
This package intentionally has NO CNAME file, so the test site stays separate from hymmshot.com.
When you copy it to the real site (dasi-tr.PanoramiX), keep the existing CNAME file there.

## Pages
- index.html: HymmShot family home page (Capture. Combine. Do more.), with a 4-question Q&A
- about.html: About HymmShot
- hymmscroll/index.html: HymmScroll page, with Q&A (hymmshot.com/hymmscroll/)
- hymmstack/index.html: HymmStack page, with Q&A (hymmshot.com/hymmstack/)
- docs, security, privacy, changelog: kept from the live site, with the app name updated to HymmScroll in docs and changelog
- sitemap.xml includes all the pages above

## When HymmStack is on Microsoft Store
In index.html and hymmstack/index.html, find the block between
<!-- HYMMSTACK-STORE:START --> and <!-- HYMMSTACK-STORE:END -->
and replace the "Coming soon" span with:

<a class="btn btn-stack" data-download-cta="stack" href="YOUR-HYMMSTACK-STORE-LINK" target="_blank" rel="noopener">Get HymmStack on Microsoft Store</a>

Also update the "Where do I download them?" answer on index.html and the last Q&A answer on hymmstack/index.html ("When will HymmStack be available?") in both the visible text and the JSON-LD block at the top.

## Please check these statements are accurate before going live
- HymmStack: editor tools listed (blur, highlight, text, pen, eraser, shapes, crop, undo/redo, copy, save, PDF).
- Both tools: no account needed, nothing uploaded, work offline.
- HymmStack pricing: the site says pricing will be listed on Microsoft Store at launch.

## Not claimed on the site (on purpose)
- Reordering captures inside HymmStack is not mentioned, since it isn't confirmed for v1. Add it to the "Finish" step and the editor list once it's in.
