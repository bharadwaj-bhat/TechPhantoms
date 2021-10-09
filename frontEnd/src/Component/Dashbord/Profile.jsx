import React, { useEffect } from 'react'
import {useSelector, shallowEqual, useDispatch} from 'react-redux'
import { GetLoggedData } from '../../Redux/action';
import { GetData } from '../../Utils/LocalStorageData';
import {TextField, Box, Grid} from '@material-ui/core';
import styled from 'styled-components';
import { DetailSection } from './DetailSection';
import { RightCarousel } from './RightCarousel';
import { HistoryCarousel } from './HistoryCarousel';


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
    <MainContainer>
    <Box className="cont-box" sx={{ flexGrow: 1 }}>
      <Grid className="grid-cont" container spacing={2}>
        <Grid className="grid-item1" item spacing={2} xs={7}>
          <DetailSection className="grid-item1-comp" loggedData={loggedData}/>
        </Grid>

        <Grid className="grid-item2" item spacing={2} xs={5}>
          <RightCarousel />
        </Grid>
        <Grid className="grid-item" item spacing={2} xs={12}>
          {/* <HistoryCarousel/> */}
        </Grid>
      </Grid>
    </Box>
    </MainContainer>
    </>
  )
}

const MainContainer = styled.div`
  width:100%;

  & .cont-box{
  }

  & .grid-cont{
  }

  & .grid-item1{
    
    & .grid-item1-comp{
      display: none;
  position: relative;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
    }
  }
  & .grid-item2{
    /* border:1px solid blue; */
    max-width:500px;
  }
`
