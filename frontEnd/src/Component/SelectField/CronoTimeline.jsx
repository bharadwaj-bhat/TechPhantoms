import React from "react"
  import { Chrono } from "react-chrono";
  
 export const CronoTimeline = () => {
    const items = [{
      title: "May 1940",
      cardTitle: "Dunkirk",
      cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
      media: {
        type: "IMAGE",
        source: {
          url: "http://someurl/image.jpg"
        }
      }
    },
    {
        title: "May 1940",
        cardTitle: "Dunkirk",
        cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
        cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
        media: {
          type: "IMAGE",
          source: {
            url: "http://someurl/image.jpg"
          }
        }
      },
      {
        title: "May 1940",
        cardTitle: "Dunkirk",
        cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
        cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
        media: {
          type: "IMAGE",
          source: {
            url: "http://someurl/image.jpg"
          }
        }
      } ]

    return (
      <div style={{ width: "500px", height: "400px" }}>
        <Chrono items={items}
        enableOutline
        theme={{ 
            primary: "#26168bc1",
            secondary: "#82ccee5a",
            cardBgColor: "linear-gradient(90deg, #82ccee5a 50%, #ffc75f5e 50%)",
            cardForeColor: "violet",
            titleColor: "black"
          }}
        mode="VERTICAL_ALTERNATING" />
        
      </div>
    )
  }