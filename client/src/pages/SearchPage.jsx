import React, { useEffect, useState } from 'react'
import "../styles/List.scss"
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ListingCard from '../components/ListingCard'
import { useDispatch, useSelector } from 'react-redux'
import { setListings } from '../redux/state'
import { useParams } from 'react-router-dom'

const SearchPage = () => {

    const [loading, setLoading] = useState(true)
    const listings = useSelector((state) => state.listings)
    const dispatch = useDispatch()
    const { search } = useParams()

    useEffect(() => {
        const getSearchPage = async () => {
            try {
                const response  = await fetch(`http://localhost:3001/properties/search/${search}`, {
                    method: "GET"
                })
                const data = await response.json()
                dispatch(setListings({ listings: data }))
                setLoading(false)
            }
            catch (err) {

            }
        }
        getSearchPage()
    }, [search, dispatch])

    return loading ? <Loader /> : (
        <>
          <Navbar />
          <h1 className="title-list">{search}</h1>
          <div className="list">
            {listings?.map(
              ({
                _id,
                creator,
                listingPhotoPaths,
                city,
                province,
                country,
                category,
                type,
                price,
                booking = false,
              }) => (
                <ListingCard
                  listingId={_id}
                  creator={creator}
                  listingPhotoPaths={listingPhotoPaths}
                  city={city}
                  province={province}
                  country={country}
                  category={category}
                  type={type}
                  price={price}
                  booking={booking}
                />
              )
            )}
          </div>
          <Footer />
        </>
      )
}

export default SearchPage
