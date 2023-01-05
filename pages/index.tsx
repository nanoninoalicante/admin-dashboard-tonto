import { Inter } from '@next/font/google'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useMutation } from '@apollo/client';
import MenuBar from '../components/MenuBar';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import ModalAddInterest from '../components/ModalAddInterest';
import Router, { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })
interface ModalContext {
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const TagContext = React.createContext('tag')
export const ModalContext = React.createContext<ModalContext | null>(null)
export default function Home() {
    const [modal, setModal] = useState(false)
    const [selectedTag, setSelectedTag] = useState("")
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

    return (
        <TagContext.Provider value={selectedTag} >
            <ModalContext.Provider value={{
                modal, setModal
            }}>
                <div className='h-screen bg-white'>
                    <MenuBar props={"init"}></MenuBar>
                    <div className="w-[100%] flex justify-center">
                        <ul className='grid mt-10 w-[50%] overflow-y-auto max-h-[50em] p-2 scrollbar-hide'>
                            {data != undefined ? data?.tags.map((tag: any, i: any) => {
                                return (
                                    <li key={i} className="py-3 sm:py-4 text-gray-900 bg-gray-200 rounded-lg my-1 px-2">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 min-w-0 hover:underline">
                                                <p className="text-sm font-medium ">
                                                    {tag.name}
                                                </p>
                                            </div>
                                            {tag.interests &&
                                                tag.interests.map((interest) => {
                                                    return (
                                                        <div className='py-1 px-2 bg-green-400 rounded-lg text-white'>
                                                            {interest.name}
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div onClick={() => { setSelectedTag(tag.name); setModal(true) }}
                                                className="inline-flex cursor-pointer bg-blue-400 hover:bg-blue-500 items-center justify-center text-base font-semibold text-white w-7 rounded-lg py-1">
                                                +
                                            </div>
                                        </div>
                                    </li>
                                )
                            }) :
                            <div role="status" className='flex justify-center'>
                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        }                     
                             
                        </ul>
                        {modal && <ModalAddInterest />}
                    </div>
                </div>
            </ModalContext.Provider>
        </TagContext.Provider>
    )
}
