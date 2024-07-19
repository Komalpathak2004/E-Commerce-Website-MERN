import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"Note Counting Machine"} heading={"Note Counting Machine"}/>
      <HorizontalCardProduct category={"Fake Note Detector"} heading={"Fake Note Detector"}/>

      <VerticalCardProduct category={"Bundle Note Counting Machine"} heading={"Bundle Note Counting Machine"}/>
      <VerticalCardProduct category={"Countmatic"} heading={"Countmatic"}/>
      <VerticalCardProduct category={"Currency Counting Machine"} heading={"Currency Counting Machine"}/>
      <VerticalCardProduct category={"Sorter & CIS"} heading={"Sorter & CIS"}/>
      <VerticalCardProduct category={"Paper Shredders"} heading={"Paper Shredders"}/>
      <VerticalCardProduct category={"Industrial Shredders"} heading={"Industrial Shredders"}/>
      <VerticalCardProduct category={"Official/Corporate Shredders"} heading={"Official/Corporate Shredders"}/>
    </div>
  )
}

export default Home