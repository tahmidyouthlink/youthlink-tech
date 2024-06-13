import Loading from '@/components/shared/Loading/Loading';
import Image from 'next/image';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import useWorks from '@/hooks/useWorks';
import Link from 'next/link';

const WorkTable = () => {
  const [allWork, isWork] = useWorks();

  if (isWork) {
    return <Loading />;
  }

  return (
    <PrivateRoute>
      {allWork?.length > 0 ? <div>
        <h1 className='mt-8 my-4 px-10 text-3xl font-semibold'>Our Works</h1>
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="overflow-x-auto max-h-[70vh] mt-6">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Thumbnail / Title</th>
                  <th>Category</th>
                  <th>Keywords</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {allWork?.map((work, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image src={work?.imageURL} alt='image' height={100} width={200} />
                          </div>
                        </div>
                        <div className="font-bold">{work?.title}</div>
                      </div>
                    </td>
                    <td>
                      {work?.category?.map((cat, index) => <p key={index} className={`text-neutral-400`}>{cat?.value}</p>)}
                    </td>
                    <td>{work?.keyword?.map((skill, index) => <p key={index} className={`text-neutral-400`}>{skill?.value}</p>)}</td>
                    <td>{work?.status === "checked" ? <span className='text-blue-700 font-bold'>Approved</span> : <span className='text-red-700 font-bold'>Under Review</span>}</td>
                    <td><Link href={`/dashboard/workDetails/${work?._id}`}>See Details</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> : <div>
        <h1 className='mt-8 my-4 px-10 font-semibold'>Our Work</h1>
        <h1 className='text-center my-8'>There is no works</h1>
      </div>}
    </PrivateRoute>
  );
};

export default WorkTable;