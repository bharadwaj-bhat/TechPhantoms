import React, { useEffect } from 'react'
import {useSelector, shallowEqual, useDispatch} from 'react-redux'
import { GetLoggedData } from '../../Redux/action';
import { GetData } from '../../Utils/LocalStorageData';
import {TextField, Box, Grid} from '@material-ui/core';
import styled from 'styled-components';
import { DetailSection } from './DetailSection';
import { RightCarousel } from './RightCarousel';
import { BottomPart } from './BottomPart';



export const Profile = () => {
    const dispatch = useDispatch()
    const { data, loggedData, isLoading, isError } = useSelector(
        (state) => state.homeReducer,
        shallowEqual
    );
      
    useEffect(()=>{
      const loggedUser = GetData("loginData")
      const id = loggedUser._id
      userInfo(id)
    },[])

    const userInfo = (id) =>{
       dispatch(GetLoggedData(id))
    }

    console.log(loggedData, "loginData");
  return (
    <>
    <div>
    <MainContainer>
    <Box className="cont-box" sx={{ flexGrow: 1 }}>
      <Grid className="grid-cont" container spacing={2}>
        <Grid className="grid-item1" item  xs={7}>
          <DetailSection loggedData={loggedData}/>
        </Grid>

        <Grid className="grid-item2" item  xs={5}>
          <RightCarousel />
        </Grid>
        <Grid className="grid-item" item  xs={12}>
          <BottomPart/>
        </Grid>
      </Grid>
    </Box>
    </MainContainer>
    </div>
    </>
  )
}

const MainContainer = styled.div`
  /* width:100%; */
  /* margin:500px auto; */

  & .cont-box{
    padding:8% 2%;
  }

  & .grid-cont{
  }

  & .grid-item1{
    position: relative;

  }
  & .grid-item2{
    /* border:1px solid blue; */
    max-width:500px;
  }
  & .grid-item{
    position:relative;
  }
`
