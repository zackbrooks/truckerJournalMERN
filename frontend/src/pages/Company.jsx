import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Wrapper from "../components/HOC/Wrapper";

const OneCompany = () => {
  const { id: companyId } = useParams();
  const [company, setCompany] = useState({});
  const {
    name,
    email,
    location,
    notes,
    phoneNumber,
    rating,
    routing,
    _id: id,
    type,
  } = company;

  const getCompany = async (id) => {
    const company = await axios.get(
      `http://localhost:5000/company/viewone/${companyId}`
    );
    // console.log("companies", company.data);
    setCompany(company.data);
  };
  useEffect(() => {
    getCompany();
  }, []);

  return <div>{company.name}</div>;
};

export default Wrapper(OneCompany);
