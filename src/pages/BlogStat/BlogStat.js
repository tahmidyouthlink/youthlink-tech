'use client';
import ApexCharts from 'apexcharts';
import { useEffect } from 'react';
import { SiPoly } from 'react-icons/si';
import { RiLoaderFill, RiVerifiedBadgeFill } from 'react-icons/ri';
import Loading from '@/components/shared/Loading/Loading';
import useBlogs from '@/hooks/useBlogs';
import useCheckedBlog from '@/hooks/useCheckedBlog';
import useReviewBlog from '@/hooks/useReviewBlog';

const BlogStat = () => {

    const [allBlog, isBlog] = useBlogs();
    const [checkedBlog, isCheckedBlog] = useCheckedBlog();
    const [reviewBlog, isReviewBlog] = useReviewBlog();

    const allBlogLength = allBlog?.length || 0;
    const approvedLength = checkedBlog?.length || 0;
    const underReviewLength = reviewBlog?.length || 0;
    const taskCompletedPercentage = allBlogLength ? ((approvedLength / allBlogLength) * 100).toFixed(2) : 0;

    useEffect(() => {
        if (allBlog && checkedBlog && reviewBlog) {
            const options = {
                series: [taskCompletedPercentage],
                chart: {
                    height: 350,
                    type: 'radialBar',
                    offsetY: -10
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -135,
                        endAngle: 135,
                        dataLabels: {
                            name: {
                                fontSize: '16px',
                                color: undefined,
                                offsetY: 120
                            },
                            value: {
                                offsetY: 76,
                                fontSize: '22px',
                                color: "#000",
                                formatter: function (val) {
                                    return val + "%";
                                }
                            }
                        }
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        shadeIntensity: 0.15,
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 50, 65, 91]
                    },
                },
                stroke: {
                    dashArray: 4
                },
                labels: ['Approved Work'],
            };

            const chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();

            // Cleanup function
            return () => {
                chart.destroy();
            };
        }
    }, [allBlog, checkedBlog, reviewBlog, taskCompletedPercentage]);

    if (isBlog || isCheckedBlog || isReviewBlog) {
        return <Loading />;
    }

    return (
        <div className='border rounded-lg px-6 mt-8 md:mt-12 xl:mt-16 max-w-screen-md mx-auto'>
            <div className='flex flex-col justify-center items-center md:flex-row gap-6 lg:gap-12 p-8'>
                <div className='space-y-2'>
                    <h1 className='text-xl'>Blog Details</h1>
                    <div className='flex justify-start items-center gap-2 text-sm font-medium pt-4 pb-2'>
                        <SiPoly size={26} className="text-3xl text-blue-400" />
                        <div className='flex flex-col justify-center items-start'>
                            <p>Total Blogs</p>
                            <h1>{allBlogLength}</h1>
                        </div>
                    </div>
                    <div className='flex justify-start items-center gap-2 text-sm font-medium pb-2'>
                        <RiVerifiedBadgeFill size={26} className="text-3xl text-orange-500" />
                        <div className='flex flex-col justify-center items-start'>
                            <p>Approved Blogs</p>
                            <h1>{approvedLength}</h1>
                        </div>
                    </div>
                    <div className='flex justify-start items-center gap-2 text-sm font-medium'>
                        <RiLoaderFill size={26} className="text-3xl text-green-500 animate-spin" />
                        <div className='flex flex-col justify-center items-start'>
                            <p>Under Review Blogs</p>
                            <h1>{underReviewLength}</h1>
                        </div>
                    </div>
                </div>
                <div id="chart"></div>
            </div>
        </div>
    );
};

export default BlogStat;