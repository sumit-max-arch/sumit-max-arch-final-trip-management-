import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import * as Yup from "yup";
import useSWR from "swr";
import axios from "axios";
import AXIOSAPI from "../axiosapi";
import { useRouter } from 'next/router';

// Emotion Styling component :

const Back = styled.span`
  background-color: #ff3300;
  color: #fff;
  padding: 10px;
  border-radius: 3px;
  text-decoration-line: none;
`;
function Write() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Form validation rules :

  const validationSchema = Yup.object().shape({
    start_date: Yup.string()
      .required("Start date is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "start date must be a valid date in the format YYYY-MM-DD"
      ),
    end_date: Yup.string()
      .required("End date is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "start date must be a valid date in the format YYYY-MM-DD"
      ),
    company_name: Yup.string().required(" Company Name is required"),
    street: Yup.string().required(" Street Name is required"),
    street_num: Yup.string().required(" Street Number is required"),
    city: Yup.string().required(" City Name is required"),
    country: Yup.string().required(" Country Name is required"),
    zip: Yup.string().required(" zip is required"),
    covid_test_date: Yup.string()
      .required("Covid Test date is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "start date must be a valid date in the format YYYY-MM-DD"
      ),
  });

  const [allCountry, setAllCountry] = useState([]);

  const contryData = () => {
    AXIOSAPI.get("/country").then((resCon) => {
      console.log("country", resCon);
      setAllCountry(resCon.data);
    });
  };
  useEffect(() => {
    contryData();
  }, []);

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const router = useRouter();

  function onSubmit(data) {

    const newdata = {
      start_date: data.start_date,
      end_date: data.end_date,
      company_name: data.company_name,
      address: {
        street: data.street,
        street_num: parseInt(data.street_num),
        city: data.city,
        country: data.country,
        zip: data.zip,
      },
      covid: data.covid,
      covid_test_date: data.covid_test_date,
    };

    AXIOSAPI.post("/trip", newdata)
      .then((res) => {
        console.log("res-post", res);
        if (res.status == 200) {
          setError('')
          setSuccess(true)
          router.push('/articles')
          reset()
        }
        if (res.status == 404) {

          setSuccess(false)
          router.push('/write')
        }
        if (res.status == 400) {

          setSuccess(false)

          router.push('/write')
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }

  return (
    <div className="card m-3">
      <h5 className="card-header">Add a New Trip</h5>
      <div className="card-body">
        {
          success && (<><p>Success! Trip is Added</p></>)
        }
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col">
              <label>Journey Start Date</label>
              <input
                name="start_date"
                type="date"
                {...register("start_date")}
                className={`form-control ${errors.start_date ? "is-invalid" : ""
                  }`}
              />
              <div className="invalid-feedback">
                {errors.start_date?.message}
              </div>
            </div>
            <div className="form-group col">
              <label>Journey End Date</label>
              <input
                name="end_date"
                type="date"
                {...register("end_date")}
                className={`form-control ${errors.end_date ? "is-invalid" : ""
                  }`}
              />
              <div className="invalid-feedback">{errors.end_date?.message}</div>
            </div>
            <div className="form-group col-5">
              <label>Company Name</label>
              <input
                name="company_name"
                type="text"
                {...register("company_name")}
                className={`form-control ${errors.company_name ? "is-invalid" : ""
                  }`}
              />
              <div className="invalid-feedback">
                {errors.company_name?.message}
              </div>
            </div>
            <div className="form-group col-5">
              <label>street Name</label>
              <input
                name="street"
                type="text"
                {...register("street")}
                className={`form-control ${errors.street ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.street?.message}</div>
            </div>

            <div className="form-group col-5">
              <label>Street Number</label>
              <input
                name="street_num"
                type="number"
                {...register("street_num", {
                  required: true,
                  valueAsNumber: true,
                })}

                className={`form-control ${errors.street_num ? "is-invalid" : ""
                  }`}
              />
              <div className="invalid-feedback">
                {" "}
                {errors.street_num?.message}
              </div>
            </div>

            <div className="form-group col-5">
              <label>City Name</label>
              <input
                name="city"
                type="text"
                {...register("city")}
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.city?.message}</div>
            </div>
            <div className="form-group col">
              <label>Country</label>
              <select
                name="country"
                {...register("country")}
                className={`form-control ${errors.country ? "is-invalid" : ""}`}
              >
                <option value=''>--Select Country--</option>
                {allCountry.map((item) => (
                  <option key={item.label} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{errors.country?.message}</div>
            </div>
            <div className="form-group col-5">
              <label>zip</label>
              <input
                name="zip"
                type="text"
                {...register("zip")}
                className={`form-control ${errors.zip ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.zip?.message}</div>
            </div>
            <div className="form-group form-check">
              <input
                name="covid"
                type="checkbox"
                {...register("covid")}
                id="covid"
                className={`form-check-input ${errors.acceptTerms ? "is-invalid" : ""
                  }`}
              />
              <label htmlFor="covid" className="form-check-label">
                covid
              </label>
              <div className="invalid-feedback">
                {errors.acceptTerms?.message}
              </div>
            </div>
            <div className="form-group col">
              <label>Covid Test Date</label>
              <input
                name="covid_test_date"
                type="date"
                {...register("covid_test_date")}
                className={`form-control ${errors.covid_test_date ? "is-invalid" : ""
                  }`}
              />
              <div className="invalid-feedback">
                {errors.covid_test_date?.message}
              </div>
            </div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-1">
              Register
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </form>

        <div className="back-to-home">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link href="/">
                <a className="back-home">
                  <Back>Back To HomePage</Back>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Write;
