
async function uploadImage() {
    const formData = new FormData(document.getElementById('upload-form'));

    try {
        const response = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 200) {
            alert('Upload successful!');
        } else {
            alert('Error uploading image: ' + response.data.message);
        }
    } catch (error) {
        alert('Failed to submit. Please try again.');
        console.error(error);
    }
}