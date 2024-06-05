'use client';
import Loading from '@/components/shared/Loading/Loading';
import useBlogs from '@/hooks/useBlogs';
import useCheckedBlog from '@/hooks/useCheckedBlog';
import useReviewBlog from '@/hooks/useReviewBlog';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const BlogStat = () => {

    const [allBlog, isBlog] = useBlogs();
    const [checkedBlog, isCheckedBlog] = useCheckedBlog();
    const [reviewBlog, isReviewBlog] = useReviewBlog();

    const allBlogLength = allBlog?.length || 0;
    const approvedLength = checkedBlog?.length || 0;
    const underReviewLength = reviewBlog?.length || 0;
    // const taskCompletedPercentage = allBlogLength ? ((approvedLength / allBlogLength) * 100).toFixed(2) : 0;

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    const data = [
        { name: 'Total Blogs', uv: allBlogLength, pv: 2400, amt: 2400 },
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

    if (isBlog || isCheckedBlog || isReviewBlog) {
        return <Loading />;
    }

    return (
        <div className='flex justify-center items-center mt-20'>
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
    );
};

export default BlogStat;
