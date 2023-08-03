import {getCommonStores} from '../../lib/stores';

const getCoffeeStoresByLocation = async (req, res) => {
    try {
        const {latLong} = req.query;
        const response = await getCommonStores(latLong);
        res.status(200);
        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({message: 'Something went wrong', err});
    }
    return res;
};

export default getCoffeeStoresByLocation;
