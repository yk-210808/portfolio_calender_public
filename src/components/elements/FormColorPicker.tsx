import { useContext } from 'react';
// contexts
import { TypingValueContext } from '../../contexts/ScheduleContext'
// flowbite
import { Badge } from "flowbite-react"
import { HiCheck } from "react-icons/hi";

interface Props {
  defaultValue?: string
}

const colorList = [
  'info',
  'gray',
  'failure',
  'success',
  'warning',
  'indigo',
  'purple',
  'pink',
]

/**
 * A color picker component that is used to select a color.
 * The component is a controlled component, meaning that the state of the component is managed by the parent component.
 * The component is also a form component, meaning that it can be used in a form and the value of the component can be retrieved.
 *
 * @param {string} [defaultValue] - The default value of the component.
 * @returns {JSX.Element} - The component.
 */
const FormColorPicker: React.FC<Props> = ({ defaultValue }) => {
  const { typingValue, setTypingValue } = useContext(TypingValueContext)
  let selected

  // If the typingValue.color is not set, set the selected color to the defaultValue.
  if (!typingValue.color) {
    selected = defaultValue
  } else {
    selected = typingValue.color
  }

  /**
   * Handles the change event of the color picker.
   * If the selected color is not set, do nothing.
   * If the selected color is set, set the value of the component to the selected color.
   *
   * @param {string} color - The selected color.
   */
  const handleSelectColor = (color: string) => setTypingValue({ ...typingValue, color })

  return (
    <div className="flex gap-1.5 mt-3.5 md:text-sm text-xs">
      {/* The label of the component. */}
      カラー：
      {/* The color picker component. */}
      {colorList.map((color) => (
        <Badge
          key={color}
          color={color}
          className="w-5 h-5 cursor-pointer rounded-full"
          icon={color === selected ? HiCheck : undefined}
          onClick={() => handleSelectColor(color)}
        ></Badge>
      ))}
    </div>
  )
}


export default FormColorPicker