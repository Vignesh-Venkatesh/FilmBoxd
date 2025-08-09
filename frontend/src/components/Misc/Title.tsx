import { Link } from "react-router-dom";

interface TitleProps {
  title: string;
  more?: string;
}

export default function Title({ title, more }: TitleProps) {
  return (
    <div className="opacity-80 font-google">
      <div className="flex justify-between items-end">
        <h1 className="uppercase text-sm">{title}</h1>
        {more && (
          <Link to={`${more}`}>
            <h1 className="text-sm hover:text-accent transition-colors duration-200">
              more
            </h1>
          </Link>
        )}
      </div>
      <hr className="mt-1 mb-4" />
    </div>
  );
}
