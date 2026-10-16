import { requireRole } from '@/lib/core/session';

const AdminLayout = async ({ children }) => {
    await requireRole('trainer')
    return children;
};

export default AdminLayout;