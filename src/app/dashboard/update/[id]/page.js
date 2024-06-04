"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useWorks from '@/hooks/useWorks';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ImCross } from 'react-icons/im';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import CreatableSelect from 'react-select/creatable';

const Editor = dynamic(() => import('@/utils/Markdown/Editor/Editor'), { ssr: false });

const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const UpdateWork = ({ params }) => {
    const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm();
    const [, , refetch] = useWorks();
    const axiosPublic = useAxiosPublic();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState({});
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchWork = async () => {
            const res = await axiosPublic.get(`/allWork/${params?.id}`);
            const work = res.data;
            setDetails(work);
            setValue('title', work?.title);
            setValue('heading', work?.heading);
            setValue('keyword', work?.keyword);
            setValue('category', work?.category);
            setValue('aboutTheProject', work?.aboutTheProject);
            setValue('ourSolution', work?.ourSolution);
            setValue('theResults', work?.theResults);
            setValue('photo', work?.photo);
            setSelectedKeywords(work?.keyword?.map(skill => skill));
            setLoading(false);
        };
        fetchWork();
    }, [params, axiosPublic, setValue]);

    let temp = [];
    const handleNameChange = (inputValue) => {
        if (inputValue) {
            try {
                (async () => {
                    const res = await axiosPublic.get(`/workKeywords/${inputValue.toLowerCase()}`);
                    const name = res?.data?.map(data => {
                        const option = {
                            label: data?.workKeywords,
                            value: data?.workKeywords,
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

    const onSubmit = async (data) => {
        const title = data.title;
        const heading = data.heading;
        const keyword = selectedKeywords?.map(skill => skill);
        const category = data.category;
        const aboutTheProject = data.aboutTheProject;
        const ourSolution = data.ourSolution;
        const theResults = data.theResults;
        let imageURL = details.imageURL; // Default to current imageURL
        if (data.photo && data.photo[0]) {
            const photo = data.photo[0];
            const formData = new FormData();
            formData.append('image', photo);
            const uploadImage = await axiosPublic.post(apiURL, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                }
            });
            imageURL = uploadImage?.data?.data?.display_url;
        }
        const updatedWorkInfo = { title, heading, keyword, category, aboutTheProject, ourSolution, theResults, imageURL };
        const res = await axiosPublic.put(`/allWork/${params?.id}`, updatedWorkInfo);
        if (res.data.modifiedCount > 0) {
            reset();
            refetch();
            toast.success("Work updated successfully");
            router.push("/dashboard/allWork");
        } else {
            toast.error("Change something first!");
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <PrivateRoute>
            <div>
                <div className='fixed right-2 top-2'>
                    <Link href={'/dashboard/allWork'}>
                        <ImCross className='hover:scale-105' size={20} />
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 w-full">
                    <div className='w-full'>
                        <form className='flex flex-col max-w-screen-md gap-4 mx-auto mt-6 px-6' onSubmit={handleSubmit(onSubmit)}>
                            <h1 className='font-semibold text-2xl my-2 mt-4 md:mt-8'>Update Work details</h1>
                            <label htmlFor='title' className='flex justify-start font-medium text-[#EA580C]'>Edit Title</label>
                            <input id='title' {...register("title", { required: true })} className="w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                            {errors.title?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Title is required</p>
                            )}
                            <label htmlFor='heading' className='flex justify-start font-medium text-[#EA580C]'>Edit Heading</label>
                            <input id='heading' {...register("heading", { required: true })} className="w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                            {errors.heading?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Heading is required</p>
                            )}
                            <label htmlFor='keyword' className='flex justify-start font-medium text-[#EA580C]'>Change Keywords</label>
                            <Controller
                                name="keyword"
                                defaultValue={selectedKeywords}
                                control={control}
                                render={({ field }) => (
                                    <CreatableSelect
                                        isMulti
                                        {...field}
                                        options={options}
                                        onChange={(selected) => {
                                            field.onChange(selected);
                                            setSelectedKeywords(selected);
                                        }}
                                        onInputChange={handleNameChange}
                                    />
                                )}
                            />
                            {errors.keyword?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Keyword is required</p>
                            )}
                            <label htmlFor='category' className='flex justify-start font-medium text-[#EA580C]'>Change Category</label>
                            <select id='category' {...register("category")} className="select select-bordered w-full flex-1 mb-3">
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="E-Commerce">E-Commerce</option>
                                <option value="Digital Transformation">Digital Transformation</option>
                                <option value="Content Management">Content Management</option>
                                <option value="Experience Design">Experience Design</option>
                                <option value="Data Strategy">Data Strategy</option>
                                <option value="Product Information Management">Product Information Management</option>
                                <option value="Strategy and Organization">Strategy and Organization</option>
                                <option value="Experience Design">Experience Design</option>
                            </select>
                            {errors.category?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Category is required</p>
                            )}
                            <label htmlFor='aboutWork' className='flex justify-start font-medium text-[#EA580C]'>Edit Details About This Work</label>
                            <Controller
                                name="aboutTheProject"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
                            />
                            {errors.aboutTheProject?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">This field is required</p>
                            )}
                            <label htmlFor='ourSolution' className='flex justify-start font-medium text-[#EA580C]'>Edit Our Solution</label>
                            <Controller
                                name="ourSolution"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
                            />
                            {errors.ourSolution?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">This field is required</p>
                            )}
                            <label htmlFor='theResults' className='flex justify-start font-medium text-[#EA580C]'>Edit Results</label>
                            <Controller
                                name="theResults"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
                            />
                            {errors.theResults?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">This field is required</p>
                            )}

                            {/* Display the current image */}
                            {details?.imageURL && (
                                <div className="mb-4">
                                    <Image height={300} width={300} src={details.imageURL} alt="Current" className="w-full max-w-xs mx-auto" />
                                </div>
                            )}

                            <label htmlFor='photo' className='flex justify-start font-medium text-[#EA580C]'>Change Work Thumbnail</label>
                            <input id='photo' {...register("photo")} className="file-input file-input-bordered w-full" type="file" />
                            {errors.photo?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Photo is required.</p>
                            )}
                            <input type='submit' value="Update" className='block w-full font-bold bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white py-4 mx-auto mt-5 rounded-3xl shadow-lg shadow-[#EA580C]/80 border-0 transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#EA580C]/80 active:scale-95 active:shadow-md active:shadow-[#EA580C]/80' />
                        </form>
                    </div>
                </div>
            </div>
        </PrivateRoute>
    );
};

export default UpdateWork;