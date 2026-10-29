import { Reply } from 'lucide-react';
import React from 'react';

const PublicCommentAction = () => {
    return (
        <div>
            <button
                type="button"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-purple-700 transition-colors hover:text-purple-900"
            >
                <Reply size={15} />
                Reply
            </button>
        </div>
    );
};

export default PublicCommentAction;