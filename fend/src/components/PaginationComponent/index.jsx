import React, { useState } from 'react'
import styleModule from './index.module.scss'

const PaginationComponent = ({ curentPage, totalPage, changePage }) => {


    // const [page, setPage] = useState(1)



    const handleClick = (page) => {
        changePage(page)
        console.log(page)
    }

    return (
        <div className={styleModule.pagination}>
            <span onClick={() => handleClick(Number(curentPage) - 1)}><i className="fa-solid fa-angle-left"></i></span>
            <div className={styleModule.pageNumber}>
                {/* <span className={styleModule.active} onClick={()=>handleClick(1)}>1</span>
                <span onClick={()=>handleClick(2)}>2</span> */}
                {/* {totalPage.foreach(page => (
                    <span className={curentPage === page ? styleModule.active : ''} key={page} onClick={() => handleClick(page)}>{page}</span>
                    ))} */}
                {Array.from({ length: totalPage }, (_, index) => (
                    <span className={curentPage==(index+1) ? styleModule.active : ''} key={index} onClick={() => handleClick(index + 1)}>{index + 1}</span>
                ))}

            </div>
            <span onClick={() => handleClick(Number(curentPage) + 1)}><i className="fa-solid fa-angle-right"></i></span>
            {/* <button onClick={() => console.log('curentPage', curentPage)}>click</button> */}

        </div>
    )
}

export default PaginationComponent