# Videre

- Lint
  - Check if the input visualization is violating visualization guidelines.
  - Encoding Level, Perception Level (about clutter reduction), Task Level
    (Vis-Task incompatibility)
- Fix
  - Function for revising data or specifications to satisfy visualization
    guidelines.
- Manifest
  - Manifest is a combination of lint function and fix functions and their
    applicable condition.
    - lint function is only one, but the fix function can be multiple.
  - `vet`: check state and determine that this lint and fix function is
    applicable to the current visualization state
