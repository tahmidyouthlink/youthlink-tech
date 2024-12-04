"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useMarketingContent from '@/hooks/useMarketingContent';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdOutlineFileUpload } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const MarketingContent = () => {

  const axiosPublic = useAxiosPublic();
  const { handleSubmit, register, formState: { errors }, setValue } = useForm();
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [marketingContentList, isMarketingContentPending, refetchContent] = useMarketingContent();

  useEffect(() => {
    if (marketingContentList && marketingContentList.length > 0) {
      setImage({ src: marketingContentList[0]?.imageUrl, file: null });
      setValue('url', marketingContentList[0]?.url);
    }
  }, [marketingContentList]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage({
        src: URL.createObjectURL(file),
        file
      });
    }
  };

  const handleImageRemove = () => {
    setImage(null);
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

  const onSubmit = async (data) => {

    if (!image && !marketingContentList?.length) {
      setImageError(true);
      return;
    }
    setImageError(false);

    let imageUrl = '';
    // If the image is new, upload it
    if (image?.file) {
      imageUrl = await uploadImageToImgbb(image);
      if (!imageUrl) {
        toast.error('Image upload failed, cannot proceed.');
        return;
      }
    } else if (marketingContentList?.length > 0) {
      // Use the existing URL if no new image was uploaded
      imageUrl = marketingContentList[0]?.imageUrl;
    }

    if (marketingContentList?.length > 0) {
      const contentId = marketingContentList[0]?._id;

      const contentData = {
        imageUrl,
        url: data?.url
      };

      try {

        const response = await axiosPublic.put(`/editMarketingContent/${contentId}`, contentData);
        if (response.data.modifiedCount > 0) {
          toast.success("Marketing content updated successfully!")
          refetchContent();
        }
        else {
          toast.error('No changes detected.');
        }
      } catch (err) {
        toast.error("Failed to publish marketing content!");
      }
    }
  };

  if (isMarketingContentPending) {
    return <Loading />
  }

  return (
    <div className='px-6'>
      <div className='bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg max-w-screen-sm mx-auto mt-16 lg:mt-28'>
        <h1 className='py-4 text-xl lg:text-2xl font-semibold'>Marketing content configuration</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='pt-1 pb-6 flex flex-col gap-4'>
          <div>
            <label htmlFor='url' className='flex justify-start font-medium text-[#EA580C] pb-2'>Content Url *</label>
            <input id='url' {...register("url", { required: true })} className="bg-gradient-to-r from-white to-gray-50 w-full p-3 border border-gray-300 outline-none focus:border-[#EA580C] transition-colors duration-1000 rounded-md" type="text" />
            {errors.url?.type === "required" && (
              <p className="text-red-600 text-left pt-1">Url is required</p>
            )}
          </div>
          <div className='flex flex-col gap-4'>
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
                  Upload content
                </h5>
                <p className='text-sm text-gray-500'>
                  Photo Should be in PNG, JPEG or JPG format
                </p>
              </div>
            </label>

            {image && (
              <div className='relative'>
                <Image
                  src={image.src}
                  alt='Uploaded image'
                  height={3000}
                  width={3000}
                  className='w-full min-h-[200px] max-h-[200px] rounded-md object-contain'
                />
                <button
                  onClick={handleImageRemove}
                  className='absolute top-1 right-1 rounded-full p-1 bg-red-600 hover:bg-red-700 text-white font-bold'
                >
                  <RxCross2 size={24} />
                </button>
              </div>
            )}
            {imageError && <p className='text-red-600 text-left pt-1'>Image uploading is required</p>}
          </div>
          <div className='flex justify-end items-center mt-8'>

            <button type='submit' className={`flex items-center text-white bg-gray-800 w-fit h-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[background-position] duration-700 ease-in-out hover:bg-[50%_100%]`}>
              Upload
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default MarketingContent;