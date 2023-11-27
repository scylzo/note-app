import { FC } from "react";

interface Props {
  text: string;
  bgColor: string;
  onClick?: () => void;
}

const AppButton: FC<Props> = ({ text, bgColor, onClick }) => {
  return (
    <button
      className={`${bgColor} rounded text-white py-2 px-5`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default AppButton;
