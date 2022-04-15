import Slider from "@mui/material/Slider"
import { useState } from "react"


interface Props {
    setValues: (values: number[]) => void
    minValueDistance: number
    minValue: number
    maxValue: number
}


export const TwoEndedSlider = ({ setValues, minValueDistance, minValue, maxValue }: Props) => {

    const [displayValues, setDisplayValues] = useState<number[]>([minValue, maxValue])

    const handleTwoEndedSliderChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,) => {

        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minValueDistance) {
            // if (activeThumb === 0) {
            //   const clamped = Math.min(newValue[0], 100 - minDistance);
            //   setStartEndYears([clamped, clamped + minDistance]);
            // } else {
            //   const clamped = Math.max(newValue[1], minDistance);
            //   setStartEndYears([clamped - minDistance, clamped]);
            // }
        } else {
            setDisplayValues(newValue as number[]);
        }
    }

    const handleOnChangeCommited = (
        event: React.SyntheticEvent | Event,
        newValue: number | number[]) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        setValues(newValue as number[]);
    }

    return (
        <Slider

            getAriaLabel={() => 'Minimum distance'}
            value={displayValues}
            onChange={handleTwoEndedSliderChange}
            onChangeCommitted={handleOnChangeCommited}
            valueLabelDisplay="auto"
            min={minValue}
            max={maxValue}
        // getAriaValueText={valuetext}
        />
    )
}