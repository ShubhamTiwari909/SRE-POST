'use client';

import * as React from 'react';
import { useEdgeStore } from '../../lib/edgestore';
import { statesStore } from '../../store/states';

export default function Page() {
    const [file, setFile] = React.useState<File>();
    const { edgestore } = useEdgeStore();
    const post = statesStore(state => state.post)
    const setPost = statesStore(state => state.updatePost)
    const setProgress = statesStore(state => state.updateProgress)

    return (
        <div>
            <input
                type="file"
                onChange={(e) => {
                    setFile(e.target.files?.[0]);
                }}
            />
            <button
                onClick={async () => {
                    if (file) {
                        const res = await edgestore.publicFiles.upload({
                            file,
                            onProgressChange: (progress) => {
                                // you can use this to show a progress bar
                                setProgress(progress)
                            },
                        });
                        // you can run some server action or api here
                        // to add the necessary data to your database
                        setPost({...post,imageUrl:res.url})
                    }
                }}
            >
                Upload
            </button>
        </div>
    );
}