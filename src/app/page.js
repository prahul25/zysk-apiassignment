"use client"
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const App = () => {
  const [data , setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        setData(response.data)
        setFilteredData(response.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  
  const validationSchema = Yup.object({
    searchQuery: Yup.string().required("Search query is required"),
  });


  const handleSearch = (values) => {
    const { searchQuery } = values;
    console.log(searchQuery)
    const results = data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredData(results); 
  };

  return (
    <div className="mt-12 ml-5">
      <h1 className="mb-2">Todo Search</h1>

      
      <Formik
        initialValues={{ searchQuery: "" }} 
        validationSchema={validationSchema}
        onSubmit={handleSearch}
      >
        
          <Form>
            <div className="flex gap-4">
              <Field
                type="text"
                name="searchQuery"
                placeholder="Search todos..."
                className="rounded-md px-2 py-[2px] text-gray-800"
              />
              <ErrorMessage name="searchQuery" component="div" className="text-red-500" />
            </div>
            <button type="submit" className="bg-blue-500 text-black px-3 py-[1px] mt-2 rounded-md">
              Submit
            </button>
          </Form>
        
      </Formik>

      <div>
        {filteredData.length > 0 ? (
          <ul className="mt-6">
            {filteredData.map((item) => (
              <li key={item.id} className="text-gray-300">
                {item.id}. {item.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
