import { useState, useEffect } from "react";

const useToggleTimeout = (
    initialValue: boolean = true,
    timeoutDuration: number = 5000
) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            setValue(false); // Set the value to false after the timeout duration
        }, timeoutDuration);

        // Clean up the timer when the component unmounts or the value changes
        return () => clearTimeout(timer);
    }, [initialValue, timeoutDuration]); // Re-run the effect if initialValue or timeoutDuration changes

    return value;
};

export default useToggleTimeout;
