export const getCommonStores = async () => {
    const COFFEE_API_KEY = process.env.COFFEE_API_KEY;
    try {
        const searchParams = new URLSearchParams({
            query: 'coffee',
            ll: '41.8781,-87.6298',
            open_now: 'true',
            sort: 'DISTANCE',
        });

        const results = await fetch(
            `https://api.foursquare.com/v3/places/search?${searchParams}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: COFFEE_API_KEY,
                },
            },
        );

        const data = await results.json();

        if (data?.error) {
            console.error('API error', data.error);
            return [];
        }

        console.log({items: data.results});

        const itemsWithImages = await Promise.all(
            data.results.map((item) => {
                const imageUrl =
                    item.categories[0]?.icon?.prefix +
                    '32' +
                    item.categories[0]?.icon?.suffix;

                return {
                    imageUrl,
                    name: item.name,
                    id: item.fsq_id,
                };
            }),
        );

        console.log(itemsWithImages, 'itemsWithImages');
        return itemsWithImages;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};
