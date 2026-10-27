import { Button, Label, TextArea, TextField } from '@heroui/react';

const CommentForum = ({ forumId }) => {
    return (
        <div>
            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                <h2 className="mb-5 text-xl font-semibold text-gray-900">
                    Join the Discussion
                </h2>

                <TextField name="Comment" className="w-full">
                    <Label className="mb-2 text-sm font-medium text-gray-700">
                        Your Comment
                    </Label>

                    <TextArea
                        placeholder="Write a comment and join the discussion..."
                        variant="secondary"
                        className="min-h-32 w-full"
                    />
                </TextField>

                <div className="mt-4 flex justify-end">
                    <Button className="bg-purple-600 px-6 text-white hover:bg-purple-700">
                        Post Comment
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CommentForum;