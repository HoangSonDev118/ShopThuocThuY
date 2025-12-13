import React, { useState } from 'react'

import './index.module.scss'
const Button = (props) => {
    const { className, content, w, h, m, p, bgc, color, border, br, fsize, fw, cursor, transition, icon, onClick, img} = props
    // const [isHover, setIsHover] = useState(false)
    return (
        <button
            className={className}
            style={{
                width: w || 'auto',
                height: h || 'auto',
                margin: m || 0,
                padding: p || '10px 20px',
                backgroundColor: bgc || '#d08f00',
                color: color || 'white',
                border: border || 'none',
                borderRadius: br || 3,
                fontSize: fsize || '16px',
                cursor: cursor || 'pointer',
                transition: transition || 'all .1s linear',
                fontWeight: fw || '500'
            }}
            onClick={onClick}
            >
            {icon && (<i className={icon} style={{margin:content ? '0 5px 0 0' : '0'}}/>)}
            {img && (<img src={img} style={{width:'8%', transform:'translate(-5px, 3px)'}}/>)}
            {content}
        </button>
    )
}

export default Button
