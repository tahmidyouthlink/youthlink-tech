"use client";
import { SiPoly } from 'react-icons/si';
import { RiLoaderFill, RiVerifiedBadgeFill } from 'react-icons/ri';
import Loading from '@/components/shared/Loading/Loading';
import useWorks from '@/hooks/useWorks';
import useCheckedWork from '@/hooks/useCheckedWork';
import useReviewWork from '@/hooks/useReviewWork';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const WorkStat = () => {

    const [allWork, isWork] = useWorks();
    const [checkedWork, isCheckedWork] = useCheckedWork();
    const [reviewWork, isReviewWork] = useReviewWork();

    const allWorkLength = allWork?.length;
    const approvedLength = checkedWork?.length;
    const underReviewLength = reviewWork?.length;
    // const taskCompletedPercentage = (approvedLength / allWorkLength * 100).toFixed(2);

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    const data = [
        { name: 'Total Works', uv: allWorkLength, pv: 2400, amt: 2400 },
        { name: 'Approved', uv: approvedLength, pv: 1398, amt: 2210 },
        { name: 'Under Review', uv: underReviewLength, pv: 9800, amt: 2290 },
    ];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };


    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    if (isWork || isCheckedWork || isReviewWork) {
        return <Loading />
    }

    return (
        <div className='border rounded-lg px-6 mt-8 md:mt-12 xl:mt-16 max-w-screen-md mx-auto'>
            <div className='flex flex-col justify-center items-center md:flex-row gap-6 lg:gap-12 p-8'>
                <div className='space-y-2'>
                    <h1 className='text-xl'>Work Details</h1>
                    <div className='flex justify-start items-center gap-2 text-sm font-medium pt-4 pb-2'>
                        <SiPoly size={26} className="text-3xl text-blue-400  " />
                        <div className='flex flex-col justify-center items-start'>
                            <p>Total Works</p>
                            <h1>{allWorkLength}</h1>
                        </div>
                    </div>
                    <div className='flex justify-start items-center gap-2 text-sm font-medium pb-2'>
                        <RiVerifiedBadgeFill size={26} className="text-3xl text-orange-500" />
                        <div className='flex flex-col justify-center items-start'>
                            <p>Approved Works</p>
                            <h1>{approvedLength}</h1>
                        </div>
                    </div>
                    <div className='flex justify-start items-center gap-2 text-sm font-medium'>
                        <RiLoaderFill size={26} className="text-3xl text-green-500 0 6s animate-spin" />
                        <div className='flex flex-col justify-center items-start'>
                            <p>Under Review Works</p>
                            <h1>{underReviewLength}</h1>
                        </div>
                    </div>
                </div>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))}
                    </Bar>
                </BarChart>
            </div>
        </div>
    );
};

export default WorkStat;