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
      <h2 className="text-2xl font-bold">
        {title}{" "}
        <button onClick={() => setIsCollapsed((t) => !t)}>
          {isCollapsed ? "Show More" : "Hide"}
        </button>
      </h2>
      {!isCollapsed && <div>{children}</div>}
    </section>
  );
};
