"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import useBlogs from '@/hooks/useBlogs';
import CreatableSelect from 'react-select/creatable';
import useBlogKeywords from '@/hooks/useBlogKeywords';
import useBlogCategories from '@/hooks/useBlogCategories';
import { FaArrowLeft } from 'react-icons/fa6';
import { MdOutlineFileUpload } from 'react-icons/md';
import { MdDeleteOutline } from "react-icons/md";
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const Editor = dynamic(() => import('@/utils/Markdown/Editor/Editor'), { ssr: false });

const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const UpdateBlog = ({ params }) => {
  const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm();
  const [allBlog, isBlog, refetch] = useBlogs();
  const axiosPublic = useAxiosPublic();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [selectedCategoryBlogs, setSelectedCategoryBlogs] = useState([]);
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  // const [titles, setTitles] = useState([]);
  // const [notDouble, setNotDouble] = useState("");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [allBlogKeywords, isBlogKeywordPending, refetchBlogKeywords] = useBlogKeywords();
  const [allBlogCategories, isBlogCategoryPending, refetchBlogCategories] = useBlogCategories();
  const [blogDetails, setBlogDetails] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredTitles, setFilteredTitles] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [menuPortalTarget, setMenuPortalTarget] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 100,
    height: 100,
    aspect: 1200 / 700, // Maintain the aspect ratio
  });

  const imgRef = useRef(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axiosPublic.get(`/allBlog/${params?.id}`);
      const blog = res.data;
      // setNotDouble(blog?.title);
      setValue('title', blog?.title);
      setValue('keyword', blog?.keyword);
      setValue('category', blog?.category);
      setValue('description', blog?.description);
      setValue('overview', blog?.overview);
      setImage({ src: blog?.imageURL || null, file: null });
      setValue("embed", blog?.embed);
      setSelectedCategory(blog?.selectedCategoryForFeaturedTitle);
      setValue("featuredTitle", blog?.featuredTitle);
      setFilteredTitles(blog?.filteredTitlesOfSelectedCategory);
      setSelectedBlogs(blog?.keyword?.map(skill => skill));
      setSelectedCategoryBlogs(blog?.category?.map(cat => cat));
      setBlogDetails(blog);
      setLoading(false);
    };
    fetchBlog();

    if (typeof document !== 'undefined') {
      setMenuPortalTarget(document.body);
    }
  }, [params, axiosPublic, setValue]);

  let temp = [];
  const handleNameChange = (inputValue) => {
    if (inputValue) {
      try {
        (async () => {
          const res = await axiosPublic.get(`/blogKeywords/${inputValue.toLowerCase()}`);
          const name = res?.data?.map(data => {
            const option = {
              label: data?.blogKeywords,
              value: data?.blogKeywords,
            }
            temp.push(option);
          });
          setOptions(temp);
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }

  let temp2 = [];
  const handleNameChange2 = (inputValue) => {
    if (inputValue) {
      try {
        (async () => {
          const res = await axiosPublic.get(`/blogCategory/${inputValue.toLowerCase()}`);
          const name = res?.data?.map(data => {
            const option = {
              label: data?.blogCategory,
              value: data?.blogCategory,
            }
            temp2.push(option);
          });
          setOptions2(temp2);
        })();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // useEffect(() => {
  //   const fetchBlogTitle = async () => {
  //     try {
  //       if (selectedBlogs.length > 0) {
  //         // Serialize keywords
  //         const serializedKeywords = encodeURIComponent(JSON.stringify(selectedBlogs));
  //         const response = await axiosPublic.get(`/blogTitle/${serializedKeywords}`);
  //         setTitles(response?.data?.data);
  //       }
  //     } catch (err) {
  //       toast.error(err);
  //     }
  //   };
  //   fetchBlogTitle();
  // }, [selectedBlogs, axiosPublic]);

  const handleCategoryChange = (event) => {

    // Reset title and filtered titles when category changes
    setValue("featuredTitle", ""); // Reset the title in the form
    setFilteredTitles([]); // Clear filtered titles

    const category = event.target.value;
    setSelectedCategory(category);

    // Filter titles based on selected category
    const titles = allBlog?.filter(blog => blog.category.some(cat => cat.value === category))
      .map(blog => blog.title);
    setFilteredTitles(titles);
  };

  // const theTitles = useMemo(() => {
  //   return titles?.filter(title => title !== notDouble);
  // }, [titles, notDouble]);

  const handleGoBack = () => {
    router.push("/dashboard/allBlog");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage({
        src: URL.createObjectURL(file),
        file,
      });
      setImageError(false); // Reset error when a file is selected
    } else {
      setImageError(true); // Set error if no file selected
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const handleImageAndModalOff = () => {
    setImage(null);
    onOpenChange(false);
  };

  // Create cropped and resized image with fixed size 1200x700
  const onCropComplete = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedBlob = await getCroppedImage(imgRef.current, crop, 1200, 700);
      const previewUrl = URL.createObjectURL(croppedBlob);
      setCroppedImage(previewUrl);
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
    const title = data.title;
    const keyword = data.keyword;
    const newKeywords = data.keyword.map(k => k.value);
    const category = data.category;
    const newCategories = data.category.map(c => c.value);
    const description = data.description;
    const overview = data.overview;
    const embed = data.embed || "";
    const featuredTitle = data?.featuredTitle || "";
    const selectedCategoryForFeaturedTitle = selectedCategory || "";
    const filteredTitlesOfSelectedCategory = filteredTitles || [];

    if (image === null) {
      setImageError(true);
      return;
    }
    else {
      setImageError(false);
    }

    // Initialize imageUrl with the existing one
    let imageURL = blogDetails.imageURL || '';

    // If a new image is uploaded, upload it to Imgbb
    if (croppedImage) {
      // imageURL = await uploadImageToImgbb(image.file);
      const croppedBlob = await fetch(croppedImage).then((res) => res.blob());
      imageURL = await uploadImageToImgbb({ file: croppedBlob });
      if (!imageURL) {
        toast.error('Image upload failed, cannot proceed.');
      }
    } else if (image === null) {
      // If the image is removed, explicitly set imageURL to an empty string
      imageURL = '';
    }

    // Extract existing keywords from `allBlogKeywords`
    const existingKeywords = allBlogKeywords.map(item => item.blogKeywords);

    // Identify only new keywords that are not in the existing list
    const uniqueNewKeywords = newKeywords.filter(keyword => !existingKeywords.includes(keyword));

    // Only proceed if there are unique new keywords to add
    if (uniqueNewKeywords.length > 0) {
      try {
        // Send only the new keywords to be added to the backend
        const response = await axiosPublic.post('/publishBlogKeywords', { keywords: uniqueNewKeywords });
        if (response?.data?.result?.insertedCount > 0) {
          refetchBlogKeywords();
        }

      } catch (error) {
        console.error('Error publishing blog keywords:', error);
      }
    }
    // Extract existing keywords from `allBlogKeywords`
    const existingCategories = allBlogCategories.map(item => item.blogCategory);

    // Identify only new keywords that are not in the existing list
    const uniqueNewCategories = newCategories.filter(category => !existingCategories.includes(category));

    // Only proceed if there are unique new categories to add
    if (uniqueNewCategories.length > 0) {
      try {
        // Send only the new keywords to be added to the backend
        const response = await axiosPublic.post('/publishBlogCategories', { categories: uniqueNewCategories });
        if (response?.data?.result?.insertedCount > 0) {
          refetchBlogCategories();
        }

      } catch (error) {
        console.error('Error publishing blog keywords:', error);
      }
    }

    const updatedBlogInfo = { title, keyword, embed, featuredTitle, category, description, overview, imageURL, selectedCategoryForFeaturedTitle, filteredTitlesOfSelectedCategory };
    const res = await axiosPublic.put(`/allBlog/${params?.id}`, updatedBlogInfo);
    if (res.data.modifiedCount > 0) {
      reset();
      refetch();
      toast.success("Blog updated successfully");
      router.push("/dashboard/allBlog");
    } else {
      toast.error("Change something first!");
    }
  }

  if (loading || isBlogKeywordPending || isBlogCategoryPending || isBlog) {
    return <Loading />
  };

  return (
    <PrivateRoute>
      <div className='min-h-screen'>

        <div className='max-w-screen-2xl px-6 mx-auto'>

          <div className='max-w-screen-xl mx-auto pt-3 pb-1 sticky top-0 z-10 bg-white'>
            <div className='flex items-center justify-between'>
              <h3 className='w-full font-semibold text-lg md:text-xl lg:text-2xl'>Edit Blog Configuration</h3>
              <button className='flex items-center gap-2 text-[10px] md:text-base justify-end w-full' onClick={() => handleGoBack()}> <span className='border border-black hover:scale-105 duration-300 rounded-full p-1 md:p-2'><FaArrowLeft /></span> Go Back</button>
            </div>
          </div>

          <form className='max-w-screen-xl mx-auto pt-1 pb-6 flex flex-col' onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submit behavior
            handleSubmit(onSubmit)(); // Explicitly call onSubmit when necessary
          }}>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6'>

              <div className='grid grid-cols-1 lg:col-span-7 gap-8 mt-3 py-3 h-fit'>
                <div className='flex flex-col gap-4 bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>

                  <div>
                    <label htmlFor='title' className='flex justify-start font-medium text-[#EA580C] pb-2'>Title *</label>
                    <input id='title' {...register("title", { required: true })} className="bg-gradient-to-r from-white to-gray-50 w-full p-3 border border-gray-300 outline-none focus:border-[#EA580C] transition-colors duration-1000 rounded-md" type="text" />
                    {errors.title?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Title is required</p>
                    )}
                  </div>

                  <div>

                    <label htmlFor='overview' className='flex justify-start font-medium text-[#EA580C] pb-2'>Blog overview *</label>

                    <textarea className='w-full p-3 mb-4 border rounded-md outline-none focus:border-[#EA580C] transition-colors duration-1000' id='overview' {...register('overview', { required: true })} rows={7} cols={50} />

                    {errors.overview?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">This field is required</ p>
                    )}

                  </div>

                  <div>
                    <label htmlFor='description' className='flex justify-start font-medium text-[#EA580C] pb-2'>Details About This Blog *</label>
                    <Controller
                      name="description"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
                    />
                    {errors.description?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">This field is required</ p>
                    )}
                  </div>

                </div>

              </div>

              <div className='grid grid-cols-1 lg:col-span-5 gap-8 mt-3 py-3 h-fit'>

                <div className='flex flex-col gap-4 bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>

                  <div>
                    <label htmlFor='category' className='flex justify-start font-medium text-[#EA580C] pb-2'>Change Categories</label>
                    <Controller
                      name="category"
                      defaultValue={selectedCategoryBlogs}
                      control={control}
                      render={({ field }) => (
                        <CreatableSelect
                          isMulti
                          {...field}
                          options={options2}
                          menuPortalTarget={menuPortalTarget}
                          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                          menuPlacement="auto"
                          onChange={(selected) => {
                            if (selected.length > 3) {
                              toast.error("You can select up to 3 items only.");
                            } else {
                              field.onChange(selected);
                              setSelectedCategoryBlogs(selected);
                            }
                          }}
                          onInputChange={handleNameChange2}
                        />
                      )}
                    />
                    {errors.category?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Category is required</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor='keyword' className='flex justify-start font-medium text-[#EA580C] pb-2'>Change Keywords</label>
                    <Controller
                      name="keyword"
                      defaultValue={selectedBlogs}
                      control={control}
                      render={({ field }) => (
                        <CreatableSelect
                          isMulti
                          {...field}
                          menuPortalTarget={menuPortalTarget}
                          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                          menuPlacement="auto"
                          options={options}
                          onChange={(selected) => {
                            if (selected.length > 5) {
                              toast.error("You can select up to 5 items only.");
                            } else {
                              field.onChange(selected);
                              setSelectedBlogs(selected);
                            }
                          }}
                          onInputChange={handleNameChange}
                        />
                      )}
                    />
                    {errors.keyword?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Keyword is required</p>
                    )}
                  </div>

                </div>

                <div className='flex flex-col bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>

                  <div>
                    <label htmlFor='embed' className='flex justify-start font-medium text-[#EA580C] mt-3 pb-2'>Upload embed video code</label>
                    <textarea className='w-full p-3 mb-4 border rounded-md outline-none focus:border-[#EA580C] transition-colors duration-1000' id='embed' {...register('embed')} rows={7} cols={50} />
                  </div>

                  <div className='flex flex-col gap-4 mt-6'>
                    {/* <input
                      id='imageUpload'
                      type='file'
                      className='hidden'
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor='imageUpload'
                      className='mx-auto flex flex-col items-center justify-center space-y-3 rounded-lg border-2 border-dashed border-gray-400 p-6 bg-white cursor-pointer'
                    >
                      <MdOutlineFileUpload size={60} />
                      <div className='space-y-1.5 text-center'>
                        <h5 className='whitespace-nowrap text-lg font-medium tracking-tight'>
                          Upload Blog Cover
                        </h5>
                        <p className='text-sm text-gray-500'>
                          Photo Should be in PNG, JPEG or JPG format
                        </p>
                      </div>
                    </label>
                    {imageError && <p className="text-red-600">Blog thumbnail is required</p>}

                    {image && (
                      <div className='relative'>
                        <Image
                          src={typeof image === 'string' ? image : image.src}
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
                    )} */}

                    <div onClick={onOpen}
                      className='flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 p-6 bg-gray-50 hover:bg-gray-100 cursor-pointer transition duration-200'>

                      {image ? (
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
                            <h5 className='whitespace-nowrap text-lg font-medium tracking-tight'>Upload content</h5>
                            <p className='text-sm text-gray-500'>Photo should be in PNG, JPEG, or JPG format</p>
                          </div>
                        </>
                      )}

                    </div>

                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
                      <ModalContent>
                        <ModalBody>
                          <div className='flex flex-col gap-4 mt-12 px-6'>

                            {image ? (
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
                                      Upload content
                                    </h5>
                                    <p className='text-sm text-gray-500'>
                                      Photo Should be in PNG, JPEG or JPG format
                                    </p>
                                  </div>
                                </label>
                              </div>
                            }
                            {imageError && <p className='text-red-600 text-left pt-1'>Image uploading is required</p>}
                          </div>
                        </ModalBody>
                        <div className="flex justify-end gap-4 p-4">
                          <Button onClick={handleImageAndModalOff} className='bg-gray-100 text-black' variant="flat">
                            Cancel
                          </Button>
                          <Button onClick={() => onOpenChange(false)} color="primary" variant="flat">
                            Save
                          </Button>
                        </div>
                      </ModalContent>
                    </Modal>

                  </div>

                  {/* {theTitles?.length > 0 ? <div>
                    <label htmlFor='featured' className='flex justify-start font-medium text-[#EA580C] pt-6 pb-2'>Select Featured Post Title *</label>
                    <select {...register("featured", { required: true })} className="select select-bordered w-full flex-1">
                      {
                        theTitles?.map((sector, index) => (
                          <option key={index} value={sector}>{sector}</option>
                        ))
                      }
                    </select>
                    {errors.featured && <p className="text-red-600">Featured title selection is required</p>}
                  </div> : <div>
                    <p className='pt-10'>No featured posts available. Please select a keyword instead!</p>
                  </div>} */}

                  <div>

                    {/* Category Selection */}
                    <div>
                      <label
                        htmlFor="category"
                        className="flex justify-start font-medium text-[#EA580C] pt-6 pb-2"
                      >
                        Select Category for featured post title
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="select select-bordered w-full flex-1"
                      >
                        <option value="">Select a Category</option>
                        {allBlogCategories?.map((cat) => (
                          <option key={cat._id} value={cat.blogCategory}>
                            {cat.blogCategory}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="text-red-600">Category selection is required</p>
                      )}
                    </div>

                    {/* Title Selection */}
                    {selectedCategory && filteredTitles?.length > 0 && (
                      <div>
                        <label
                          htmlFor="featuredTitle"
                          className="flex justify-start font-medium text-[#EA580C] pt-6 pb-2"
                        >
                          Select featured post *
                        </label>

                        <select
                          {...register("featuredTitle", { required: true })}
                          className="select select-bordered w-full flex-1"
                        >
                          <option disabled value="">
                            Select a post
                          </option>
                          {filteredTitles.map((title, index) => (
                            <option key={index} value={title}>
                              {title}
                            </option>
                          ))}
                        </select>

                        {errors.featuredTitle && (
                          <p className="text-red-600">Featured post selection is required</p>
                        )}
                      </div>
                    )}

                    {/* If no featured titles available, then show this message */}
                    {selectedCategory && filteredTitles?.length === 0 && (
                      <div>
                        <label
                          htmlFor="title"
                          className="flex justify-start font-medium text-[#EA580C] pt-6 pb-2"
                        >
                          Select featured post *
                        </label>
                        <p className='font-semibold'>Your selected category has no featured post available. </p>
                        <p className='font-semibold'>Please select another category.</p>
                      </div>
                    )}

                  </div>

                </div>

              </div>

            </div>

            <div className='flex justify-end items-center mt-3'>

              <div className='relative'>
                <div className='fixed bottom-4 right-12 z-50'>
                  <button type='submit' className={`text-white bg-gray-800 w-fit h-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[background-position] duration-700 ease-in-out hover:bg-[50%_100%]`}>
                    Update
                  </button>
                </div>
              </div>

            </div>

          </form>
        </div>

      </div>
    </PrivateRoute>
  );
};

export default UpdateBlog;