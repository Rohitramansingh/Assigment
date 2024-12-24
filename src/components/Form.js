import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { addStudent, updateStudent } from "./storage/Slice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as Yup from "yup";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const Form = () => {
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [initialValues, setInitialValues] = useState({
    name: "",
    roll: "",
    gender: "",
    dob: "",
    standard: "",
    contact: "",
    email: "",
    standard: "",
    address: "",
    adhar: "",
  });
  const studentdata = useSelector((state) => state.students);

  useEffect(() => {
    if (id) {
      if (studentdata?.length > 0) {
        const find = studentdata.find((val) => val.studentId == id);
        if (find) setInitialValues(find);
      }
    }
  }, [id]);

  const studentSchema = Yup.object({
    name: Yup.string().trim().required(" Student Name is required"),

    roll: Yup.string().trim().required("Please Enter Roll Number"),
    gender: Yup.string().required("please select gender"),
    dob: Yup.string().required("Please select Date of birth "),

    standard: Yup.string().required("Please select standard "),
    contact: Yup.string()
      .min(10, "please enter 10 digit valid number")
      .max(10, "please enter 10 digit valid number")
      .required("please enter contact number"),

    adhar: Yup.string()
      .trim()
      .min(12, "please enter 12 digit valid number")
      .max(12, "please enter 12 digit valid number")
      .required("please enter Aadhaar number"),
    email: Yup.string()
      .trim()
      .email("Please enter a valid email address")
      .required("Please enter Email"),
    address: Yup.string()
      .trim()
      .min(5, "please enter at least more than 5 character")
      .required("Please enter address"),
  });

  const postData = (values) => {
    try {
      if (id) {
        dispatch(updateStudent({ id, updatedData: values }));
        toast.success("Student data Update successfully");
      } else {
        const studentId = Date.now().toString();
        const newdata = { ...values, studentId: studentId.toString() };
        dispatch(addStudent(newdata));
        toast.success("Student Register successfully");
      }
      navigate("/");
    } catch (error) {
      console.log("error", error);
      toast.error("Something went Wrong!");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: studentSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      postData(values);
    },
  });

  const allClasses = [
    "1th",
    "2th",
    "3th",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
  ];

  //   clgarea
  console.log("formik", formik);
  console.log("id", id);

  return (
    <Paper style={{ margin: "20px 10% 5px 10%", padding: "20px" }}>
      <div className="d-flex gap-1  mt-1 mb-5 ">
        <div className="d-flex align-items-center justify-content-center">
          <ArrowBackIcon onClick={() => navigate(-1)} />
        </div>

        <p className="fs-4  mb-0 ">{id ? "Edit Student" : "Add Student"}</p>
      </div>

      <form style={{ marginTop: "5px" }} onSubmit={formik.handleSubmit}>
        <div className="row g-3">
          {/* Student Name */}
          <div className="col-12  col-lg-6">
            <TextField
              style={{ width: "100%", backgroundColor: "white" }}
              id="outlined-search"
              label="Student Name"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="fs-6 text-danger my-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Roll Number */}
          <div className="col-12  col-lg-6">
            <TextField
              style={{ width: "100%", backgroundColor: "white" }}
              className="w-full bg-white"
              id="outlined-search"
              label="Roll Number"
              type="text"
              name="roll"
              value={formik.values.roll}
              onChange={formik.handleChange}
            />
            {formik.touched.roll && formik.errors.roll && (
              <p className="fs-6 text-danger my-1">{formik.errors.roll}</p>
            )}
          </div>

          {/* Gender */}
          <div className="col-12  col-lg-6">
            <FormControl className="bg-white" fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            {formik.touched.gender && formik.errors.gender && (
              <p className="fs-6 text-danger my-1">{formik.errors.gender}</p>
            )}
          </div>

          {/* Standard */}
          <div className="col-12  col-lg-6">
            <FormControl className="bg-white" fullWidth>
              <InputLabel id="demo-simple-select-label">Standard</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Standard"
                name="standard"
                value={formik.values.standard}
                onChange={formik.handleChange}
              >
                {allClasses.map((val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formik.touched.standard && formik.errors.standard && (
              <p className="fs-6 text-danger my-1">{formik.errors.standard}</p>
            )}
          </div>

          {/* Contact */}
          <div className="col-12  col-lg-6">
            <TextField
              style={{ width: "100%", backgroundColor: "white" }}
              className="w-full bg-white"
              id="outlined-search"
              label="Contact"
              type="text"
              name="contact"
              value={formik.values.contact}
              onChange={(e) => {
                const value = e.target.value;
                if ((!isNaN(value) && value.length <= 10) || value === "") {
                  formik.setFieldValue("contact", value);
                }
              }}
            />
            {formik.touched.contact && formik.errors.contact && (
              <p className="fs-6 text-danger my-1">{formik.errors.contact}</p>
            )}
          </div>

          {/* Email */}
          <div className="col-12  col-lg-6">
            <TextField
              style={{ width: "100%", backgroundColor: "white" }}
              className="w-full bg-white"
              id="outlined-search"
              label="Email"
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="fs-6 text-danger my-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="col-12  col-lg-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Date of birth"
                  value={formik.values.dob ? dayjs(formik.values.dob) : null}
                  onChange={(newDate) => {
                    formik.setFieldValue("dob", newDate.format("YYYY-MM-DD"));
                  }}
                  maxDate={dayjs()}
                />
              </DemoContainer>
            </LocalizationProvider>
            {formik.touched.dob && formik.errors.dob && (
              <p className="fs-6 text-danger my-1">{formik.errors.dob}</p>
            )}
          </div>

          <div className="col-12  col-lg-6 pt-2 ">
            <TextField
              style={{ width: "100%", backgroundColor: "white" }}
              className="w-full bg-white"
              id="outlined-search"
              label="Aadhaar Number"
              type="text"
              placeholder="Enter 12 Digit Aadhaar Number"
              name="adhar"
              value={formik.values.adhar}
              onChange={(e) => {
                const value = e.target.value;
                if ((!isNaN(value) && value.length <= 12) || value === "") {
                  formik.setFieldValue("adhar", value);
                }
              }}
            />
            {formik.touched.adhar && formik.errors.adhar && (
              <p className="fs-6 text-danger my-1">{formik.errors.adhar}</p>
            )}
          </div>

          {/* Address */}
          <div className="col-12">
            <TextField
              multiline
              rows={3}
              style={{ width: "100%", backgroundColor: "white" }}
              className="w-full bg-white"
              id="outlined-search"
              label="Address"
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="fs-6 text-danger my-1">{formik.errors.address}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          variant="outlined"
          sx={{
            "&:hover": {
              backgroundColor: "#6c5ffc",
              color: "white",
            },
            borderColor: "#6c5ffc",
            color: "#6c5ffc",
            marginTop: "10px",
          }}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
