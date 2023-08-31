async function fetchUserDiagnoseItem(email) {
    try {
        const response = await fetch(`/dbget/userDiagnoseItem?email=${email}`);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else if (response.status === 404) {
            console.error('No data found');
            return null;
        } else {
            console.error('Error fetching data');
            return null;
        }
    } catch (error) {
        console.error('Fetch failed:', error);
        return null;
    }
}

fetchUserDiagnoseItem('example@example.com')
    .then(data => {
        if (data) {
            console.log('Received data:', data);
        }
    });
