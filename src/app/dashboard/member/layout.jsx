import { requireRole } from '@/lib/core/session';

const AdminLayout = async ({ children }) => {
    await requireRole('member')
    return children;
};

export default AdminLayout;