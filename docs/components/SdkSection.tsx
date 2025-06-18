export const SdkSection = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="mb-8" id={id}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div>{children}</div>
    </section>
  );
};
