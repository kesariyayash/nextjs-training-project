import { Suspense } from 'react';
import Loader from '@/components/loader';

export default function DashboardLayout({ children }) {
    return (
        <Suspense fallback={<Loader />}>
            {children}
        </Suspense>
    );
}