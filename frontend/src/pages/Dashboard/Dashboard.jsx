import { useEffect, useState, useCallback } from "react";
import { DashboardHeader } from "../../components/DashboardHeader";
import { PresentationCard } from "../../components/PresentationCard";
import axios from "axios";
import Logout from "../../Logout";
export default function Dashboard({ token, setTokenFn }) {
  console.log("token in dashboard" + token)
  console.log("set token function: " + setTokenFn )
  return (
    <> 

              <Logout token= { token } setToken={ setTokenFn } />
      

    </>
  )
}