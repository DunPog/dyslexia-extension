import { idDictionary } from "./id-dictionary";

export const loadingStyle = `
#${idDictionary.loadingOverlayDiv} {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(180, 180, 180, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  pointer-events: all;
}

#${idDictionary.loadingOverlaySpinnerDiv} {
  width: 36px;
  height: 36px;
  border: 4px solid #ccc;
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
`