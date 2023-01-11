import { Inter } from '@next/font/google'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useMutation } from '@apollo/client';
import MenuBar from '../components/MenuBar';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import ModalAddInterest from '../components/ModalAddInterest';
import algoliasearch from 'algoliasearch';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  Configure,
  Menu,
  RefinementList,
  InfiniteHits
} from 'react-instantsearch-hooks-web';
interface ModalContext {
  modal: boolean,
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
);

export const TagContext = React.createContext('tag')
export const ModalContext = React.createContext<ModalContext | null>(null)
export default function Home() {
  const [modal, setModal] = useState(false)
  const [selectedTag, setSelectedTag] = useState("")
  const [focused, setFocused] = useState(false)

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
  const { loading, error, data } = useQuery(GET_TAGS);

  const Hit = (props) => {
    return (
      <div className='w-full grid grid-cols-2 items-center h-10'>
        <div>
          {props.hit.tagName}
        </div>
        <div className="grid justify-self-end bg-gray-400 hover:bg-gray-500 cursor-pointer px-2 rounded-full mr-2"
          onClick={() => { setSelectedTag(props.hit.tagName); setModal(true) }}>
          +
        </div>
        {modal && <ModalAddInterest />}
      </div>
    )
  }
  return (
    <TagContext.Provider value={selectedTag} >
      <ModalContext.Provider value={{
        modal, setModal
      }}>
        <div className='h-screen bg-white'>
          <MenuBar props={"init"}></MenuBar>
          <div className="w-[100%] flex justify-center">
            <InstantSearch indexName='staging_hashtags' searchClient={searchClient} >
              <Configure hitsPerPage={10} />
              {data != undefined ? <ul className='grid mt-10 w-[50%] overflow-y-auto max-h-[50em] p-2 scrollbar-hide'>
                <SearchBox
                  placeholder='Search your tag..'
                  onFocus={() => { setFocused(true) }}
                  onKeyDown={() => { setFocused(true) }}
                  submitIconComponent={() => { return <></> }}
                  loadingIconComponent={() => { return <></> }}
                  resetIconComponent={() => { return <></> }}
                  classNames={{
                    root: 'w-full',
                    form: 'w-full border rounded-lg',
                    input: 'bg-transparent w-full px-2 focus:outline-none',
                  }}
                />
                {focused && (
                  <Hits hitComponent={Hit}
                    onMouseLeave={() => { setFocused(false)} }
                    classNames={{
                      root: "absolute border-2 border-gray-500 bg-white w-auto rounded-lg flex items-center mt-6",
                      list: "w-auto",
                      item: "hover:bg-gray-300 rounded-lg w-full"
                    }}
                  />
                )}
                {data.tags.map((tag, i) => {
                  return (
                    <div key={i} className="py-3 sm:py-4 text-gray-900 bg-gray-200 rounded-lg my-1 px-2">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0 hover:underline">
                          <p className="text-sm font-medium">
                            {tag.name}
                          </p>
                        </div>
                        {tag?.interests && tag.interests.map((interest, i) => {
                          return (
                            <div key={i} className='bg-green-500 rounded-lg py-1 px-2 text-white'>
                              {interest.name}
                            </div>
                          )
                        })}
                        <div onClick={() => { setFocused(true); setSelectedTag(tag.name); setModal(true) }}
                          className="inline-flex cursor-pointer bg-blue-400 hover:bg-blue-500 items-center justify-center text-base font-semibold text-white w-7 rounded-lg py-1">
                          +
                        </div>
                      </div>
                    </div>
                  )
                })}
              </ul> :
                <div role="status" className='flex justify-center mt-14'>
                  <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                </div>
              }
              {modal && <ModalAddInterest />}
            </InstantSearch>
          </div>
        </div>
      </ModalContext.Provider>
    </TagContext.Provider>
  )
}


