import Loading from '@/components/shared/Loading/Loading';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import useJobs from '@/hooks/useJobs';
import Link from 'next/link';

const CareerTable = () => {
    const [allJob, isJob] = useJobs();

    if (isJob) {
        return <Loading />;
    }

    return (
        <PrivateRoute>
            {allJob?.length > 0 ? <div>
                <h1 className='mt-8 my-4 px-10 font-semibold'>Careers</h1>
                <div className="max-w-screen-xl mx-auto px-6">
                    <div className="overflow-x-auto max-h-[70vh] mt-6">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Category</th>
                                    <th>Keywords</th>
                                    <th>Status</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allJob?.map((job, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="font-bold">{job?.title}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="px-4 py-1 text-[10px] md:text-xs lg:text-base bg-gray-200 rounded-lg">{job?.category}</span>
                                        </td>
                                        <td>{job?.skillsRequired?.map((skill, index) => <p key={index} className={`text-neutral-400`}>{skill?.value}</p>)}</td>
                                        <td>{job?.status === "checked" ? <span className='text-blue-700 font-bold'>Approved</span> : <span className='text-red-700 font-bold'>Under Review</span>}</td>
                                        <td><Link href={`/dashboard/careerDetails/${job?._id}`}>See Details</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> : <div>
                <h1 className='mt-8 my-4 px-10 font-semibold text-center'>Careers</h1>
                <h1 className='text-center my-8'>There is no careers</h1>
            </div>}
        </PrivateRoute>
    );
};

export default CareerTable;