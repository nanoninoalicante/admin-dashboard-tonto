import { Inter } from '@next/font/google'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useMutation } from '@apollo/client';
import MenuBar from '../components/MenuBar';
import {  useContext, useState } from 'react';
import React from 'react';
import ModalAddInterest from '../components/ModalAddInterest';

const inter = Inter({ subsets: ['latin'] })

export const TagContext = React.createContext('tag')
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
            <div className='h-screen bg-[#96ADC8]'>
                <MenuBar props={"init"}></MenuBar>
                <div className="w-[100%] flex justify-center">
                    <ul className='grid mt-10 w-[50%] divide-y divide-gray-700 overflow-y-auto max-h-[50em] p-2 border-2 border-black rounded-lg scrollbar-hide'>
                        {data != undefined && data?.tags.map((tag: any, i: any) => {
                            return (
                                <li key={i} className="py-3 sm:py-4 text-gray-900">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 min-w-0 hover:underline">
                                            <p className="text-sm font-medium ">
                                                {tag.name}
                                            </p>
                                        </div>
                                        <div onClick={() => { setSelectedTag(tag.name); setModal(true) }} className="inline-flex cursor-pointer hover:bg-gray-900 hover:text-white items-center justify-center text-base font-semibold text-gray-900 border-2 border-gray-900 w-7 h-7 rounded-full ">
                                            +
                                        </div>
                                    </div>
                                </li>

                            )
                        })}
                    </ul>
                    {modal && <ModalAddInterest />}
                </div>
            </div>
        </TagContext.Provider>
    )
}
