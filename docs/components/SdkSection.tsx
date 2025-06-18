import { useState } from "react";

export const SdkSection = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <section className="mb-8" id={id}>
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold" style={{ width: "200px" }}>
          {title}
        </h2>
        <button onClick={() => setIsCollapsed((t) => !t)} className="self-end">
          {isCollapsed ? "Show More" : "Hide"}
        </button>
      </div>
      {!isCollapsed && <div>{children}</div>}
    </section>
  );
};
