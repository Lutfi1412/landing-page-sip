import { Component, StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorView from "./components/ErrorView";

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed
      ? <ErrorView title="Terjadi kesalahan" message="Halaman tidak dapat ditampilkan. Muat ulang atau kembali ke beranda." />
      : this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode><Boundary><App /></Boundary></StrictMode>
);
