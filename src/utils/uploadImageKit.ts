import axios from 'axios';

/**
 * Uploads a file to ImageKit by first fetching auth parameters from the backend
 * and then sending the file directly to ImageKit's API.
 * @param file The file object to upload
 * @returns The URL of the uploaded file or null if failed
 */
export const uploadToImageKit = async (file: File): Promise<string | null> => {
    try {
        // 1. Get auth params from my backend
        // Note: Ensure your backend generic route /auth-imagekit is accessible
        const authRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth-imagekit`, {
            withCredentials: true
        });

        if (!authRes.data || !authRes.data.token) {
            throw new Error("Failed to retrieve ImageKit authentication parameters.");
        }

        const { token, expire, signature, publicKey } = authRes.data;

        // 2. Construct FormData for ImageKit
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('publicKey', publicKey);
        formData.append('signature', signature);
        formData.append('expire', expire);
        formData.append('token', token);
        formData.append('useUniqueFileName', 'true');
        formData.append('folder', '/employee_documents'); // Organize in a folder

        // 3. Send to ImageKit
        const uploadRes = await axios.post('https://upload.imagekit.io/api/v1/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (uploadRes.data && uploadRes.data.url) {
            return uploadRes.data.url;
        }

        return null;
    } catch (error) {
        console.error("ImageKit Upload Error:", error);
        return null;
    }
}
