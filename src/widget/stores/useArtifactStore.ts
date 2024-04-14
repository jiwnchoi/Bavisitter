import { create } from "zustand";

interface ArtifactState {
  artifacts: {
    [key: string]: any;
  };
}

interface ArtifactAction {
  appendArtifact: (key: string, value: any) => void;
  getArtifact: (key: string) => any;
  removeArtifact: (key: string) => void;
  initArtifacts: () => void;
}

const useArtifactStore = create<ArtifactState & ArtifactAction>((set, get) => ({
  artifacts: {},
  appendArtifact: (key: string, value: any) =>
    set((state) => ({
      artifacts: { ...state.artifacts, [key]: value },
    })),
  getArtifact: (key: string) => {
    return get().artifacts[key];
  },
  removeArtifact: (key: string) =>
    set((state) => {
      const { [key]: _, ...rest } = state.artifacts;
      return { artifacts: rest };
    }),
  initArtifacts: () =>
    set(() => {
      return { artifacts: {} };
    }),
}));

export default useArtifactStore;
