"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAdmin from '@/hooks/useAdmin';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdDeleteOutline } from "react-icons/md";
import 'react-quill/dist/quill.snow.css';
import useBlogs from '@/hooks/useBlogs';
import CreatableSelect from "react-select/creatable";
import { FaArrowLeft } from 'react-icons/fa6';
import Image from 'next/image';
import { MdOutlineFileUpload } from 'react-icons/md';
import useBlogKeywords from '@/hooks/useBlogKeywords';
import useBlogCategories from '@/hooks/useBlogCategories';
import Editor from '@/utils/Markdown/Editor/Editor';
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const AddBlog = () => {
	const { register, handleSubmit, formState: { errors }, reset, control, setValue, trigger } = useForm();
	const [allBlog, isBlog, refetch] = useBlogs();
	const axiosPublic = useAxiosPublic();
	const [isAdmin, pending] = useAdmin();
	const router = useRouter();
	const [names, setNames] = useState([]);
	const [names2, setNames2] = useState([]);
	// const [keywords, setKeywords] = useState([]);
	// const [titles, setTitles] = useState([]);
	const [image, setImage] = useState(null);
	const [imageError, setImageError] = useState(false);
	const [allBlogKeywords, isBlogKeywordPending, refetchBlogKeywords] = useBlogKeywords();
	const [allBlogCategories, isBlogCategoryPending, refetchBlogCategories] = useBlogCategories();
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
		if (typeof document !== 'undefined') {
			setMenuPortalTarget(document.body);
		}
	}, [])

	// useEffect(() => {
	// 	const fetchBlogTitle = async () => {
	// 		try {
	// 			if (keywords.length > 0) {
	// 				// Serialize keywords
	// 				const serializedKeywords = encodeURIComponent(JSON.stringify(keywords));
	// 				const response = await axiosPublic.get(`/blogTitle/${serializedKeywords}`);
	// 				setTitles(response?.data?.data);
	// 			}
	// 		} catch (err) {
	// 			toast.error(err.message);
	// 		}
	// 	};

	// 	fetchBlogTitle();
	// }, [keywords, axiosPublic]);


	// Handle category change

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

	const handleGoBack = () => {
		router.push("/dashboard/allBlog");
	};

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
		const category = data.category;
		const newKeywords = data.keyword.map(k => k.value);
		const newCategories = data.category.map(c => c.value);
		const description = data.description;
		const overview = data.overview;
		const embed = data.embed || "";
		const featuredTitle = data?.featuredTitle || "";
		const currentDate = new Date();
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const formattedDate = currentDate.toLocaleDateString('en-US', options);
		const selectedCategoryForFeaturedTitle = selectedCategory || "";
		const filteredTitlesOfSelectedCategory = filteredTitles || [];

		if (image === null) {
			setImageError(true);
			return;
		}
		else {
			setImageError(false);
		}

		let status;
		if (isAdmin) {
			status = "checked";
		} else {
			status = "pending";
		}

		let imageURL = '';
		if (croppedImage) {
			const croppedBlob = await fetch(croppedImage).then((res) => res.blob());
			imageURL = await uploadImageToImgbb({ file: croppedBlob });
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

		const blogInfo = { title, keyword, embed, featuredTitle, formattedDate, category, description, overview, imageURL, status, selectedCategoryForFeaturedTitle, filteredTitlesOfSelectedCategory };

		const res = await axiosPublic.post("/addBlog", blogInfo);
		if (res?.data?.insertedId) {
			reset();
			refetch();
			toast.success("Your blog successfully published");
			router.push("/dashboard/allBlog");
		}
	}

	if (pending || isBlog || isBlogKeywordPending || isBlogCategoryPending) {
		return <Loading />
	};

	return (
		<PrivateRoute>
			<div className='min-h-screen'>

				<div className='max-w-screen-2xl px-6 mx-auto'>

					<div className='max-w-screen-2xl mx-auto pt-3 pb-1 sticky top-0 z-10 bg-white'>
						<div className='max-w-screen-xl mx-auto flex items-center justify-between'>
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
													menuPortalTarget={menuPortalTarget}
													styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
													menuPlacement="auto"
													onChange={(selected) => {
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
													menuPortalTarget={menuPortalTarget}
													styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
													menuPlacement="auto"
													onChange={(selected) => {
														// setKeywords(selected);
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

									{/* {titles?.length > 0 ? <div>
										<label htmlFor='featured' className='flex justify-start font-medium text-[#EA580C] pt-6 pb-2'>Select Featured Post Title *</label>
										<select {...register("featured", { required: true })} className="select select-bordered w-full flex-1">
											{
												titles?.map((sector, index) => (
													<option key={index} value={sector}>{sector}</option>
												))
											}
										</select>
										{errors.featured && <p className="text-red-600">Featured title selection is required</p>}
									</div> : <div>
										<p className='pt-10'>No featured posts available. Please select a keyword instead!</p>
									</div>} */}

								</div>

								<div className='flex flex-col bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>
									{/* Category Selection */}
									<div>
										<label
											htmlFor="category"
											className="flex justify-start font-medium text-[#EA580C] pt-6 pb-2"
										>
											Select Category for featured post title
										</label>
										<select
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
											<p className='font-semibold'>Your selected category has no featured post available.</p>
											<p className='font-semibold'>Please select another category.</p>
										</div>
									)}

								</div>

							</div>

						</div>

						<div className='flex justify-end items-center mt-3 relative'>
							<div className='fixed bottom-4 right-12 z-50'>
								<button type='submit' className={`text-white bg-gray-800 w-fit h-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[background-position] duration-700 ease-in-out hover:bg-[50%_100%]`}>
									Submit
								</button>
							</div>
						</div>

					</form>
				</div>

			</div>
		</PrivateRoute>
	);
};

export default AddBlog;