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
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
};
