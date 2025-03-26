"use client";

import { format } from "date-fns";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const UploadComponent = ({
  email,
  customImg,
  defaultImg,
}: {
  email: string;
  customImg: string | null;
  defaultImg: string | null;
}) => {
  const [displayImage, setDisplayImage] = useState(
    customImg || defaultImg || ""
  );
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files) as File[];
      setSelectedImage(filesArray[0]);
    }
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      const filesArray = Array.from(files) as File[];
      setSelectedImage(filesArray[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const toggleImageModal = () => {
    setIsImageModalOpen(!isImageModalOpen);
  };

  const handleImages = () => {
    toggleImageModal();
  };

  const addImages = async () => {
    try {
      if (!selectedImage) return null;

      const formData = new FormData();
      formData.append("image", selectedImage);
      var date = new Date();
      var formattedDate = format(date, "yyyy-M-dd-HH-mm-ss");
      const imageFile = formData.get("image") as File;
      if (imageFile) {
        if (customImg !== null) {
          await axios.post("/api/aws/delete", {
            file_key: customImg,
          });
        }
        // Send file to AWS
        const uni = email.split("@")[0];
        var fileKey = `mydata/${uni}-${formattedDate}`;
        var fileType = imageFile.type;

        let { data } = await axios.post("/api/aws/upload", {
          file_key: fileKey,
          type: fileType,
        });

        const uploadUrl = await data.url;

        const newUrl = `https://snrscramblebucket.s3.amazonaws.com/${fileKey}`;

        await axios.put(uploadUrl, imageFile, {
          headers: {
            "Content-type": fileType,
            "Access-Control-Allow-Origin": "*",
          },
        });
        toggleImageModal();

        setDisplayImage(newUrl);
        await axios.put("/api/saveImages", {
          blob: newUrl,
          email: email,
        });
      }
      // const blob = await put(imageFile.name, imageFile, {
      //   access: "public",
      //   token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
      // });
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div>
      <div className="relative h-64 w-64 object-cover">
        <Image
          src={displayImage}
          alt={`Selected Image`}
          width={500}
          height={500}
          className="relative h-64 w-64 object-cover"
        />
        <button
          className="text-white bg-opacity-75 bg-black rounded-full text-xs p-2 hover:text-gray-400 focus:outline-none absolute bottom-0 left-1/2 transform -translate-x-1/2"
          onClick={handleImages}
        >
          Upload
        </button>
      </div>

      {/* Modal for Adding Images */}
      {isImageModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
          <div className="flex items-center justify-center w-full h-full z-10">
            <div className="bg-gray-200 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Add Images</h2>
              <div
                className="border-2 border-dashed border-gray-400 p-8 mb-4 text-center"
                onDrop={handleImageDrop}
                onDragOver={handleDragOver}
              >
                <p>Drag and drop your images here, </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload-input"
                />
                <label
                  htmlFor="image-upload-input"
                  className="cursor-pointer underline"
                >
                  Or click here to select Images
                </label>
              </div>
              <button
                onClick={addImages}
                className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Images
              </button>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {selectedImage && (
                  <div>
                    <Image
                      src={URL.createObjectURL(selectedImage)}
                      alt={`Selected Image`}
                      width={50}
                      height={50}
                      className="h-48 w-48 object-cover"
                    />
                  </div>
                )}
              </div>
              <button
                type="button"
                className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                onClick={toggleImageModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
