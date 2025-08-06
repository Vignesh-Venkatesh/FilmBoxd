interface LoadingListProps {
  quantity: number;
  height: string;
  width: string;
  columns: number;
}

export default function LoadingList({
  quantity,
  height,
  width,
  columns,
}: LoadingListProps) {
  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: quantity }).map((_, i) => (
        <div key={i} className="skeleton" style={{ width, height }} />
      ))}
    </div>
  );
}
