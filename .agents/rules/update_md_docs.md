# Rule: Continuous Documentation of Development Challenges in `/md`

## Scope & Applicability
This rule applies to all agent operations, modifications, feature implementations, and bug fixes across the **Loss Prevention & Goods Security** repository.

---

## Core Directive
Whenever any component, design, data schema, mathematical logic, or architectural workflow in the application is created, updated, refactored, or fixed, **the markdown files in the `md/` directory must be systematically updated** to reflect the latest challenges, technical decisions, and solutions.

---

## Specific Documentation Requirements

### 1. Primary Target File: `md/development_challenges.md`
When a new requirement is addressed, a bug is fixed, or a design is modified:
- **Record the Challenge**: Document the exact problem, user requirement, or technical bottleneck (e.g., text truncation, 3D math projection, layout squeezing, data discrepancies).
- **Document the Root Cause**: Explain why the issue occurred (e.g., screen real-estate limits, flexbox height clipping, redundant annotations).
- **Explain the Implementation Solution**:
  - Outline the component architecture changes.
  - Provide relevant mathematical formulas, SVG geometry models, or code structure patterns.
  - Detail how visual harmony, performance, and accessibility were preserved.
- **Update the Summary Table**: Add or update the corresponding entry in the **Summary & Architectural Takeaways** matrix at the bottom of the document.

### 2. Directory Index: `md/README.md`
- Ensure any newly added markdown files or updated guides in `/md` are indexed with descriptions and direct relative links.

---

## Documentation Quality Standards
1. **Simultaneous Updates**: Code changes and `/md` documentation updates must be committed in the same development cycle to prevent documentation drift.
2. **Technical Precision**: Include concrete file links, component names, CSS utility configurations, and mathematical derivations where relevant.
3. **Zero Stale Information**: If an earlier implementation is replaced (e.g., 2D donut replaced by 3D extruded isometric pie chart), update the documentation to explain the transition rationale.
4. **Validation**: Ensure all markdown files render cleanly and adhere to standard GitHub Flavored Markdown.
