import React, { forwardRef, useState } from 'react'
import './index.module.scss'

const Input = forwardRef((props, ref) => {
    const { readOnly, inputValue, placeholder, className, handleOnChange = () => { }, type, w, h, m, p, bgc, color, border, br, fsize, cursor, transition } = props
    return (
        <input placeholder={placeholder}
            className={className}
            ref={ref ? ref : null}
            readOnly={readOnly ? true : false}

            style={{
                width: w,
                height: h,
                margin: m || 0,
                padding: p || '10px 15px',
                backgroundColor: bgc || 'rgb(238 237 237 / 22%)',
                color: color || 'black',
                border: border || '2px solid rgb(119 82 5 / 15%)',
                borderRadius: br || 5,
                fontSize: fsize || '16px',
                cursor: cursor || 'auto',
                transition: transition || 'none',
            }}
            value={inputValue || ''}
            onChange={handleOnChange}
            type={type}
        />
    )
})

export default Input