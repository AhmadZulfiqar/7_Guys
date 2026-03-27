import axios from "axios";
import React, { useEffect } from "react";

const PersonalDetails = () => {
  useEffect(() => {
    let getdetails = async () => {
      await axios
        .get("http://localhost:5000/persondetails")
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getdetails();
  },[]);
  return <>
  </>;
};

export default PersonalDetails;
