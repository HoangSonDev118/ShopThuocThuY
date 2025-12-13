import { useEffect, useState } from "react"


export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedvalue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedvalue(value), delay)

        return () => clearTimeout(handler)
    }, [value])

    return debouncedValue
}