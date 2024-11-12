"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAdmin from '@/hooks/useAdmin';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import useJobs from '@/hooks/useJobs';
import CreatableSelect from "react-select/creatable";
import { FaArrowLeft } from 'react-icons/fa6';
import { MdOutlineFileUpload } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import useJobCategories from '@/hooks/useJobCategories';
import useJobSkills from '@/hooks/useJobSkills';

const Editor = dynamic(() => import('@/utils/Markdown/Editor/Editor'), { ssr: false });
const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const AddCareer = () => {
	const { register, handleSubmit, formState: { errors }, reset, control, setValue, trigger } = useForm();
	const [, , refetch] = useJobs();
	const axiosPublic = useAxiosPublic();
	const [isAdmin, pending] = useAdmin();
	const router = useRouter();
	const [names, setNames] = useState([]);
	const [names2, setNames2] = useState([]);
	const [menuPortalTarget, setMenuPortalTarget] = useState(null);
	const [image, setImage] = useState(null);
	const [imageError, setImageError] = useState(false);
	const [allJobCategories, isJobCategoryPending, refetchJobCategories] = useJobCategories();
	const [allJobSkills, isJobSkillsPending, refetchJobSkills] = useJobSkills();

	let temp = [];
	const handleNameChange = (inputValue) => {
		if (inputValue && inputValue.trim()) {
			try {
				(async () => {
					const res = await axiosPublic.get(`/allSkills/${inputValue.toLowerCase()}`);
					const name = res?.data?.map(data => {
						const option = {
							label: data?.allSkills,
							value: data?.allSkills,
						}
						temp.push(option);
					});
					setNames(temp);
				})();
			} catch (err) {
				console.log(err);
			}
		}
	};

	let temp2 = [];
	const handleNameChange2 = (inputValue) => {
		if (inputValue && inputValue.trim()) {
			try {
				(async () => {
					const res = await axiosPublic.get(`/careerCategory/${inputValue.toLowerCase()}`);
					const name = res?.data?.map(data => {
						const option = {
							label: data?.careerCategory,
							value: data?.careerCategory,
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
	}, []);

	const handleGoBack = () => {
		router.push("/dashboard/allJob");
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

	const onSubmit = async (data) => {
		const title = data.title;
		const locationType = data.locationType;
		const type = data.type;
		const jobDescription = data.jobDescription;
		const keyResponsibilities = data.keyResponsibilities;
		const requirements = data.requirements;
		const preferredQualifications = data.preferredQualifications;
		const recruiter = data.recruiter;
		const recruiterEmail = data.recruiterEmail;
		const category = data.category;
		const skillsRequired = data.skillsRequired; // Get value from form data
		const newSkills = data.skillsRequired.map(s => s.value);
		const newCategories = data.category.map(c => c.value);

		if (image === null) {
			setImageError(true);
			return;
		} else {
			setImageError(false);
		}

		let status;
		if (isAdmin) {
			status = "checked";
		}
		else {
			status = "pending";
		}

		let imageURL = '';
		if (image) {
			imageURL = await uploadImageToImgbb(image);
			if (!imageURL) {
				toast.error('Image upload failed, cannot proceed.');
				return;
			}
		};

		// Extract existing skills from `allJobSkills`
		const existingSkills = allJobSkills.map(item => item.allSkills);

		// Identify only new skills that are not in the existing list
		const uniqueNewSkills = newSkills.filter(skill => !existingSkills.includes(skill));

		// Only proceed if there are unique new skills to add
		if (uniqueNewSkills.length > 0) {
			try {
				// Send only the new skills to be added to the backend
				const response = await axiosPublic.post('/publishJobSkills', { skills: uniqueNewSkills });
				if (response?.data?.result?.insertedCount > 0) {
					refetchJobSkills();
				}

			} catch (error) {
				console.error('Error publishing job skills:', error);
			}
		}
		// Extract existing categories from `allJobCategories`
		const existingCategories = allJobCategories.map(item => item.careerCategory);

		// Identify only new categories that are not in the existing list
		const uniqueNewCategories = newCategories.filter(category => !existingCategories.includes(category));

		// Only proceed if there are unique new categories to add
		if (uniqueNewCategories.length > 0) {
			try {
				// Send only the new categories to be added to the backend
				const response = await axiosPublic.post('/publishJobCategories', { categories: uniqueNewCategories });
				if (response?.data?.result?.insertedCount > 0) {
					refetchJobCategories();
				}

			} catch (error) {
				console.error('Error publishing job categories:', error);
			}
		}

		const jobInfo = { title, locationType, type, category, jobDescription, keyResponsibilities, requirements, preferredQualifications, skillsRequired, recruiter, recruiterEmail, imageURL, status };

		const res = await axiosPublic.post("/addJobCircular", jobInfo);
		if (res?.data?.insertedId) {
			reset();
			refetch();
			toast.success("Your job successfully published");
			router.push("/dashboard/allJob");
		}
	}

	if (pending || isJobCategoryPending || isJobSkillsPending) {
		return <Loading />;
	}

	return (
		<PrivateRoute>
			<div className='min-h-screen'>

				<div className='max-w-screen-2xl px-6 mx-auto'>

					<div className='max-w-screen-2xl mx-auto pt-3 pb-1 sticky top-0 z-10 bg-white'>
						<div className='max-w-screen-xl mx-auto flex items-center justify-between'>
							<h3 className='w-full font-semibold text-lg md:text-xl lg:text-2xl'>Job Configuration</h3>
							<button className='flex items-center gap-2 text-[10px] md:text-base justify-end w-full' onClick={() => handleGoBack()}> <span className='border border-black hover:scale-105 duration-300 rounded-full p-1 md:p-2'><FaArrowLeft /></span> Go Back</button>
						</div>
					</div>

					<form className='max-w-screen-xl mx-auto pt-1 pb-6 flex flex-col' onSubmit={handleSubmit(onSubmit)}>

						<div className='grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6'>

							<div className='grid grid-cols-1 lg:col-span-7 gap-8 mt-3 py-3 h-fit'>
								<div className='flex flex-col gap-4 bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>
									<div>
										<label htmlFor='title' className='flex justify-start font-medium text-[#EA580C] py-2'>Job Title *</label>
										<input id='title' {...register("title", { required: true })} className="bg-gradient-to-r from-white to-gray-50 w-full p-3 border border-gray-300 outline-none focus:border-[#EA580C] transition-colors duration-1000 rounded-md" type="text" />
										{errors.title?.type === "required" && (
											<p className="text-red-600 text-left pt-1">Title is required</p>
										)}
									</div>
									<div>
										<label htmlFor='locationType' className='flex justify-start font-medium text-[#EA580C] py-2'>Location *</label>
										<select id='locationType' {...register("locationType", { required: true })} className="select select-bordered w-full flex-1 mb-3">
											<option value="Onsite">Onsite</option>
											<option value="Remote">Remote</option>
											<option value="Hybrid">Hybrid</option>
										</select>
										{errors.locationType?.type === "required" && (
											<p className="text-red-600 text-left pt-1">Location is required</p>
										)}
									</div>
									<div>
										<label htmlFor='type' className='flex justify-start font-medium text-[#EA580C] py-2'>Job Type *</label>
										<select id='type' {...register("type", { required: true })} className="select select-bordered w-full flex-1 mb-3">
											<option value="Full Time">Full Time</option>
											<option value="Part Time">Part Time</option>
											<option value="Contract/Freelance">Contract/Freelance</option>
											<option value="Internship">Internship</option>
										</select>
										{errors.type?.type === "required" && (
											<p className="text-red-600 text-left pt-1">Job Type is required</p>
										)}
									</div>
									<div>
										<label htmlFor='category' className='flex justify-start font-medium text-[#EA580C] py-2'>Select Category *</label>
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
														if (selected?.length > 3) {
															toast.error("You can select up to 3 items only.")
														} else {
															field.onChange(selected);
															setValue("category", selected);
															trigger("category");
														}
													}}
													options={names2}
													onInputChange={handleNameChange2}
												/>
											)}
										/>
										{errors.category && (
											<p className="text-red-600 text-left pt-1">Categories are required</p>
										)}
									</div>
									<div>
										<label htmlFor='skillsRequired' className='flex justify-start font-medium text-[#EA580C] py-2'>Skills Required *</label>
										<Controller
											name="skillsRequired"
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
														if (selected?.length > 3) {
															toast.error("You can select up to 3 items only.")
														} else {
															field.onChange(selected);
															setValue("skillsRequired", selected);
															trigger("skillsRequired");
														}
													}}
													options={names}
													onInputChange={handleNameChange}
												/>
											)}
										/>
										{errors.skillsRequired && (
											<p className="text-red-600 text-left pt-1">Skills are required</p>
										)}
									</div>
								</div>
								<div className='flex flex-col gap-4 bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>
									<div>
										<label htmlFor='recruiter' className='flex justify-start font-medium text-[#EA580C] py-2'>Hiring Manager Name *</label>
										<input id='recruiter' {...register("recruiter", { required: true })} className="bg-gradient-to-r from-white to-gray-50 w-full p-3 border border-gray-300 outline-none focus:border-[#EA580C] transition-colors duration-1000 rounded-md" type="text" />
										{errors.recruiter?.type === "required" && (
											<p className="text-red-600 text-left pt-1">Hiring Manager Name is required</p>
										)}
									</div>
									<div>
										<label htmlFor='recruiterEmail' className='flex justify-start font-medium text-[#EA580C] py-2'>Hiring Manager Email *</label>
										<input id='recruiterEmail' {...register("recruiterEmail", { required: true })} className="bg-gradient-to-r from-white to-gray-50 w-full p-3 border border-gray-300 outline-none focus:border-[#EA580C] transition-colors duration-1000 rounded-md" type="email" />
										{errors.recruiterEmail?.type === "required" && (
											<p className="text-red-600 text-left pt-1">Hiring Manager Email is required</p>
										)}
									</div>
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
													Upload Recruiter photo
												</h5>
												<p className='text-sm text-gray-500'>
													Photo Should be in PNG, JPEG or JPG format
												</p>
											</div>
										</label>
										{imageError && <p className="text-red-600">Recruiter photo is required</p>}

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
									</div>
								</div>
							</div>

							<div className='grid grid-cols-1 lg:col-span-5 gap-8 mt-3 py-3 h-fit'>

								<div className='flex flex-col bg-[#ffffff] gap-4 drop-shadow p-5 md:p-7 rounded-lg h-fit'>
									<div>
										<label htmlFor='jobDescription' className='flex justify-start font-medium text-[#EA580C] py-2'>Job Description *</label>
										<Controller
											name="jobDescription"
											control={control}
											defaultValue=""
											rules={{ required: true }}
											render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
										/>
										{errors.jobDescription?.type === "required" && (
											<p className="text-red-600 text-left pt-1">Job Description is required</p>
										)}
									</div>
									<div>
										<label htmlFor='keyResponsibilities' className='flex justify-start font-medium text-[#EA580C] py-2'>Key Responsibilities *</label>
										<Controller
											name="keyResponsibilities"
											control={control}
											defaultValue=""
											rules={{ required: true }}
											render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
										/>
										{errors.keyResponsibilities?.type === "required" && (
											<p className="text-red-600 text-left pt-1">Key Responsibilities are required</p>
										)}
									</div>
								</div>
								<div className='flex flex-col bg-[#ffffff] gap-4 drop-shadow p-5 md:p-7 rounded-lg h-fit'>
									<div>
										<label htmlFor='requirements' className='flex justify-start font-medium text-[#EA580C] py-2'>Requirements *</label>
										<Controller
											name="requirements"
											control={control}
											defaultValue=""
											rules={{ required: true }}
											render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
										/>
										{errors.requirements?.type === "required" && (
											<p className="text-red-600 text-left pt-1">Requirements are required</p>
										)}
									</div>
									<div>
										<label htmlFor='preferredQualifications' className='flex justify-start font-medium text-[#EA580C] py-2'>Preferred Qualifications *</label>
										<Controller
											name="preferredQualifications"
											control={control}
											defaultValue=""
											rules={{ required: true }}
											render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
										/>
										{errors.preferredQualifications?.type === "required" && (
											<p className="text-red-600 text-left pt-1">Preferred Qualifications are required</p>
										)}
									</div>
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

export default AddCareer;