'use client';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from '@components/Form';

const EditPrompt = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/prompt/${promptId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch prompt details');
                }
                const data = await response.json();
                setPost({
                    prompt: data.prompt,
                    tag: data.tag,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (promptId) {
            getPromptDetails();
        }
    }, [promptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert('Prompt ID not found');

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                router.push('/profile');
            } else {
                throw new Error('Failed to update prompt');
            }
        } catch (error) {
            console.log(error);
            alert('Failed to update prompt');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
};

export default EditPrompt;
