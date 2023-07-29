export const getCommonStores = async (latLong = '41.8781,-87.6298') => {
    const COFFEE_API_KEY = process.env.NEXT_PUBLIC_COFFEE_API_KEY;
    try {
        const searchParams = new URLSearchParams({
            query: 'coffee',
            // ll: '41.8781,-87.6298',
            ll: latLong,
            // open_now: 'true',
            sort: 'DISTANCE',
            limit: 10,
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

        // console.log({items: data.results});

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
                    location: item.location.formatted_address,
                    locality: item.location.locality,
                    categories: item.categories
                        .map((item) => item.name)
                        .join(', '),
                };
            }),
        );

        // console.log(itemsWithImages, 'itemsWithImages');
        return itemsWithImages;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};
