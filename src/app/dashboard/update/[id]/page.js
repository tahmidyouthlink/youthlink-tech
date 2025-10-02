"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useWorks from '@/hooks/useWorks';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import CreatableSelect from 'react-select/creatable';
import useWorkCategories from '@/hooks/useWorkCategories';
import useWorkKeywords from '@/hooks/useWorkKeywords';
import { FaArrowLeft } from 'react-icons/fa6';
import { MdOutlineFileUpload } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

import DOMPurify from "dompurify";

const OurWorkEditor = dynamic(() => import('@/utils/Markdown/Editor/OurWorkEditor'), { ssr: false });
const OurWorkTitleEditor = dynamic(() => import('@/utils/Markdown/Editor/OurWorkTitleEditor'), { ssr: false });

const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const UpdateWork = ({ params }) => {
	const { handleSubmit, formState: { errors }, reset, control, setValue } = useForm();
	const [, , refetch] = useWorks();
	const axiosPublic = useAxiosPublic();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [work, setWork] = useState({});
	const [selectedKeywords, setSelectedKeywords] = useState([]);
	const [options, setOptions] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [options2, setOptions2] = useState([]);
	const [image, setImage] = useState(null);
	const [imageError, setImageError] = useState(false);
	const [workCategory, isWorkCategoryPending, refetchWorkCategory] = useWorkCategories();
	const [workKeywords, isWorkKeywordsPending, refetchWorkKeywords] = useWorkKeywords();

	useEffect(() => {
		const fetchWork = async () => {
			const res = await axiosPublic.get(`/allWork/${params?.id}`);
			const work = res.data;
			setWork(work);
			setValue('title', work?.title);
			setValue('details', work?.details);
			setValue('keyword', work?.keyword);
			setValue('category', work?.category);
			setImage(work?.imageURL);
			setSelectedKeywords(work?.keyword?.map(skill => skill));
			setSelectedCategories(work?.category?.map(cat => cat));
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
	};

	let temp2 = [];
	const handleNameChange2 = (inputValue) => {
		if (inputValue) {
			try {
				(async () => {
					const res = await axiosPublic.get(`/workCategory/${inputValue.toLowerCase()}`);
					const name = res?.data?.map(data => {
						const option = {
							label: data?.workCategory,
							value: data?.workCategory,
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

	const handleGoBack = () => {
		router.push("/dashboard/allWork");
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

	const uploadImageToImgbb = async (imageFile) => {
		const formData = new FormData();
		formData.append('image', imageFile);

		try {
			const response = await fetch(apiURL, {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();

			if (data.data && data.data.url) {
				return data.data.url; // Imgbb URL of the uploaded image
			} else {
				console.error('Error uploading image:', data);
				return null;
			}
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	};

	const onSubmit = async (data) => {

		// Transform all <p> to <h3> just before sending
		const titleAsH1 = data.title.replace(/<p>(.*?)<\/p>/g, '<h1>$1</h1>');
		const detailsAsH3 = data.details.replace(/<p>(.*?)<\/p>/g, '<h3>$1</h3>');

		const title = titleAsH1;
		const details = detailsAsH3;
		const keyword = selectedKeywords?.map(skill => skill);
		const category = data.category;
		const newKeywords = data.keyword.map(k => k.value);
		const newCategories = data.category.map(c => c.value);

		// Initialize imageUrl with the existing one
		let imageURL = work?.imageURL || '';

		// If a new image is uploaded, upload it to Imgbb
		if (image && image.file) {
			imageURL = await uploadImageToImgbb(image.file);
			if (!imageURL) {
				toast.error('Image upload failed, cannot proceed.');
			}
		} else if (image === null) {
			// If the image is removed, explicitly set imageURL to an empty string
			imageURL = '';
		}

		if (image === null) {
			setImageError(true);
			return;
		} else {
			setImageError(false);
		}

		// Extract existing keywords from `allBlogKeywords`
		const existingKeywords = workKeywords.map(item => item.workKeywords);

		// Identify only new keywords that are not in the existing list
		const uniqueNewKeywords = newKeywords.filter(keyword => !existingKeywords.includes(keyword));

		// Only proceed if there are unique new keywords to add
		if (uniqueNewKeywords.length > 0) {
			try {
				// Send only the new keywords to be added to the backend
				const response = await axiosPublic.post('/publishWorkKeywords', { keywords: uniqueNewKeywords });
				if (response?.data?.result?.insertedCount > 0) {
					refetchWorkKeywords();
				}

			} catch (error) {
				console.error('Error publishing blog keywords:', error);
			}
		}

		// Extract existing keywords from `allWorkCategories`
		const existingCategories = workCategory.map(item => item.workCategory);

		// Identify only new keywords that are not in the existing list
		const uniqueNewCategories = newCategories.filter(category => !existingCategories.includes(category));

		// Only proceed if there are unique new categories to add
		if (uniqueNewCategories.length > 0) {
			try {
				// Send only the new keywords to be added to the backend
				const response = await axiosPublic.post('/publishWorkCategories', { categories: uniqueNewCategories });
				if (response?.data?.result?.insertedCount > 0) {
					refetchWorkCategory();
				}

			} catch (error) {
				console.error('Error publishing blog keywords:', error);
			}
		}

		const updatedWorkInfo = { title, details, keyword, category, imageURL };
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

	if (loading || isWorkCategoryPending || isWorkKeywordsPending) {
		return <Loading />;
	}

	return (
		<PrivateRoute>
			<div className='min-h-screen'>
				<div className='max-w-screen-2xl px-6 mx-auto'>

					<div className='max-w-screen-2xl mx-auto pt-6 pb-1 sticky top-0 z-10 bg-white'>
						<div className='max-w-screen-xl mx-auto flex items-center justify-between'>
							<h3 className='w-full font-semibold text-lg md:text-xl lg:text-3xl'>Edit Work Configuration</h3>
							<button className='flex items-center gap-2 text-[10px] md:text-base justify-end w-full' onClick={() => handleGoBack()}> <span className='border border-black hover:scale-105 duration-300 rounded-full p-1 md:p-2'><FaArrowLeft /></span> Go Back</button>
						</div>
					</div>

					<form className='max-w-screen-xl mx-auto pt-1 pb-6 flex flex-col' onSubmit={handleSubmit(onSubmit)}>

						<div className='grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6'>

							<div className='grid grid-cols-1 lg:col-span-7 gap-8 mt-3 py-3 h-fit'>

								<div className='flex flex-col gap-4 bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>
									<div>
										<label htmlFor='title' className='flex justify-start font-medium text-[#EA580C] pt-2 pb-2'>Work Title *</label>
										<Controller
											name='title'
											control={control}
											defaultValue=""
											rules={{
												validate: (value) => {
													const strippedText = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] }).trim();
													if (!strippedText) return "Title is required.";
													if (strippedText.length < 10) return "Title must be at least 10 characters.";
													return true;
												},
											}}
											render={({ field }) => (
												<OurWorkTitleEditor
													value={field.value}
													onChange={(value) => {
														field.onChange(value);
													}}
												/>
											)}
										/>
										{errors?.title && (
											<p className="text-red-600 text-left text-xs font-semibold pt-1">
												{errors.title.message}
											</p>
										)}
									</div>

									<div>
										<label htmlFor='keyword' className='flex justify-start font-medium text-[#EA580C] pb-2'>Change Keywords</label>
										<Controller
											name="keyword"
											defaultValue={selectedKeywords}
											control={control}
											rules={{
												validate: (value) => {
													if (!value || value.length === 0) {
														return "At least one keyword is required";
													}
													return true;
												}
											}}
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
										{errors.keyword && (
											<p className="text-red-600 text-left text-xs font-semibold pt-1">
												{errors.keyword.message}
											</p>
										)}
									</div>
									<div>
										<label htmlFor='category' className='flex justify-start font-medium text-[#EA580C] pb-2'>Change Categories</label>
										<Controller
											name="category"
											defaultValue={selectedCategories}
											control={control}
											rules={{
												validate: (value) => {
													if (!value || value.length === 0) {
														return "At least one category is required";
													}
													return true;
												}
											}}
											render={({ field }) => (
												<CreatableSelect
													isMulti
													{...field}
													options={options2}
													onChange={(selected) => {
														if (selected?.length > 3) {
															toast.error("You can select up to 3 items only.")
														} else {
															field.onChange(selected);
															setSelectedCategories(selected);
														}
													}}
													onInputChange={handleNameChange2}
												/>
											)}
										/>
										{errors.category && (
											<p className="text-red-600 text-left text-xs font-semibold pt-1">
												{errors.category.message}
											</p>
										)}
									</div>

								</div>

							</div>

							<div className='grid grid-cols-1 lg:col-span-5 gap-8 mt-3 py-3 h-fit'>

								<div className='flex flex-col bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>
									<label htmlFor='details' className='flex justify-start font-medium text-[#EA580C] pt-2 pb-2'>Details About This Work *</label>
									<Controller
										name='details'
										control={control}
										defaultValue=""
										rules={{
											validate: (value) => {
												const strippedText = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] }).trim();
												if (!strippedText) return "Details is required.";
												if (strippedText.length < 30) return "Details must be at least 30 characters.";
												return true;
											},
										}}
										render={({ field }) => (
											<OurWorkEditor
												value={field.value}
												onChange={(value) => {
													field.onChange(value);
												}}
											/>
										)}
									/>
									{errors?.details && (
										<p className="text-red-600 text-left text-xs font-semibold pt-1">
											{errors.details.message}
										</p>
									)}
								</div>

								<div className='flex flex-col bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>
									<div className='flex flex-col gap-4 mt-6'>
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
													Upload Thumbnail
												</h5>
												<p className='text-sm text-gray-500'>
													Photo Should be in PNG, JPEG or JPG format
												</p>
											</div>
										</label>
										{imageError && <p className="text-red-600">Work thumbnail is required</p>}

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
										)}

									</div>
								</div>

							</div>

						</div>

						<div className='flex justify-end items-center mt-3'>

							<button type='submit' className={`text-white bg-gray-800 w-fit h-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[background-position] duration-700 ease-in-out hover:bg-[50%_100%]`}>
								Update
							</button>
						</div>

					</form>
				</div>
			</div>
		</PrivateRoute>
	);
};

export default UpdateWork;