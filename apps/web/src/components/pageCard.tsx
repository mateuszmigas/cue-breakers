export const PageCard = (props: {
  title: string;
  imageSrc: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}) => {
  const { title, onClick, className } = props;
  return (
    <div
      className={`border w-96 h-48 bg-blue-200/50 rounded-md p-small ${className}`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
