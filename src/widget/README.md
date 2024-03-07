Widget Architecture

- `main.tsx`: Wrapper that renders React DOM
- `app`: Providers and main layout
- `views`: View of components
- `hooks`: Business logic for components
- `shared`: Module shared by all codes. (Types, Utils, etc..)

**Note that all references must occur from bottom to top in the list. (You can't reference `views` or `app` from `shared`.)**
