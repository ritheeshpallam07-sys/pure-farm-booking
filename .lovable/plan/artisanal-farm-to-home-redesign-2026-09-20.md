# Artisanal Farm-to-Home Redesign

## Goal
Transform the existing homepage into a continuous, editorial farm-to-home story while preserving the current booking system, stored bookings, private owner access, navigation, contact placeholders, and publishing setup.

## Visual direction
- Use the selected Sage & Cream palette: `#F5F0E8`, `#DCE5D4`, `#A8C0A0`, and `#4A6741`, translated into semantic theme tokens.
- Use Instrument Serif for expressive editorial headings and Work Sans for readable body copy.
- Follow the selected Artisanal Narrative Flow: spacious full-width chapters, carefully overlapped photography, small chapter labels, fine natural lines, and restrained hand-drawn farm details.
- Keep the existing cow photograph as the primary visual anchor and reuse focused crops of it where a supporting farm detail is needed.

## Homepage composition
1. Recompose the hero as an immersive opening chapter with the exact brand, supplied headline and copy, one primary booking action, and the small farm-to-home line.
2. Turn the farm journey into the page's signature connective path, with a thin organic line linking cow, milk, care, and home moments across desktop and vertically on mobile.
3. Rebuild About as an editorial statement paired with an overlapping farm photograph detail.
4. Arrange the four benefits around a central illustrated milk bottle rather than four standard cards.
5. Present the three process steps along a connected natural line, with progressive once-only reveals.
6. Make the booking area the visual destination of the story, using warm layered surfaces and sparse leaf, grass, and bottle details while leaving all existing form behavior intact.
7. Keep Contact and the footer concise, retaining the provided placeholders and exact brand wording.

## Motion and interaction
- Add a restrained staged hero entrance: image, headline, description, then action.
- Use Intersection Observer for once-only 400–600ms upward fades and small item staggers.
- Draw the journey and process lines once as their sections enter view.
- Add tiny lifts, icon shifts, button press states, navigation underlines, form focus transitions, and a smooth mobile menu reveal.
- Respect reduced-motion settings and disable nonessential movement.
- Add a subtle crossfade wrapper for route content without changing navigation behavior.

## Safeguards and verification
- Do not alter booking submission, database fields, success/error states, owner authentication, or stored-booking access.
- Keep Owner Access private and unlisted.
- Do not add reviews, certifications, statistics, maps, invented details, extra pages, or new backend work.
- Verify desktop and mobile composition, menu behavior, reduced motion, form submission and saved booking, private owner sign-in access, metadata, and browser errors.
