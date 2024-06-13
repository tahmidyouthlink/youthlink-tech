"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAdmin from '@/hooks/useAdmin';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ImCross } from "react-icons/im";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import useBlogs from '@/hooks/useBlogs';
import CreatableSelect from "react-select/creatable";
const Editor = dynamic(() => import('@/utils/Markdown/Editor/Editor'), { ssr: false });
const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const AddBlog = () => {
  const { register, handleSubmit, formState: { errors }, reset, control, setValue, trigger } = useForm();
  const [, , refetch] = useBlogs();
  const axiosPublic = useAxiosPublic();
  const [isAdmin, pending] = useAdmin();
  const router = useRouter();
  const [names, setNames] = useState([]);
  const [names2, setNames2] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [titles, setTitles] = useState([]);

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
          setNames(temp);
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
          setNames2(temp2);
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }

  const onSubmit = async (data) => {
    const title = data.title;
    const keyword = data.keyword;
    const category = data.category;
    const description = data.description;
    const embed = data.embed;
    const featured = data?.featured;
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    let status;
    if (isAdmin) {
      status = "checked";
    } else {
      status = "pending";
    }
    const photo = data.photo[0];
    const formData = new FormData();
    formData.append('image', photo);
    const uploadImage = await axiosPublic.post(apiURL, formData, {
      headers: {
        "content-type": "multipart/form-data",
      }
    });
    const imageURL = uploadImage?.data?.data?.display_url;
    const blogInfo = { title, keyword, embed, featured, formattedDate, category, description, imageURL, status };
    const res = await axiosPublic.post("/addBlog", blogInfo);
    if (res?.data?.insertedId) {
      reset();
      refetch();
      toast.success("Your blog successfully published");
      router.push("/dashboard/allBlog");
    }
  }

  useEffect(() => {
    const fetchBlogTitle = async () => {
      try {
        if (keywords.length > 0) {
          // Serialize keywords
          const serializedKeywords = encodeURIComponent(JSON.stringify(keywords));
          const response = await axiosPublic.get(`/blogTitle/${serializedKeywords}`);
          setTitles(response?.data?.data);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchBlogTitle();
  }, [keywords, axiosPublic]);


  if (pending) {
    return <Loading />
  }

  return (
    <PrivateRoute>
      <div>
        <div className='fixed right-2 top-2'>
          <Link href={'/dashboard/allBlog'}>
            <ImCross className='hover:scale-105' size={20} />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 w-full">
          <div className='w-full'>
            <form className='flex flex-col max-w-screen-md gap-4 mx-auto mt-6 px-6' onSubmit={handleSubmit(onSubmit)}>
              <h1 className='font-semibold text-2xl my-2 mt-4 md:mt-8'>Blog details</h1>
              <label htmlFor='title' className='flex justify-start font-medium text-[#EA580C]'>Title *</label>
              <input id='title' {...register("title", { required: true })} className="w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
              {errors.title?.type === "required" && (
                <p className="text-red-600 text-left pt-1">Title is required</p>
              )}
              <label htmlFor='keyword' className='flex justify-start font-medium text-[#EA580C]'>Keyword *</label>
              <Controller
                name="keyword"
                control={control}
                defaultValue={[]}
                rules={{ required: true }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    onChange={(selected) => {
                      setKeywords(selected);
                      if (selected.length > 5) {
                        toast.error("You can select up to 5 items only.");
                      } else {
                        field.onChange(selected);
                        setValue("keyword", selected); // Update form value
                        trigger("keyword"); // Trigger validation
                      }
                    }}
                    options={names}
                    onInputChange={handleNameChange}
                  />
                )}
              />
              {errors.keyword && (
                <p className="text-red-600 text-left pt-1">Skills are required</p>
              )}
              <label htmlFor='featured' className='flex justify-start font-medium text-[#EA580C] pt-2'>Select Featured Post Title *</label>
              <select {...register("featured")} className="select select-bordered w-full flex-1">
                {
                  titles?.map((sector, index) => (
                    <option key={index} value={sector}>{sector}</option>
                  ))
                }
              </select>

              <label htmlFor='category' className='flex justify-start font-medium text-[#EA580C]'>Select Category *</label>
              <Controller
                name="category"
                control={control}
                defaultValue={[]}
                rules={{ required: true }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    onChange={(selected) => {
                      setKeywords(selected);
                      if (selected.length > 3) {
                        toast.error("You can select up to 3 items only.");
                      } else {
                        field.onChange(selected);
                        setValue("category", selected); // Update form value
                        trigger("category"); // Trigger validation
                      }
                    }}
                    options={names2}
                    onInputChange={handleNameChange2}
                  />
                )}
              />
              {errors.category && (
                <p className="text-red-600 text-left pt-1">Category are required</p>
              )}

              <label htmlFor='description' className='flex justify-start font-medium text-[#EA580C]'>Details About This Blog *</label>
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
              <label htmlFor='photo' className='flex justify-start font-medium text-[#EA580C]'>Upload Blog Thumbnail *</label>
              <input {...register("photo", { required: true })} className="file-input file-input-bordered w-full" id='photo' type="file" />
              {errors.photo?.type === "required" && (
                <p className="text-red-600 text-left pt-1">Photo is required.</p>
              )}
              <label htmlFor='embed' className='flex justify-start font-medium text-[#EA580C] mt-3'>Upload Embed video code</label>
              <textarea className='w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50' id='embed' {...register("embed")} rows={4} cols={50} />
              <input type='submit' className='block w-full font-bold bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white py-4 mx-auto mt-5 rounded-3xl shadow-lg shadow-[#EA580C]/80 border-0 transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#EA580C]/80 active:scale-95 active:shadow-md active:shadow-[#EA580C]/80' />
            </form>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AddBlog;