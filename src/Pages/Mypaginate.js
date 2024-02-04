import { Button, CardFooter, IconButton } from '@material-tailwind/react'
import React from 'react'

const Mypaginate = ({Totalpage, perPage, totalData, paginate, currentPage, onPrevClick, onNextClick }) => {
    const pageNumber = []


    for (let i = 1; i <= Math.ceil(totalData / perPage) ; i++) {
        pageNumber.push(i)
    }

    // const myshownum = []
    // const firstshow = myshownum.push(...pageNumber.filter((val) => val <= currentPage).slice(-6), ...pageNumber.filter((val) => currentPage < val).slice(0, 5))

    // for (let i = 1; i <= Math.ceil(totalData /advertiserdta[0]?.limit); i++) {
    //     pageNumber.push(i)
    // }

// console.log(totalData)

    return (
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">

            <Button onClick={onPrevClick} disabled={currentPage + 1 == 1 ? true : false} variant="outlined" color="blue-gray" size="sm">
                Previous
            </Button>

            {/* <div className="flex items-center gap-2">

                {pageNumber?.map((val, i) => (
                    <IconButton  key={i} onClick={val - 1 == currentPage ? null:() => paginate(val)} variant={val - 1 == currentPage ? 'outlined' : 'text'} color="blue-gray" size="sm">
                        {val}
                    </IconButton>
                ))}


            </div> */}

            <Button onClick={onNextClick} disabled={ Totalpage==0?currentPage == Totalpage : currentPage+1 == Totalpage} variant="outlined" color="blue-gray" size="sm">
                Next
            </Button>
        </CardFooter>
    )
}

export default Mypaginate