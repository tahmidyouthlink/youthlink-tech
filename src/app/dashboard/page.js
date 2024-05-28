import PrivateRoute from '@/utils/Provider/PrivateRoute';
import WorkOverview from '@/pages/WorkOverview/WorkOverview';
import BlogsOverview from '@/pages/BlogsOverview/BlogsOverview';
import CareersOverview from '@/pages/CareersOverview/CareersOverview';

const Dashboard = () => {

    return (
        <PrivateRoute>
            <WorkOverview />
            <BlogsOverview />
            <CareersOverview />
        </PrivateRoute>
    );
};

export default Dashboard;