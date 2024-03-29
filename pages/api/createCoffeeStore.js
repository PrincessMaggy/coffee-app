import {
    table,
    getMinifiedRecords,
    findRecordByFilter,
} from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
    if (req.method === 'POST') {
        //find a record

        const {id, name, categories, location, imageUrl, locality, voting} =
            req.body;

        try {
            if (id) {
                const records = await findRecordByFilter(id);

                if (records.length !== 0) {
                    res.json(records);
                } else {
                    //create a record
                    if (name) {
                        const createRecords = await table.create([
                            {
                                fields: {
                                    id,
                                    name,
                                    location,
                                    categories,
                                    voting,
                                    locality,
                                    imageUrl,
                                },
                            },
                        ]);

                        const records = getMinifiedRecords(createRecords);
                        res.json(records);
                        console.log('creating store was a success');
                    } else {
                        res.status(400);
                        res.json({message: 'Id or name is missing'});
                    }
                }
            } else {
                res.status(400);
                res.json({message: 'Id is missing'});
            }
        } catch (err) {
            console.error('Error creating or finding a store', err);
            res.status(500);
            res.json({message: 'Error creating or finding a store', err});
        }
    }
};

export default createCoffeeStore;
