const PoliciesRenderer = ({
  data,
}: {
  data: { policies: { id: string; title: string }[] };
}) => {
  return (
    <div className="flex items-center h-full space-x-1">
      {data.policies.map(({ id, title }) => (
        <div key={id} className="badge">
          {title}
        </div>
      ))}
    </div>
  );
};

export default PoliciesRenderer;
