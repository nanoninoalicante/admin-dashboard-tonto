import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { TagContext } from "../pages/index";
import { ModalContext } from "../pages/index";

const ADD_INTEREST = gql`
    mutation MergeTagWithInterest($interest: String, $tag: String) {
        mergeTagWithInterest(interest: $interest, tag: $tag) {
            name
            tags {
                name
            }
        }
    }
    `
const GET_INTERESTS = gql`
    query Tags {
        interests {
            name
            tags {
                name
            }
        }
    }
`
const GET_INTERESTS_BY_TAG = gql`
    query Query($name: String) {
        tag(name: $name) {
            interests {
                name
            }
        }
    }
`
const ModalAddInterest = () => {
    const router = useRouter();
    const selectedTag = useContext(TagContext)
    const tag = selectedTag.split("#")[1]
    const modal = useContext(ModalContext);
    const [selectedInterest, setSelectedInterest] = useState("")
    const { loading, error, data } = useQuery(GET_INTERESTS);
    const resultTag = useQuery(GET_INTERESTS_BY_TAG, {
        variables: { name: tag }
    })
    let options: any = [];
    data?.interests.forEach((interest: any) => {
        options.push({
            label: interest.name
        })
    })

    if(resultTag?.data?.tag) {
        resultTag?.data?.tag.map((op) => {
            console.log(op)
            op.interests.map((interest, i) => {
                options = options.filter((op) => {
                    return interest.name !== op.label
                })
            })
        }) 
    }
    
    const [addInterest, result] = useMutation(ADD_INTEREST)

    const addInte = () => {
        addInterest({ variables: { interest: selectedInterest, tag: tag } })
        if(result.loading) return 'Loading...'
        if(result.error) return `Error: ${result.error.message}`
        
        router.replace(router.asPath)
        modal?.setModal(false)
    }
    return (
        <>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-3xl bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        #
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Add Interest</h3>
                                        <div className="mt-2">
                                            <div className="text-sm text-gray-500">{`Choose one interest to the tag `}<span className='font-bold'>{selectedTag}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='static overflow-visible z-50'>
                                {options &&
                                    <ul className='px-2 divide-y max-h-64 overflow-y-scroll'>
                                        {options.map((interest: any, i: any) => {
                                            return (
                                                <li key={i} onClick={() => { setSelectedInterest(interest.label); }} className={selectedInterest !== interest.label ? 'hover:bg-gray-50' : 'bg-gray-200'}>
                                                    {interest.label}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                }
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={addInte}>
                                    Add Interest
                                </button>
                                <button type="button" onClick={() => { modal?.setModal(false) }} className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalAddInterest