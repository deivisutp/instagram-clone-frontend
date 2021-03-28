import React from 'react';

import { AuthProvider } from './auth';
import { UploadProvider } from './upload';
import { SearchProvider } from './search';
import { FollowProvider } from './follow';

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <UploadProvider>
                <SearchProvider>
                    <FollowProvider>
                        {children}
                    </FollowProvider>
                </SearchProvider>
            </UploadProvider>
        </AuthProvider>
    );
}

export default Providers;