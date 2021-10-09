import React from 'react'
import CarouselSlider from 'react-carousel-slider';
import styles from './Card.module.css'
  let autoSliding= {
       items: [
        {
          imgSrc: "https://media.istockphoto.com/photos/elearning-concept-online-classes-picture-id1140691163?k=20&m=1140691163&s=612x612&w=0&h=3Cheju65N4DYbgsH-bfFj_-6T_wZKkf_svoj0uRLLtg="
      },
      {
          imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE81rT99UZWXlX_GS2RztoFMK8cDf2hqleQ&usqp=CAU"
      },
      {
          imgSrc: "https://blog-digital.aakash.ac.in/wp-content/uploads/2018/10/online-education-1140x570.png"
      },
      {
          imgSrc: "https://www.cicnews.com/wp-content/uploads/2020/04/20200408onlinestudy.jpg"
      }
       ]
   }

export const HistoryCarousel = () => {
  let manner = {
    autoSliding: {interval: "4s"},
    duration: "2s"
};
let sliderBoxStyle = {
//   height: "300px",
  // width: "600px",
  background: "transparent",
  // border:"1px solid red"
};
let itemsStyle = {
//   width:"400px",
  // height:"20%",
};
let accEleSetting;

let mobileRegx = /Mobi/;
if (mobileRegx.test(navigator.userAgent)) {
    accEleSetting.button = false;
}

let buttonSetting = {
    placeOn: "middle-inside",
    hoverEvent: true,
    style: {
        left: {
            height: "0px",
            width: "0px",
            color: "#929393",
            background: "rgba(225, 228, 232, 0.8)",
            borderRadius: "50%"
        },
        right: {
            height: "0px",
            width: "0px",
            color: "#929393",
            background: "rgba(225, 228, 232, 0.8)",
            borderRadius: "50%"
        }
    }
};
  return (
    <div className={styles.abs2}>
      <CarouselSlider slideItems = {autoSliding.items}  
                                manner = {manner} 
                                buttonSetting = {buttonSetting}
                                sliderBoxStyle={sliderBoxStyle}
                                itemsStyle={itemsStyle} />
</div>
  )
}

