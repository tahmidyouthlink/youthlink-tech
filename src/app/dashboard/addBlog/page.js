"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAdmin from '@/hooks/useAdmin';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import useBlogs from '@/hooks/useBlogs';
import CreatableSelect from "react-select/creatable";
import { FaArrowLeft } from 'react-icons/fa6';
import Image from 'next/image';
import { MdOutlineFileUpload } from 'react-icons/md';
import useBlogKeywords from '@/hooks/useBlogKeywords';
import useBlogCategories from '@/hooks/useBlogCategories';
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
	const [activeTab, setActiveTab] = useState('cover image');
	const [image, setImage] = useState(null);
	const [imageError, setImageError] = useState(false);
	const [allBlogKeywords, isBlogKeywordPending, refetchBlogKeywords] = useBlogKeywords();
	const [allBlogCategories, isBlogCategoryPending, refetchBlogCategories] = useBlogCategories();

	let temp = [];
	const handleNameChange = (inputValue) => {
		if (inputValue && inputValue.trim()) {
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
		if (inputValue && inputValue.trim()) {
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
	};

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

	// Handle tab switching
	const handleTabSwitch = (tab) => {
		setActiveTab(tab);

		// Clear values for the inactive tab
		if (tab === 'cover image') {
			setValue('embed', ''); // Clear embed video field when switching to cover image
		} else if (tab === 'embed video code') {
			setImage(null); // Clear image selection when switching to embed video
			setValue('imageUpload', null); // Clear the value in the form as well
		}
	};

	const onSubmit = async (data) => {
		const title = data.title;
		const keyword = data.keyword;
		const newKeywords = data.keyword.map(k => k.value);
		const category = data.category;
		const newCategories = data.category.map(c => c.value);
		const description = data.description;
		const embed = data.embed || "";
		const featured = data?.featured || "";
		const currentDate = new Date();
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const formattedDate = currentDate.toLocaleDateString('en-US', options);

		if (activeTab === "cover image") {
			if (image === null) {
				setImageError(true);
				return;
			}
			else {
				setImageError(false);
			}
		}

		let status;
		if (isAdmin) {
			status = "checked";
		} else {
			status = "pending";
		}

		let imageURL = '';
		if (image) {
			imageURL = await uploadImageToImgbb(image);
			if (!imageURL) {
				toast.error('Image upload failed, cannot proceed.');
				return;
			}
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

		const blogInfo = { title, keyword, embed, featured, formattedDate, category, description, imageURL, status, activeTab };

		const res = await axiosPublic.post("/addBlog", blogInfo);
		if (res?.data?.insertedId) {
			reset();
			refetch();
			toast.success("Your blog successfully published");
			router.push("/dashboard/allBlog");
		}
	}

	if (pending || isBlogKeywordPending || isBlogCategoryPending) {
		return <Loading />
	};

	// console.log(titles);

	return (
		<PrivateRoute>
			<div className='min-h-screen'>

				<div className='max-w-screen-2xl px-6 mx-auto'>

					<div className='max-w-screen-xl mx-auto pt-3 pb-1 sticky top-0 z-10 bg-white'>
						<div className='flex items-center justify-between'>
							<h3 className='w-full font-semibold text-lg md:text-xl lg:text-2xl'>Blog Configuration</h3>
							<button className='flex items-center gap-2 text-[10px] md:text-base justify-end w-full' onClick={() => handleGoBack()}> <span className='border border-black hover:scale-105 duration-300 rounded-full p-1 md:p-2'><FaArrowLeft /></span> Go Back</button>
						</div>
					</div>

					<form className='max-w-screen-xl mx-auto pt-1 pb-6 flex flex-col' onSubmit={handleSubmit(onSubmit)}>

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
								<div className='flex flex-col gap-4 bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>
									<div>
										<label htmlFor='category' className='flex justify-start font-medium text-[#EA580C] pb-2'>Select Category *</label>
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
											<p className="text-red-600 text-left pt-1">Category is required</p>
										)}
									</div>
									<div>
										<label htmlFor='keyword' className='flex justify-start font-medium text-[#EA580C] pb-2'>Keyword *</label>
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
											<p className="text-red-600 text-left pt-1">Keyword is required</p>
										)}
									</div>
								</div>
							</div>

							<div className='grid grid-cols-1 lg:col-span-5 gap-8 mt-3 py-3 h-fit'>

								<div className='flex flex-col bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>

									<div className='flex flex-wrap items-center gap-3 bg-white'>
										<button
											className={`relative text-sm py-1 transition-all duration-300
        ${activeTab === 'cover image' ? 'text-[#D2016E] font-semibold' : 'text-neutral-400 font-medium'}
        after:absolute after:left-0 after:right-0 hover:text-[#D2016E] after:bottom-0 
        after:h-[2px] after:bg-[#D2016E] after:transition-all after:duration-300
        ${activeTab === 'cover image' ? 'after:w-full font-bold' : 'after:w-0 hover:after:w-full'}
      `}
											onClick={() => handleTabSwitch('cover image')}
										>
											Blog thumbnail
										</button>

										<button
											className={`relative text-sm py-1 transition-all duration-300
        ${activeTab === 'embed video code' ? 'text-[#D2016E] font-semibold' : 'text-neutral-400 font-medium'}
        after:absolute after:left-0 after:right-0 after:bottom-0 
        after:h-[2px] after:bg-[#D2016E] hover:text-[#D2016E] after:transition-all after:duration-300
        ${activeTab === 'embed video code' ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
      `}
											onClick={() => handleTabSwitch('embed video code')}
										>
											Embed video code
										</button>
									</div>

									{activeTab === "cover image" && <div className='flex flex-col gap-4 mt-6'>
										<input
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
													Upload Blog Thumbnail
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
									</div>}

									{activeTab === "embed video code" && <div>
										<label htmlFor='embed' className='flex justify-start font-medium text-[#EA580C] mt-3 pb-2'>Upload embed video code</label>
										<textarea className='w-full p-3 mb-4 border rounded-md outline-none focus:border-[#D2016E] transition-colors duration-1000' id='embed' {...register('embed', { required: activeTab === 'embed video code' })} rows={4} cols={50} />
										{errors.embed && <p className="text-red-600">Embed video code is required</p>}
									</div>}

									{titles?.length > 0 ? <div>
										<label htmlFor='featured' className='flex justify-start font-medium text-[#EA580C] pt-6 pb-2'>Select Featured Post Title *</label>
										<select {...register("featured")} className="select select-bordered w-full flex-1">
											{
												titles?.map((sector, index) => (
													<option key={index} value={sector}>{sector}</option>
												))
											}
										</select>
									</div> : <div>
										<p className='pt-10'>No featured posts available. Please select a keyword instead!</p>
									</div>}

								</div>
							</div>

						</div>

						<div className='flex justify-end items-center mt-3'>

							<button type='submit' className={`bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white py-2 px-4 text-sm md:text-base rounded-md cursor-pointer font-medium flex items-center gap-2`}>
								Submit
							</button>
						</div>

					</form>
				</div>

			</div>
		</PrivateRoute>
	);
};

export default AddBlog;