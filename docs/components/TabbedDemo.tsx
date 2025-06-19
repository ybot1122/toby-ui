import React, { useState } from "react";
import { Code } from "./Code";

export default function TabbedDemo({
  Demo,
  markdown,
}: {
  Demo: JSX.Element;
  markdown: string;
}) {
  const [activeTab, setActiveTab] = useState("demo");

  return (
    <div style={{ margin: "2rem auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", marginBottom: 8 }}>
        <button
          onClick={() => setActiveTab("demo")}
          style={{
            flex: 1,
            padding: 8,
            background: activeTab === "demo" ? "#eee" : "#fff",
            border: "1px solid #ccc",
            borderBottom: activeTab === "demo" ? "none" : "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Demo
        </button>
        <button
          onClick={() => setActiveTab("code")}
          style={{
            flex: 1,
            padding: 8,
            background: activeTab === "code" ? "#eee" : "#fff",
            border: "1px solid #ccc",
            borderBottom: activeTab === "code" ? "none" : "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Code
        </button>
      </div>
      <div
        style={{ border: "1px solid #ccc", padding: 16, background: "#fafafa" }}
      >
        {activeTab === "demo" ? Demo : <Code>{markdown}</Code>}
      </div>
    </div>
  );
}
