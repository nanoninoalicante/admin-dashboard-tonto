import { Inter } from '@next/font/google'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useMutation } from '@apollo/client';
import Link from 'next/link';
import MenuBar from '../components/MenuBar';
import Select from 'react-select';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [modal, setModal] = useState(false)
    const [seletecTag, setSelectTag] = useState("")
    const GET_TAGS = gql`
    query Tags($limit: Int, $skip: Int) {
      tags(limit: $limit, skip: $skip) {
        name
        interests {
          name
        }
      }
    }
  `;

    const { loading, error, data } = useQuery(GET_TAGS);

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
    const addInterest = (tag: any, interest: any) => {
        const [addInterest, { data, loading, error }] = useMutation(ADD_INTEREST);

        addInterest({ variables: { interest: interest, tag: tag } })
    }

    const ModalAddInterest = () => {
        console.log("fdf")
        const GET_INTERESTS = gql`
                                query Tags {
                                    interests {
                                        name
                                    }
                                }
                            `
        const { loading, error, data } = useQuery(GET_INTERESTS);
        const options: any = [];
        data?.interests.forEach((interest: any) => { options.push(interest.name) })
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
                                                <p className="text-sm text-gray-500">{`Choose one interest to the tag ${seletecTag}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Add Interest</button>
                                    <button type="button" onClick={() => setModal(false)} className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <MenuBar props={"init"}></MenuBar>
            <div className="w-[100%] flex justify-center">
                <>
                    <ul className='grid mt-10 w-1/2 divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto max-h-[50em] '>
                        {data != undefined && data?.tags.map((tag: any, i: any) => {
                            return (
                                <li key={i} className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">
                                                {tag.name}
                                            </p>
                                        </div>
                                        <div onClick={() => { setSelectTag(tag.name); setModal(true) }} className="inline-flex cursor-pointer hover:bg-gray-900 hover:text-white items-center justify-center text-base font-semibold text-gray-900 border border-gray-900 w-7 h-7 rounded-full ">
                                            +
                                        </div>
                                    </div>
                                </li>

                            )
                        })}
                    </ul>
                    {modal && <ModalAddInterest />}
                </>
            </div>

        </>
    )
}
{/* <li key={i} className='grid grid-rows-3 items-center pl-3 bg-gray-300 rounded-lg w-full my-1 h-10'>
    {tag.name}
    <div className='grid justify-self-end grid-cols-2 gap-2'>
        {tag.interests.map((interest: any, i: any) => {
            return (
                <div key={i} className='bg-green-400 text-white p-1 rounded-lg'>
                    {interest?.name}
                </div>
            )
        })}
        <div onClick={() => { setSelectTag(tag.name); setModal(true) }} className='bg-blue-400 w-6 h-6 flex items-center justify-center rounded-full text-white px-2 cursor-pointer'>+</div>
    </div>
</li> */}