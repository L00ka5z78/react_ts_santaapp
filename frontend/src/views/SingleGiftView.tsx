import React, {useEffect, useState} from "react";
import {GetSingleGiftRes} from "types";
import {Link, useParams} from "react-router-dom";

export const SingleGiftView = () => {
    const [giftInfo, setGiftInfo] = useState<GetSingleGiftRes | null>(null);
    const {idOfGift} = useParams()

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/gift/${idOfGift}`);
            setGiftInfo(await res.json());
        })();
    }, [])

    if (giftInfo === null) {
        return null;
    }
    return <>
        <h1>{giftInfo.gift.name}</h1>
        <p>Gift's ID is: <strong>{giftInfo.gift.id}</strong>. There is <strong>{giftInfo.gift.count}</strong> pieces of
            this item and <strong>{giftInfo.givenCount} already given.</strong></p>
        <p>
            <Link to="/gift">Go back to list page</Link>
        </p>
    </>
}