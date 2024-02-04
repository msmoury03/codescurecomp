import React, { useEffect, useState } from 'react'
import Mypaginate from './Mypaginate';
import { CardBody, Chip, IconButton, Typography } from '@material-tailwind/react';
import { Checkbox, Empty, Spin, Tooltip } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Search from 'antd/es/input/Search';

const Homepge = () => {

    const TABLE_HEAD = ["name", "skin_color", "mass", "height", "hair_color", "gender", "eye_color", "birth_year"];


    const [loading, setloading] = useState(false)
    const [statsdata, setstatdata] = useState()
    const [limit, setlimit] = useState(10)
    const [search, setsearch] = useState('')
    const [reduloading, setreduloading] = useState(true)

    const [issort,setissort] = useState(false)
    useEffect(() => {
        callforReducer()
    }, [])

    const callforReducer = async () => {
        setloading(true)
        const res = await axios.get(`https://swapi.dev/api/people`).then((ress) => {
            //   console.log(ress.data)
            setstatdata(ress?.data)
        }).catch((e) => {
            toast.error(e?.response?.data?.msg)

        })
        setloading(false)
    }


    const handlepaginate = async (number) => {
        // console.log(number)
        setloading(true)
        const res = await axios.get(`https://swapi.dev/api/people`).then((ress) => {

            // console.log('api', ress.data)
            setstatdata(ress?.data)
        }).catch((e) => {
            toast.error(e?.response?.data?.msg)

        })
        setloading(false)
    }

    const onNextClick = async () => {
        setloading(true)

        if (statsdata?.next == null) {
            toast.warning('No More data Found')

        } else {
            const res = await axios.get(statsdata?.next).then((ress) => {


                setstatdata(ress?.data)
            }).catch((e) => {
                toast.error(e?.response?.data?.msg)

            })
        }

        setloading(false)
    }

    const handleChnageSelect = async (e) => {
        setlimit(e)
    }

    const onPrevClick = async () => {
        setloading(true)
        if (statsdata?.previous == null) {
            toast.warning('No More previous Found')

        } else {


            const res = await axios.get(statsdata?.previous).then((ress) => {


                setstatdata(ress?.data)
            }).catch((e) => {
                toast.error(e?.response?.data?.msg)

            })
        }
        setloading(false)
    }


    const onSearch =async (e) => {
        
        setloading(true)
        


            const res = await axios.get(`https://swapi.dev/api/people?search=${e}`).then((ress) => {


                setstatdata(ress?.data)
            }).catch((e) => {
                toast.error(e?.response?.data?.msg)

            })
        
        setloading(false)
      }


      const onChange = (e)=>{
        setissort(!issort)
        // console.log(issort)
      }


    return (
        <div>

            <ToastContainer />

            <div className='bg-white w-full mt-20 mb-20'>


                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    style={{ backgroundColor: 'red' }}
                    onSearch={onSearch}
                />

<Checkbox onChange={onChange}>Checkbox</Checkbox>



            </div>



            <Spin spinning={loading}>


                {/* // advertiserdta && advertiserdta[0]?.docs?.length == 0 ? <Typography variant="paragraph" className='text-center'>NO DATA FOUND</Typography> : */}
                <div>
                    <CardBody className="overflow-scroll px-0">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>

                                {statsdata && statsdata?.results == 0 ? (
                                    <td colSpan={TABLE_HEAD.length}>

                                        <div className='flex justify-center text-center m-2'>
                                            <Empty />
                                        </div>
                                    </td>
                                ) :






                                    statsdata && statsdata?.results?.sort((a,b)=> issort? (a.name>b.name)*2-1:(b.name>a.name)).map(
                                        (val, index) => {
                                            const isLast = index === statsdata?.results?.length - 1;
                                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                            return (
                                                <tr key={index}>
                                                    <td className={classes}>


                                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                                            {val?.name}
                                                        </Typography>

                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue" className="font-medium cursor-pointer ">
                                                            {val?.skin_color

                                                            }
                                                        </Typography>
                                                    </td>

                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue" className="font-normal cursor-pointer ">
                                                            {val?.mass

                                                            }
                                                        </Typography>
                                                    </td>


                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue" className="font-medium cursor-pointer ">
                                                            {val?.height}

                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                                            {val?.hair_color}

                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                                            {val?.gender}

                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                                            {val?.eye_color}

                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                                            {val?.birth_year}

                                                        </Typography>
                                                    </td>

                                                    {/* <td className={classes}>
                                        <Tooltip content="Edit">
                                            <IconButton onClick={() => onEditUser(val.id)} variant="text" color="blue-gray">
                                                <PencilIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Delete">
                                            <IconButton onClick={() => onDeleteUser(val.id)} variant="text" color="blue-gray">
                                                <TrashIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                    </td> */}
                                                </tr>
                                            );
                                        },
                                    )

                                }
                            </tbody>
                        </table>
                    </CardBody>

                    <Mypaginate
                        onNextClick={onNextClick}
                        onPrevClick={onPrevClick}
                        paginate={handlepaginate}
                        currentPage={1}
                        totalData={statsdata?.count}
                        perPage={10}
                        Totalpage={9}
                    />



                </div>

            </Spin>
        </div>
    )
}

export default Homepge