import { Button, Grid } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'

export const BottomPart = () => {
  const history = useHistory()
  const handleForm = () =>{
    history.push("/selectField")
  }
  return (
    <BottomBox>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid item xs={6}>
      <SmallBox>
        <img className="smallBoxImg" src="https://www.studystream.live/assets/images/laptop-img.png" alt="" />
      </SmallBox>
    </Grid>
    <Grid item xs={6}>
      <SmallBox>
        <div className="heading">
            <h3 className="heading-blue">Web App </h3>
            <h3 clasName="heading-normal">to connect in globe</h3>
        </div>  
            <div className="description"> 
            We are working hard behind the scenes to create something awesome. Get random connections for studing and a positive environment to concentrate on your work via video call. See the world through our glasses and let's grow together!
            </div>
            <br />
            <hr className="line"/>
            <p className='about-btn'>Press here to see the world growing. </p>
            <Button onClick={handleForm} color="primary" variant="contained" className="proceed-btn"> Proceed </Button>
      </SmallBox>
    </Grid>
    </Grid>
    </BottomBox>
  )
}

const BottomBox = styled.div`
  width:94%;
  margin:5vh auto;
`

const SmallBox = styled.div`
  max-width:90%;
  height:55vh;

  & .smallBoxImg{
    width: 100%; 
    height: 100%; 
    object-fit:cover;
    align-items: center;
    color:#606574;
  }
  & .heading{
    color:#606574;
      text-align:center;
      margin:-2% 10%;
      display:flex;
      font-size:24px;

      & .heading-blue{
        color:#26168B;
        margin-right:6px;
      }
    }
    & .description{
      color:#606574;
      background-color:#f8f8fc;
      text-align:center;
      margin:2%;
    }
    & .line{
      width:80%;
    }
    & .about-btn{
      color:#606574;
      text-align:center;
      margin:5% auto;
    }
    & .proceed-btn{
      align-items:center;
      width:90%;
      margin:2% 5%;
    }
`