import React from "react"

function inputFocus(input: React.RefObject<HTMLInputElement>) {
    if (input.current) input.current.focus()    
}

export default inputFocus