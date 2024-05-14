import { useState, useEffect } from "react";

const useToggleTimeout = (
    initialValue: boolean,
    timeoutDuration: number = 5000
) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (initialValue) {
            setValue(true);
        }
    }, [initialValue]);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (value) {
            timer = setTimeout(() => {
                setValue(false); // Set the value to false after the timeout duration
            }, timeoutDuration);
        }

        // Clean up the timer when the component unmounts or the value changes
        return () => clearTimeout(timer);
    }, [timeoutDuration, value]); // Re-run the effect if initialValue or timeoutDuration changes

    return value;
};

export default useToggleTimeout;
