import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gigReducer, INITIAL_STATE } from "../reducers/gigReducer";
import newRequest from "../utils/newRequest";
import upload from "../utils/upload";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const queryClient = useQueryClient();
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: [e.target.name], value: e.target.value },
    });
  };

  const handleFeatures = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_FEATURES", payload: e.target[0].value });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "Add_IMAGES", payload: { cover, images } });
    } catch (err) {}
  };

  const handleRemove = (feature) => {
    dispatch({ type: "REMOVE_FEATURES", payload: feature });
  };

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGig"]);
    },
  });

  const handleSubmit = async () => {
    mutation.mutate(state);
    navigate("/mygigs");
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="flex justify-center ">
        <div className="py-12 w-[1400px] ">
          <h1 className="font-bold md:p-0 px-6 mb-8 text-xl">Add New Gig</h1>
          <div className="flex w-[400px] md:w-full justify-between  px-2 md:p-0 md:flex-row flex-col  gap-24">
            {/* left */}
            <div className="flex   px-4 flex-1 flex-col gap-3 justify-between">
              <label>Title</label>
              <input
                className="input-control"
                onChange={handleChange}
                name="title"
                type="text"
                placeholder="e.g. I will do something I'm really good at"
              />
              <label>Category</label>
              <select
                className="input-control"
                onChange={handleChange}
                name="category"
                id="category"
              >
                <option value="design">Design</option>
                <option value="web">Web Development</option>
                <option value="animation">Animation</option>
                <option value="music">Music</option>
                <option value="marketing">Digital Marketing</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="translations">Writing Translations</option>
              </select>
              <div className="flex  items-center md:flex-row flex-col gap-4">
                <div className="flex flex-col  gap-4">
                  <label htmlFor="">Cover Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    onChange={(e) => setSingleFile(e.target.files[0])}
                  />
                  <label htmlFor="">Upload Images</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                  />
                </div>
                <button
                  onClick={handleUpload}
                  className="primary h-[60px] mt-5 w-[100px]  md:w-[150px] rounded-xl  font-bold  md:p-2"
                >
                  {uploading ? "Uploading" : "Upload"}
                </button>
              </div>
              <label htmlFor="">Description</label>
              <textarea
                name="desc"
                id=""
                onChange={handleChange}
                className="input-control"
                placeholder="Brief description to introduce your service to customers"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            {/* right */}
            <div className="flex  px-4 flex-1 flex-col gap-3 justify-between">
              <label htmlFor="">Service Title</label>
              <input
                className="input-control"
                type="text"
                onChange={handleChange}
                name="shortTitle"
                placeholder="eg: 1 page web design"
              />
              <label htmlFor="">Short Description</label>
              <textarea
                className="input-control"
                name="shortDesc"
                id=""
                cols="30"
                rows="10"
                onChange={handleChange}
                placeholder="Short description of your service"
              ></textarea>
              <label htmlFor="">Delivery Time (e.g. 3 days)</label>
              <input
                className="input-control"
                name="deliveryTime"
                onChange={handleChange}
                type="number"
                min={1}
              />
              <label htmlFor="">Revision Number</label>
              <input
                className="input-control"
                type="number"
                onChange={handleChange}
                name="revisionNumber"
                min={1}
              />
              <label>Add Features</label>
              <form
                className="flex  items-center gap-4"
                onSubmit={handleFeatures}
              >
                <input
                  className="input-control w-full "
                  type="text"
                  placeholder="e.g. page design"
                />
                <button type="submit" className="p-4 primary  rounded-md">
                  Add
                </button>
              </form>
              <div className="flex gap-4 flex-wrap">
                {state?.features.map((f) => (
                  <div key={f}>
                    <button className="border border-red-500 flex h-[30px] items-center gap-4 text-[red] text-sm font-[300] p-4 rounded-lg ">
                      {f}
                      <span onClick={() => handleRemove(f)}>X</span>
                    </button>
                  </div>
                ))}
              </div>

              <label htmlFor="">Price</label>
              <input
                className="input-control"
                onChange={handleChange}
                name="price"
                type="number"
                min={1}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="rounded-xl w-[90%] md:w-[20%] mx-auto mt-10 primary p-5 text-xl font-semibold cursor-pointer"
      >
        Create
      </button>
    </div>
  );
};

export default Add;
