import React, { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
  value: string;
  onPickerChange: (color: string) => void;
}
const ColorPicker = ({ value, onPickerChange }: Props) => {
  const [color, setColor] = useState("#aabbcc");
  return (
    <div className="relative">
      <span>
        #
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="mb-3 h-full bg-transparent font-ibm-plex-sans outline-none"
        />
      </span>

      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  );
};

export default ColorPicker;
