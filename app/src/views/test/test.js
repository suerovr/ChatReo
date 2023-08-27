async function fetchChatsByEmail(email) {
    const url = `/getChatsByEmail?email=${email}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Failed to fetch chats: HTTP status ${response.status}`);
            return null;
        }

        const chats = await response.json();
        console.log("Fetched chats:", chats);
        return chats;
    } catch (error) {
        console.error("Error fetching chats:", error);
        return null;
    }
}

fetchChatsByEmail("0458testemail");
