import { useRef, useEffect, useState } from 'react';
import { useOutsideClick } from '@/common/hooks/useOutsideClick';
import { useHandleKeyboard } from '@/common/hooks/useHandleKeyboard';
import { Button } from './Button';

type inputMasks = 'default';
interface IEditableTextInputProps {
  name: string;
  value: string;
  update: (value: string) => void;
  mask?: inputMasks;
  isRisked?: boolean;
  isDisabled?: boolean;
}

export const EditableTextInput = ({
  name,
  value,
  update,
  isRisked = false,
  mask = 'default',
  isDisabled = false,
}: IEditableTextInputProps) => {
  const refElement = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  useOutsideClick(
    refElement,
    () => {},
    () => {
      setIsEditable(false);
    },
  );

  useHandleKeyboard((key) => {
    if (key === 'Escape') {
      setIsEditable(false);
    }
  });

  useEffect(() => {
    if (isEditable) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditable]);

  const styleInputIsEditable = isEditable ? '' : 'hidden';
  const styleInputIsRisked = isRisked ? 'line-through' : '';

  return (
    <div className=" min-h-[68px] transition-all duration-150" ref={refElement}>
      {!isEditable ? (
        <Button
          className="text-left w-full text-[2rem] !block whitespace-nowrap text-ellipsis overflow-hidden  min-h-[68px]"
          isDisabled={isDisabled}
          isRisked={isRisked}
          content={value}
          onClick={(): void => setIsEditable(true)}
        />
      ) : undefined}

      <input
        type="text"
        ref={inputRef}
        name={name}
        className={`bg-transparent ${styleInputIsEditable} text-[2rem] outline-none text-left w-full px-[0.875rem] py-[0.438rem] focus:outline-none resize-none border-gray-700 flex flex-col justify-center items-start hover:text-textColor group-hover:text-textColor transition-all tracking-[0%] duration-150 leading-[19.2px] font-roboto-Condensed ${styleInputIsRisked}  min-h-[68px]`}
        id={name}
        onKeyDown={(event) => {
          if (event.code === 'Enter' || event.key === 'Enter') {
            setIsEditable(false);
          }
        }}
        onChange={(event): void => {
          const newText = event.target.value;

          const masks: { [key in inputMasks]: (content: string) => string } = {
            default: (text: string) => text,
          };

          update(masks[mask](newText));
        }}
        value={value}
      />
    </div>
  );
};
