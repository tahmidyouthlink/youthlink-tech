"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAdmin from '@/hooks/useAdmin';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ImCross } from "react-icons/im";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import useJobs from '@/hooks/useJobs';
import CreatableSelect from "react-select/creatable";

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

	let temp = [];
	const handleNameChange = (inputValue) => {
		if (inputValue) {
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
	}

	let temp2 = [];
	const handleNameChange2 = (inputValue) => {
		if (inputValue) {
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
	}

	const onSubmit = async (data) => {
		const title = data.title;
		const locationType = data.locationType;
		const type = data.type;
		const category = data.category;
		const jobDescription = data.jobDescription;
		const keyResponsibilities = data.keyResponsibilities;
		const requirements = data.requirements;
		const preferredQualifications = data.preferredQualifications;
		const skillsRequired = data.skillsRequired; // Get value from form data
		const recruiter = data.recruiter;
		const recruiterEmail = data.recruiterEmail;
		const photo = data.photo[0];
		let status;
		if (isAdmin) {
			status = "checked";
		}
		else {
			status = "pending";
		}
		const photoObj = { image: photo };
		const uploadImage = await axiosPublic.post(apiURL, photoObj, {
			headers: {
				"content-type": "multipart/form-data",
			}
		});
		const imageURL = uploadImage?.data?.data?.display_url;
		const jobInfo = { title, locationType, type, category, jobDescription, keyResponsibilities, requirements, preferredQualifications, skillsRequired, recruiter, recruiterEmail, imageURL, status };
		const res = await axiosPublic.post("/addJobCircular", jobInfo);
		if (res?.data?.insertedId) {
			reset();
			refetch();
			toast.success("Your job successfully published");
			router.push("/dashboard/allJob");
		}
	}

	if (pending) {
		return <Loading />;
	}

	return (
		<PrivateRoute>
			<div>
				<div className='fixed right-2 top-2'>
					<Link href={'/dashboard/allJob'}>
						<ImCross className='hover:scale-105' size={20} />
					</Link>
				</div>
				<div className="flex flex-col items-center justify-center space-y-4 w-full">
					<div className='w-full'>
						<form className='flex flex-col gap-4 mx-auto mt-6 px-6 max-w-screen-md' onSubmit={handleSubmit(onSubmit)}>
							<h1 className='font-semibold text-2xl mb-2 mt-4 md:mt-8'>Enter Job details</h1>

							<label htmlFor='title' className='flex justify-start font-medium text-[#EA580C]'>Job Title *</label>
							<input id='title' {...register("title", { required: true })} className="w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
							{errors.title?.type === "required" && (
								<p className="text-red-600 text-left pt-1">Title is required</p>
							)}

							<label htmlFor='locationType' className='flex justify-start font-medium text-[#EA580C]'>Location *</label>
							<select id='locationType' {...register("locationType", { required: true })} className="select select-bordered w-full flex-1 mb-3">
								<option value="Onsite">Onsite</option>
								<option value="Remote">Remote</option>
								<option value="Hybrid">Hybrid</option>
							</select>
							{errors.locationType?.type === "required" && (
								<p className="text-red-600 text-left pt-1">Location is required</p>
							)}

							<label htmlFor='type' className='flex justify-start font-medium text-[#EA580C]'>Job Type *</label>
							<select id='type' {...register("type", { required: true })} className="select select-bordered w-full flex-1 mb-3">
								<option value="Full Time">Full Time</option>
								<option value="Part Time">Part Time</option>
								<option value="Contract/Freelance">Contract/Freelance</option>
								<option value="Internship">Internship</option>
							</select>
							{errors.type?.type === "required" && (
								<p className="text-red-600 text-left pt-1">Job Type is required</p>
							)}

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

							<label htmlFor='skillsRequired' className='flex justify-start font-medium text-[#EA580C]'>Skills Required *</label>
							<Controller
								name="skillsRequired"
								control={control}
								defaultValue={[]}
								rules={{ required: true }}
								render={({ field }) => (
									<CreatableSelect
										{...field}
										isMulti
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

							<label htmlFor='recruiter' className='flex justify-start font-medium text-[#EA580C]'>Hiring Manager Name *</label>
							<input id='recruiter' {...register("recruiter", { required: true })} className="w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
							{errors.recruiter?.type === "required" && (
								<p className="text-red-600 text-left pt-1">Hiring Manager Name is required</p>
							)}

							<label htmlFor='recruiterEmail' className='flex justify-start font-medium text-[#EA580C]'>Hiring Manager Email *</label>
							<input id='recruiterEmail' {...register("recruiterEmail", { required: true })} className="w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="email" />
							{errors.recruiterEmail?.type === "required" && (
								<p className="text-red-600 text-left pt-1">Hiring Manager Email is required</p>
							)}

							<label htmlFor='photo' className='flex justify-start font-medium text-[#EA580C]'>Hiring Manager Photo *</label>
							<input id='photo' {...register("photo", { required: true })} className="file-input file-input-bordered w-full mt-1 mb-3" type="file" />
							{errors.photo?.type === "required" && (
								<p className="text-red-600 text-left pt-1">Photo is required</p>
							)}

							<label htmlFor='jobDescription' className='flex justify-start font-medium text-[#EA580C]'>Job Description *</label>
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

							<label htmlFor='keyResponsibilities' className='flex justify-start font-medium text-[#EA580C]'>Key Responsibilities *</label>
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

							<label htmlFor='requirements' className='flex justify-start font-medium text-[#EA580C]'>Requirements *</label>
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

							<label htmlFor='preferredQualifications' className='flex justify-start font-medium text-[#EA580C]'>Preferred Qualifications *</label>
							<Controller
								name="preferredQualifications"
								control={control}
								defaultValue=""
								rules={{ required: true }}
								render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
							/>

							<input type='submit' className='block w-full font-bold bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white py-4 mx-auto mt-5 rounded-3xl shadow-lg shadow-[#EA580C]/80 border-0 transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#EA580C]/80 active:scale-95 active:shadow-md active:shadow-[#EA580C]/80' />
						</form>
					</div>
				</div>
			</div>
		</PrivateRoute>
	);
};

export default AddCareer;