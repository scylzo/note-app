import { FC } from "react";
import AppButton from "./AppButton";

interface Props {
  title: string;
  description?: string;
  onEditClick?: () => void;
  onDeleteClick?(): void;
  onViewClick?(): void;
}

const NoteItem: FC<Props> = ({
  title,
  description,
  onEditClick,
  onDeleteClick,
  onViewClick,
}) => {
  return (
    <div className="shadow-md rounded p-5">
      <p className="font-semibold mb-4 text-gray-700 text-lg">{title}</p>
      {description && <p className="my-2 ml-3">{description}</p>}
      <div className="space-x-4">
        <AppButton
          text={description ? "Hide" : "View"}
          bgColor="bg-blue-500"
          onClick={onViewClick}
        />
        <AppButton text="Edit" bgColor="bg-gray-700" onClick={onEditClick} />
        <AppButton text="Delete" bgColor="bg-red-500" onClick={onDeleteClick} />
      </div>
    </div>
  );
};

export default NoteItem;
