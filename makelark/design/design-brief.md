# Design brief: MakeLark Studio homepage

## Artifact
- **Name:** MakeLark Studio homepage
- **Surface:** One production marketing homepage with an explicitly illustrative native product demo
- **Platform:** Responsive web; GitHub repository delivery
- **Scope:** Build only the homepage. Select the concept under delegated creative authority. No ChatGPT Sites.
### Required States
- Desktop initial hero
- Mobile initial hero and navigation
- Demo request
- Demo updated preview
- Original/updated comparison
- Demo approval confirmation
- Demo reset
- Early-access contact action, validation and honest outcome
- Keyboard focus and reduced motion

## Product Truth
- **Audience:** Owners of businesses that need professional website creation and an easier way to keep their website current; initial contexts include automotive, accounting, real estate, law, manufacturing, and restaurants.
- **Primary Job:** Understand MakeLark Studio, see a concrete website-improvement workflow, and request early access.
### Required Content
- MakeLark is the parent company and MakeLark Studio is the product
- Website creation, visual feedback, ongoing updates, and managed hosting are the product scope
- Studio is in development / early access
- Northline Homes and business photography are illustrative examples
- A clear early-access contact action
### Fixed Strings
- MakeLark
- MakeLark Studio
- A better website.
- A simpler way to run it.
- Get early access
### Prohibited Inventions
- Production-ready AI model execution
- Live site publishing from the demo
- An account or saved project when only local demo state exists
- Testimonials or customer logos
- Measured growth/conversion results
- Pricing or guarantees
- A successful server submission without a working endpoint
- Fictional example businesses presented as actual customers
### Functional Requirements
- Native, selectable content and semantic controls
- One request -> updated preview -> original/updated comparison -> local approval loop
- Reset restores the initial state
- No navigation to nonexistent pages
- Mobile menu, disclosure controls, forms, copy actions and demo controls work if shown
- Email or other contact handoff accurately describes its actual behavior

## Creative Direction
- **Mode:** broad-redesign
- **Core Idea:** The working Studio: make a useful business-website change visible in the product itself.
### Emotional Target
- Immediate product understanding
- Confidence in the result
- Owner control over changes
- **Composition:** Strong outcome headline and two actions above one dominant workspace. Website preview occupies approximately 70% of its desktop frame and a request/review panel occupies 30%. Supporting sections vary between editorial text, business imagery, and a continuous workflow.
- **Geometry:** Rectangular page and workspace geometry, 1px dividers, restrained 6-12px corner radii, aligned 1160-1280px content widths.
- **Material:** Flat white and near-white software surfaces with a single subtle workspace shadow. Photographic texture is confined to business examples.
- **Typography:** Self-hosted Manrope. Major headings 800; section headings 700; actions 600; body 400-500. Desktop hero approximately 64-80px, line-height 1.08-1.15, modest negative tracking. Body approximately 18-20px.
- **Color Strategy:** Preserve #F8F9FC canvas, #FFFFFF surfaces, #141827 ink, #5662EC action blue, #E9EDFC selected state, #5D667A secondary text, and #DFE3ED dividers. Blue identifies actions and relevant state.
- **Image Language:** Existing generated business photographs provide credible context inside fictional examples. The house at dusk anchors the real-estate product demonstration.
- **Density:** Calm headline area followed by an information-rich but readable product surface. Supporting sections stay concise; avoid repeating boxed feature grids.

## Signature Moves
- A native request -> compare -> approve loop changes an actual website example while the owner keeps the same visual context.

## Signature Experience
- **Ambition Level:** showcase
- **Experience Promise:** A business owner can see how a simple request changes the website before choosing whether to keep it.
- **Defining Moment:** Request a private viewing action; the example website updates, original/updated comparison remains available, and approval produces a local-demo confirmation.
- **Design Integration:** The same business website is the main image, mechanism explanation and interactive proof. Main marketing actions remain accessible beside the demonstration.
### Must Survive Simplification
- Readable product preview
- Visible requested change
- Original/updated comparison
- Explicit local approval and reset
- Clear product status
### May Simplify
- Nonessential editor chrome
- Decorative transitions
- Additional industry switches when they do not have faithful examples
- Secondary visual details below the main workflow
- **First Proof:** design/studies/studio.webp and studio-updated.webp: actual rendered composition and native request/preview state. Final implementation behavior has separate audited proof.
- **Temporal Evidence Required:** False

## Experience Composition
- **Identity Fidelity:** strict
- **Experience Freedom:** constrained
- **Medium:** Responsive marketing homepage
- **Exposure Frequency:** First-time product discovery with short repeat visits
- **Task Criticality:** Clear product understanding and a truthful early-access action
- **Production Budget:** Reuse available code, original brand assets and business images. No paid asset generation or new service purchase.
- **Score Path:** design/experience-composition.json
- **Craft Plan Path:** design/study-review.md
- **Selected Archive:** design/studies/
### Protected Qualities
- Outcome-first headline
- Visible website outcome inside a recognizable software workspace
- Original logo and Manrope typography
- Large architectural image with readable native text
- Owner control and reversible comparison
- Honest early-access and illustrative-demo status

## Anti Patterns
- Abstract sculpture or unrelated visual world in place of product explanation
- Fake customer logo strips, metrics or testimonials
- Agency portfolio or template marketplace presentation as the main product identity
- A wall of identically sized rounded feature cards
- Tiny unreadable dashboard text
- Unbounded autoplay, scroll hijacking or timed choreography
- Rasterized functional controls
- Dead CTA, pricing, login, social or legal links

## Existing System
### Token Sources
- User-supplied makelark-brand-and-storyboard.html (source asset guide, not included)
- assets/
### Reusable Components
- Original wordmark.svg and lark.svg
- Recovered self-hosted Manrope family
- Six existing generated business images
### Platform Conventions
- Semantic links and buttons
- Recognizable header navigation and mobile menu
- Explicit form labels and validation
- Native disclosure and focus behavior
### Allowed Deviations
- Recompose homepage hierarchy and spacing
- Use a fictional Northline Homes example with existing property imagery
- Local CSS refinements without replacing the identity

## Imagery
### Roles
- Make the fictional business website tangible
- Show breadth of business context without fabricating delivered customer work
- **Generation Allowed:** False
### Prohibited Regions
- Functional UI text and controls
- Replacement brand/logo system
- Fabricated customer evidence
### Asset Constraints
- Use exact existing guide assets or documented derivations
- Keep generated-business provenance recorded
- Do not represent fictional people/businesses as actual customers
- Images have descriptive alt text when meaningful
- Load offscreen images lazily

## Motion
### Roles
- Brief feedback for a user-triggered state change
- Focus and menu-state continuity
- **Generated Video Allowed:** False
- **Reduced Motion:** Honor prefers-reduced-motion. Remove nonessential transitions and smooth scrolling while preserving every control, state and confirmation.
### Performance Constraints
- No continuously animating hero
- No scroll-dependent access to content
- No long simulated AI typing or waiting
- No offscreen animation work

## Copy
### Voice
- Plain business language
- Outcome first
- Specific about the mechanism
- Concise and credible
### Avoid
- AI hype without a concrete action
- Art-direction language in customer copy
- Unverified guarantees
- Fictional evidence
- Production availability claims
### Character Constraints
- Hero headline remains a short two-part statement
- Paragraphs should be readable on a phone
- Action labels name the action
### Legal Or Exact Copy
- MakeLark
- MakeLark Studio
- Get early access
- A disclosure that Studio is in development
- A disclosure that the interactive example does not publish a real site

## Responsive And Accessibility
### Content Priority
- Product identity and headline
- Primary action
- Website result
- Request/review controls
- Supporting explanation
### Viewports
- 1440×1000 desktop
- 1280×900 laptop
- 768×1024 tablet
- 390×844 mobile
- 320px narrow mobile
### Keyboard And Focus
- All interactive controls reachable by keyboard
- Visible focus indicator
- Logical focus order
- No keyboard traps
- Escape closes overlays/menus when relevant
- Announce changed demo status without stealing focus
### Contrast And Text
- Readable body text and controls
- Contrast meets WCAG AA targets
- Native text rather than image text
- No required information conveyed only by color
- No horizontal page overflow at target widths
### Touch And Pointer
- Comfortable touch targets
- No hover-only essential content
- Native scrolling
- Demo panel reflows instead of being scaled down to unreadable text

## Implementation
### Repository Constraints
- Use davidjbeveridge/makelark-demos/makelark/
- Do not modify unrelated existing client demos
- Do not use ChatGPT Sites
### Technology
- Static HTML
- CSS
- Native JavaScript
- Self-hosted images and fonts
### Performance
- Avoid unnecessary framework/runtime dependencies
- Use compressed business images
- Load secondary assets after primary content where practical
- No external tracker or model invocation required for the demo
### Out Of Scope
- Full Studio application
- Live AI calls
- New customer accounts
- Production domain/DNS changes
- Pricing/payment flow
- New pages beyond the homepage
- Unrequested analytics or account creation

## Acceptance
### Rendered States
- Desktop and mobile homepage
- Default/updated/compared/approved demo
- Open mobile navigation
- Expanded FAQ
- Contact validation and action outcome
- Reduced motion
### Core Workflow
- Read the offering
- Enter the demo
- Preview a visible change
- Compare original and updated
- Approve locally
- Reset
- Reach early-access contact and understand what happens next
- **Critic Threshold:** 9
### Deterministic Checks
- JavaScript syntax
- Browser console errors
- Broken local assets
- Horizontal overflow at required widths
- Keyboard/focus checks
- Demo state transitions
- Link destinations
- Contact action truthfulness
### Build And Test Commands
- node --check script.js
- node --check demo.js
- python3 <xenia>/skills/xenia-brief-forge/scripts/brief_tool.py validate design/design-brief.json --format json
