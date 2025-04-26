"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useMarketingContent from '@/hooks/useMarketingContent';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa6';
import { MdDeleteOutline, MdOutlineFileUpload } from 'react-icons/md';
import { RxCheck, RxCross2 } from 'react-icons/rx';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const EditContent = ({ params }) => {

  const axiosPublic = useAxiosPublic();
  const { handleSubmit, register, formState: { errors }, setValue } = useForm();
  const [marketingContentList, isMarketingContentPending, refetchContent] = useMarketingContent();
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [details, setDetails] = useState({});
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [imageError2, setImageError2] = useState(false);
  const {
    isOpen: isOpenFirstModal,
    onOpen: onOpenFirstModal,
    onOpenChange: onOpenChangeFirstModal,
  } = useDisclosure();

  // Second modal's state and handlers
  const {
    isOpen: isOpenSecondModal,
    onOpen: onOpenSecondModal,
    onOpenChange: onOpenChangeSecondModal,
  } = useDisclosure();
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedImage2, setCroppedImage2] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 100,
    height: 100,
    aspect: 1200 / 700, // Maintain the aspect ratio
  });
  const [crop2, setCrop2] = useState({
    unit: '%',
    width: 100,
    height: 100,
    aspect: 1200 / 700, // Maintain the aspect ratio
  });

  const imgRef = useRef(null);
  const imgRef2 = useRef(null);

  useEffect(() => {
    const fetchContentData = async () => {
      const res = await axiosPublic.get(`/singleMarketingContent/${params?.id}`);
      const content = res.data;
      setDetails(content);
      setValue('title', content?.title);
      setValue('title2', content?.title2);
      setValue('url', content?.url);
      setValue('url2', content?.url2);
      setImage({ src: content?.imageUrl, file: null });
      setImage2({ src: content?.imageUrl2, file: null });
    };
    fetchContentData();
  }, [params, axiosPublic, setValue]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImage({
        src: fileUrl,
        file
      });
      setCroppedImage(null); // Reset previous cropped image
    }
  };

  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImage2({
        src: fileUrl,
        file
      });
      setCroppedImage2(null); // Reset previous cropped image
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const handleImageRemove2 = () => {
    setImage2(null);
  };

  const handleImageAndModalOff = () => {
    setImage(null);
    onOpenChangeFirstModal(false);
  };

  const handleImageAndModalOff2 = () => {
    setImage2(null);
    onOpenChangeSecondModal(false);
  };

  const handleGoBack = () => {
    router.push("/dashboard/content");
  };

  // Create cropped and resized image with fixed size 1200x700
  const onCropComplete = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedBlob = await getCroppedImage(imgRef.current, crop, 1200, 700);
      const previewUrl = URL.createObjectURL(croppedBlob);
      setCroppedImage(previewUrl);
    }
  };

  // Create cropped and resized image with fixed size 1200x700
  const onCropComplete2 = async (crop) => {
    if (imgRef2.current && crop.width && crop.height) {
      const croppedBlob = await getCroppedImage2(imgRef2.current, crop, 1200, 700);
      const previewUrl = URL.createObjectURL(croppedBlob);
      setCroppedImage2(previewUrl);
    }
  };

  // Function to crop and resize image using Canvas
  const getCroppedImage = (image, crop, width, height) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = width; // Fixed width: 1200
    canvas.height = height; // Fixed height: 700

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX, // Cropped X start
      crop.y * scaleY, // Cropped Y start
      crop.width * scaleX, // Cropped width
      crop.height * scaleY, // Cropped height
      0, // Canvas X start
      0, // Canvas Y start
      width, // Fixed output width (1200)
      height // Fixed output height (700)
    );

    return new Promise((resolve) => {
      canvas?.toBlob((blob) => resolve(blob), "image/jpeg");
    });
  };

  // Function to crop and resize image using Canvas
  const getCroppedImage2 = (image, crop, width, height) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = width; // Fixed width: 1200
    canvas.height = height; // Fixed height: 700

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX, // Cropped X start
      crop.y * scaleY, // Cropped Y start
      crop.width * scaleX, // Cropped width
      crop.height * scaleY, // Cropped height
      0, // Canvas X start
      0, // Canvas Y start
      width, // Fixed output width (1200)
      height // Fixed output height (700)
    );

    return new Promise((resolve) => {
      canvas?.toBlob((blob) => resolve(blob), "image/jpeg");
    });
  };

  const uploadImageToImgbb = async (image) => {
    const formData = new FormData();
    formData.append('image', image.file);
    formData.append('key', apiKey);

    try {
      const response = await axiosPublic.post(apiURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data && response.data.data && response.data.data.url) {
        return response.data.data.url; // Return the single image URL
      } else {
        toast.error('Failed to get image URL from response.');
      }
    } catch (error) {
      toast.error(`Upload failed: ${error.response?.data?.error?.message || error.message}`);
    }
    return null;
  };

  const handleImageUpload = async (croppedImage, existingUrl) => {
    if (croppedImage) {
      const croppedBlob = await fetch(croppedImage).then((res) => res.blob());
      return await uploadImageToImgbb({ file: croppedBlob });
    }
    return existingUrl;
  };

  const onSubmit = async (data) => {

    if (image === null) {
      setImageError(true);
      return;
    };
    setImageError(false);

    if (image2 === null) {
      setImageError2(true);
      return;
    };
    setImageError2(false);

    const imageUrl = await handleImageUpload(croppedImage, details?.imageUrl);
    const imageUrl2 = await handleImageUpload(croppedImage2, details?.imageUrl2);

    if (!imageUrl || !imageUrl2) {
      toast.error("Image upload failed, cannot proceed.");
      return;
    }

    const contentData = {
      title: data?.title,
      imageUrl,
      url: data?.url,
      title2: data?.title2,
      imageUrl2,
      url2: data?.url2
    };

    try {
      const response = await axiosPublic.put(`/editMarketingContent/${params?.id}`, contentData);
      if (response?.data?.modifiedCount > 0) {
        toast.custom((t) => (
          <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex items-center ring-1 ring-black ring-opacity-5`}
          >
            <div className="pl-6">
              <RxCheck className="h-6 w-6 bg-green-500 text-white rounded-full" />
            </div>
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-base font-bold text-gray-900">
                    Marketing content successfully updated!
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Your marketing content has been updated and is now live.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center font-medium text-red-500 hover:text-text-700 focus:outline-none text-2xl"
              >
                <RxCross2 />
              </button>
            </div>
          </div>
        ), {
          position: "bottom-right",
          duration: 5000
        })
        refetchContent();
        router.push("/dashboard/content");
      } else {
        toast.error('No changes detected.');
      }
    } catch (err) {
      toast.error("Failed to publish marketing content!");
    }
  };

  if (isMarketingContentPending) {
    return <Loading />
  }

  return (
    <PrivateRoute>

      <div className='max-w-screen-2xl mx-auto pt-3 pb-1 sticky top-0 z-10 bg-white justify-between px-6'>
        <div className='max-w-screen-2xl mx-auto flex items-center justify-between'>
          <h1 className='py-4 text-xl lg:text-2xl font-semibold flex-1'>Marketing content configuration</h1>
          <button className='flex-1 flex items-center gap-2 text-[10px] md:text-base justify-end w-full' onClick={() => handleGoBack()}> <span className='border border-black hover:scale-105 duration-300 rounded-full p-1 md:p-2'><FaArrowLeft /></span> Go Back</button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='max-w-screen-2xl mx-auto pt-1 pb-6 px-6'>

        <div className='flex flex-col lg:flex-row justify-between gap-6 lg:gap-12 items-center'>

          <div className='flex-1 flex flex-col gap-4 bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>

            <div className='flex-1'>
              <label htmlFor='title' className='flex justify-start font-medium text-[#EA580C] pb-2'>Middle Content title</label>
              <input id='title' {...register("title")} className="bg-gradient-to-r from-white to-gray-50 w-full p-3 border border-gray-300 outline-none focus:border-[#EA580C] transition-colors duration-1000 rounded-md" type="text" />
            </div>

            <div className='flex-1'>
              <label htmlFor='url' className='flex justify-start font-medium text-[#EA580C] pb-2'>Middle Content Url *</label>
              <input id='url' {...register("url", { required: true })} className="bg-gradient-to-r from-white to-gray-50 w-full p-3 border border-gray-300 outline-none focus:border-[#EA580C] transition-colors duration-1000 rounded-md" type="text" />
              {errors.url?.type === "required" && (
                <p className="text-red-600 text-left pt-1">Url is required</p>
              )}
            </div>

            <div className='flex-1 flex flex-col gap-4'>

              <div onClick={onOpenFirstModal}
                className='flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 p-6 bg-gray-50 hover:bg-gray-100 cursor-pointer transition duration-200'>

                {croppedImage || (image && image.src) ? (
                  // Show the uploaded image preview
                  <Image
                    src={croppedImage || image.src}
                    alt='Uploaded image'
                    width={3000}
                    height={3000}
                    className='w-full min-h-[200px] max-h-[200px] rounded-md object-contain'
                  />
                ) : (
                  // Show the upload icon and text if no image is uploaded
                  <>
                    <MdOutlineFileUpload size={60} />
                    <div className='space-y-1.5 text-center'>
                      <h5 className='whitespace-nowrap text-lg font-medium tracking-tight'>Upload content for middle</h5>
                      <p className='text-sm text-gray-500'>Photo should be in PNG, JPEG, or JPG format</p>
                    </div>
                    {imageError && <p className='text-red-600 text-left pt-1'>Image uploading is required</p>}
                  </>
                )}

              </div>

              <Modal isOpen={isOpenFirstModal} onOpenChange={onOpenChangeFirstModal} size="xl">
                <ModalContent>
                  <ModalBody>
                    <div className='flex flex-col gap-4 mt-12 px-6'>

                      {image?.src ? (
                        <div className='relative'>
                          <ReactCrop
                            crop={crop}
                            onChange={(newCrop) => setCrop(newCrop)}
                            onComplete={onCropComplete}
                            aspect={1200 / 700}
                            minWidth={1200}
                            maxWidth={1200}
                            maxHeight={700}
                            minHeight={700}
                            keepSelection={true}
                          >
                            <img ref={imgRef} src={image.src} alt="Uploaded image" />
                          </ReactCrop>
                          <button
                            onClick={handleImageRemove}
                            className='absolute top-1 right-1 rounded-full p-1 bg-red-600 hover:bg-red-700 text-white font-bold'
                          >
                            <MdDeleteOutline size={24} />
                          </button>
                        </div>
                      ) :
                        <div>
                          <input
                            id='imageUpload'
                            type='file'
                            className='hidden'
                            onChange={handleImageChange}
                          />
                          <label
                            htmlFor='imageUpload'
                            className='flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 p-6 bg-gray-50 hover:bg-gray-100 cursor-pointer transition duration-200'
                          >
                            <MdOutlineFileUpload size={60} />
                            <div className='space-y-1.5 text-center'>
                              <h5 className='whitespace-nowrap text-lg font-medium tracking-tight'>
                                Upload content for middle
                              </h5>
                              <p className='text-sm text-gray-500'>
                                Photo Should be in PNG, JPEG or JPG format
                              </p>
                            </div>
                          </label>
                        </div>
                      }
                    </div>
                  </ModalBody>
                  <div className="flex justify-end gap-4 p-4">
                    <Button onClick={handleImageAndModalOff} className='bg-gray-100 text-black' variant="flat">
                      Cancel
                    </Button>
                    <Button onClick={() => onOpenChangeFirstModal(false)} color="primary" variant="flat">
                      Save
                    </Button>
                  </div>
                </ModalContent>
              </Modal>

            </div>

          </div>

          <div className='flex-1 flex flex-col gap-4 bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>

            <div>
              <label htmlFor='title2' className='flex justify-start font-medium text-[#EA580C] pb-2'>Bottom Content title</label>
              <input id='title2' {...register("title2")} className="bg-gradient-to-r from-white to-gray-50 w-full p-3 border border-gray-300 outline-none focus:border-[#EA580C] transition-colors duration-1000 rounded-md" type="text" />
            </div>

            <div>
              <label htmlFor='url2' className='flex justify-start font-medium text-[#EA580C] pb-2'>Bottom Content Url *</label>
              <input id='url2' {...register("url2", { required: true })} className="bg-gradient-to-r from-white to-gray-50 w-full p-3 border border-gray-300 outline-none focus:border-[#EA580C] transition-colors duration-1000 rounded-md" type="text" />
              {errors.url2?.type === "required" && (
                <p className="text-red-600 text-left pt-1">Second Url is required</p>
              )}
            </div>

            <div className='flex flex-col gap-4'>

              <div onClick={onOpenSecondModal}
                className='flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 p-6 bg-gray-50 hover:bg-gray-100 cursor-pointer transition duration-200'>

                {croppedImage2 || (image2 && image2.src) ? (
                  // Show the uploaded image preview
                  <Image
                    src={croppedImage2 || image2.src}
                    alt='Uploaded image'
                    width={3000}
                    height={3000}
                    className='w-full min-h-[200px] max-h-[200px] rounded-md object-contain'
                  />
                ) : (
                  // Show the upload icon and text if no image is uploaded
                  <>
                    <MdOutlineFileUpload size={60} />
                    <div className='space-y-1.5 text-center'>
                      <h5 className='whitespace-nowrap text-lg font-medium tracking-tight'>Upload content for bottom</h5>
                      <p className='text-sm text-gray-500'>Photo should be in PNG, JPEG, or JPG format</p>
                    </div>
                    {imageError2 && <p className='text-red-600 text-left pt-1'>Image uploading is required</p>}
                  </>
                )}

              </div>

              <Modal isOpen={isOpenSecondModal} onOpenChange={onOpenChangeSecondModal} size="xl">
                <ModalContent>
                  <ModalBody>
                    <div className='flex flex-col gap-4 mt-12 px-6'>

                      {image2?.src ? (
                        <div className='relative'>
                          <ReactCrop
                            crop={crop2}
                            onChange={(newCrop) => setCrop2(newCrop)}
                            onComplete={onCropComplete2}
                            aspect={1200 / 700}
                            minWidth={1200}
                            maxWidth={1200}
                            maxHeight={700}
                            minHeight={700}
                            keepSelection={true}
                          >
                            <img ref={imgRef2} src={image2.src} alt="Uploaded image" />
                          </ReactCrop>
                          <button
                            onClick={handleImageRemove2}
                            className='absolute top-1 right-1 rounded-full p-1 bg-red-600 hover:bg-red-700 text-white font-bold'
                          >
                            <MdDeleteOutline size={24} />
                          </button>
                        </div>
                      ) :
                        <div>
                          <input
                            id='imageUpload'
                            type='file'
                            className='hidden'
                            onChange={handleImageChange2}
                          />
                          <label
                            htmlFor='imageUpload'
                            className='flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 p-6 bg-gray-50 hover:bg-gray-100 cursor-pointer transition duration-200'
                          >
                            <MdOutlineFileUpload size={60} />
                            <div className='space-y-1.5 text-center'>
                              <h5 className='whitespace-nowrap text-lg font-medium tracking-tight'>
                                Upload content for bottom
                              </h5>
                              <p className='text-sm text-gray-500'>
                                Photo Should be in PNG, JPEG or JPG format
                              </p>
                            </div>
                          </label>
                        </div>
                      }
                    </div>
                  </ModalBody>
                  <div className="flex justify-end gap-4 p-4">
                    <Button onClick={handleImageAndModalOff2} className='bg-gray-100 text-black' variant="flat">
                      Cancel
                    </Button>
                    <Button onClick={() => onOpenChangeSecondModal(false)} color="primary" variant="flat">
                      Save
                    </Button>
                  </div>
                </ModalContent>
              </Modal>

            </div>

          </div>

        </div>

        <div className='flex justify-end items-center mt-8'>

          <button type='submit' className={`flex items-center text-white bg-gray-800 w-fit h-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[background-position] duration-700 ease-in-out hover:bg-[50%_100%]`}>
            Upload
          </button>

        </div>

      </form>

    </PrivateRoute>
  );
};

export default EditContent;