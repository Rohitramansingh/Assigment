// src/components/Home.js
import React, { useEffect, useState } from "react";
import { Router, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent, searchByName } from "./storage/Slice";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();
  const alldata = useSelector((state) => state.students);
  const [deleteDialog, setDeleteDialog] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState(alldata)

  const dispatch = useDispatch();


  useEffect(() => {

    searchByName()

  }, [search])

  useEffect(() => {
    setData(alldata)
  }, [alldata])

  const searchByName = () => {
    if (search.trim() == "") {
      setData(alldata)
    } else {
      const filterdata = data.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase())
      );
      setData(filterdata)

    }

  }

  console.log("data", data);

  return (
    <div className="mt-5">
      <Paper className="mx-4 p-5 ">
        <div className="d-md-flex d-block justify-content-between my-2 mx-1  ">
          <p className="fs-5"> Dashboard</p>

          <div className="d-flex gap-2 ">
            <input
              className=" border-1 border-secondary rounded py-0 px-3"
              style={{ height: "40px" }}
              label="Contact"
              type="text"
              name="search"
              placeholder="search"
              value={search}
              onChange={(e) => {
                if (e.target.value.trim() !== "" || e.target.value == "") {

                  setSearch(e.target.value);
                }
              }}
            />

            <p
              variant="outlined"
              style={{
                border: "#6c5ffc 1px solid ",
                color: "#6c5ffc",
                height: "40px",
                borderRadius: "5px"
              }}
              onClick={() => navigate(`/form`)}
            >


              <PersonAddAltIcon
                sx={{
                  width: "100px",
                  fontSize: "30px",
                  height: "40px",
                  padding: "5px",
                  "@media (max-width: 390px)": {
                    width: "30px"
                  },

                  "&:hover": { background: "#6c5ffc", color: "white" },
                }}
              />

            </p>

          </div>


        </div>

        {/* Table */}
        <TableContainer className="mb-5">
          <Table className="border d-none d-lg-table   ">
            <TableHead style={{ background: "#f8f8f9" }}>
              <TableRow>
                <TableCell className="text-center">Sr No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Standard</TableCell>
                <TableCell>Roll No</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Aadhaar No</TableCell>
                <TableCell style={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="bg-white">
              {data?.length > 0 ? (
                data.map((val, index) => (
                  <TableRow key={val.studentId}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>{val.name}</TableCell>
                    <TableCell>{val.standard}</TableCell>
                    <TableCell>{val.roll}</TableCell>
                    <TableCell>{val.dob}</TableCell>
                    <TableCell>{val.gender}</TableCell>
                    <TableCell>{val.contact}</TableCell>
                    <TableCell>{val.email}</TableCell>
                    <TableCell>{val.adhar}</TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Button>
                        <EditIcon
                          onClick={() => navigate(`/form/${val?.studentId}`)}
                          style={{ color: "#6c5ffc" }}
                        />
                      </Button>

                      <Button>
                        <DeleteIcon
                          style={{ color: "#6c5ffc" }}
                          onClick={() => {
                            setDeleteDialog(val?.studentId);
                          }}
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    style={{
                      background: "white",
                      padding: "15px",
                      textAlign: "center",
                    }}
                    colSpan={8}
                  >
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Responsive view for small screens */}
          <div className="d-block d-lg-none mt-3">
            {data?.length > 0 ? (
              data.map((val, index) => (
                <div key={val.studentId} className="border p-3 mb-3">
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between">
                      <strong>Name:</strong>
                      <span>{val.name}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <strong>Standard:</strong>
                      <span>{val.standard}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <strong>Roll No:</strong>
                      <span>{val.roll}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <strong>DOB:</strong>
                      <span>{val.dob}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <strong>Gender:</strong>
                      <span>{val.gender}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <strong>Contact:</strong>
                      <span>{val.contact}</span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <strong>Email:</strong>
                      <span>{val.email}</span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <strong>Aadhaar No:</strong>
                      <span>{val.adhar}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <strong>Action:</strong>
                      <div className="d-flex gap-2 ">
                        <Button
                          onClick={() => navigate(`/form/${val.studentId}`)}
                        >
                          <EditIcon style={{ color: "#6c5ffc" }} />
                        </Button>

                        <Button>
                          <DeleteIcon style={{ color: "#6c5ffc" }} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <p>No Data Found</p>
              </div>
            )}
          </div>

          {/* Delete Dialog ----------------------------------------------------- */}
          <Dialog
            open={deleteDialog ? true : false}
            onClose={() => setDeleteDialog("")}
            aria-labelledby="form-dialog-title"
            fullWidth
          >
            <DialogTitle
              style={{
                display: "flex",
                color: "white",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#372f89ad",
              }}
              id="form-dialog-title"
            >
              Delete Record
              <IconButton
                aria-label="close"
                onClick={() => {
                  setDeleteDialog("");
                }}
                sx={{
                  padding: "0",
                  color: "#000",
                }}
              >
                <Close style={{ color: "white" }} />
              </IconButton>
            </DialogTitle>
            <DialogContent className="">
              <p className="text-lg my-3">
                Are you sure you want to delete this record?
              </p>
              <div class="d-flex justify-content-end mt-5 gap-3">
                <Button
                  variant="outlined"
                  onClick={() => setDeleteDialog("")}
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
                  No
                </Button>
                <Button
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
                  onClick={() => {
                    dispatch(deleteStudent({ id: deleteDialog }))
                    setDeleteDialog("")
                    setSearch("")
                    toast.success("Record deleted Successfully")
                  }
                  }
                  className="btn-reject"
                >
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Home;
