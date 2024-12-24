import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      const { id, updatedData } = action.payload;
      const studentIndex = state.students.findIndex(
        (student) => student.studentId === id
      );
      if (studentIndex !== -1) {
        state.students[studentIndex] = {
          ...state.students[studentIndex],
          ...updatedData,
        };
      }
    },

    deleteStudent: (state, action) => {
      const { id } = action.payload;
      state.students = state.students.filter(
        (student) => student.studentId !== id
      );
    },



  },
});

export const { addStudent, updateStudent, deleteStudent } =
  studentsSlice.actions;

export default studentsSlice.reducer;
