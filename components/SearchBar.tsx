import { useQuery } from "@apollo/client";
import algoliasearch from "algoliasearch";
import { useState } from "react";
import { InstantSearch, Configure, SearchBox, Hits } from "react-instantsearch-hooks-web"
import ModalAddInterest from "./ModalAddInterest";

const SearchBar = () => {
    const [modal, setModal] = useState(false);
    const [selectedTag, setSelectedTag] = useState("");
    const [focused, setFocused] = useState(false);
    const searchClient = algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
        process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
    );
    const Hit = (props: any) => {
        return (
            <div className='w-full grid grid-cols-2 items-center h-10'>
                {props.hit.tagName}
                <div className="grid justify-self-end bg-gray-400 hover:bg-gray-500 cursor-pointer px-2 rounded-full mr-2"
                    onClick={() => { setSelectedTag(props.hit.tagName); setModal(true) }}>
                    +
                </div>
                {modal && <ModalAddInterest />}
            </div>
        )
    }
    return (
        <InstantSearch indexName='prod_hashtags' searchClient={searchClient} >
            <Configure hitsPerPage={10} />
            <SearchBox
                placeholder='Search your tag...'
                onFocus={() => { setFocused(true) }}
                onKeyDown={() => { setFocused(true) }}
                submitIconComponent={() => { return <></> }}
                loadingIconComponent={() => { return <></> }}
                resetIconComponent={() => { return <></> }}
                classNames={{
                    root: 'w-full mt-8',
                    form: 'w-full border rounded-lg',
                    input: 'bg-transparent w-full px-2 focus:outline-none',
                }}
            />
            {focused && (
                <Hits hitComponent={Hit}
                    onMouseLeave={() => { setFocused(false) }}
                    classNames={{
                        root: "absolute border-2 border-gray-500 bg-white rounded-lg mt-16 w-1/3",
                        list: "w-auto pl-2",
                        item: "hover:bg-gray-300 rounded-lg w-full"
                    }}
                />
            )}
        </InstantSearch>
    )
}

export default SearchBar;