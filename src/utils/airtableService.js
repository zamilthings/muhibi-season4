const airtableApiUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}`;
const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

export const fetchRecords = async (tableName, filterParams, sortField, sortDirection, maxRecords) => {
    try {
        const url = new URL(`${airtableApiUrl}/${tableName}`);
        
        url.searchParams.append('filterByFormula', filterParams);
        url.searchParams.append('sort[0][field]', sortField);
        url.searchParams.append('sort[0][direction]', sortDirection);
        url.searchParams.append('maxRecords', maxRecords);

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching records: ${response.statusText}`);
        }

        const data = await response.json();
        return data.records;

    } catch (error) {
        console.error("Error fetching records:", error);
        throw error;
    }
};
