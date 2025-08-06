interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return (
    <div className="opacity-80">
      <h1 className="uppercase text-sm">{title}</h1>
      <hr className="mt-1 mb-4" />
    </div>
  );
}
