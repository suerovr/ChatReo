async function uploadImage() {
    const formData = new FormData(document.getElementById('upload-form'));

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const responseData = await response.json();
        
        if (response.status === 200) {
            alert('Upload successful!');
        } else {
            alert('Error uploading image: ' + responseData.message);
        }
    } catch (error) {
        alert('Failed to submit. Please try again.');
        console.error(error);
    }
}
