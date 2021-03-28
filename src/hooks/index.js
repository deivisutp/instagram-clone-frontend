import React from 'react';

import { AuthProvider } from './auth';
import { UploadProvider } from './upload';
import { SearchProvider } from './search';

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <UploadProvider>
                <SearchProvider>
                    {children}
                </SearchProvider>
            </UploadProvider>
        </AuthProvider>
    );
}

export default Providers;