import React from "react";
import {GiftsList} from "../components/Gifts/GiftsList";
import {AddGift} from "../components/AddGift/AddGift";

// widok ekranu podgladu prezentow

export const GiftsView = () => (
    <>
        <GiftsList/>
        <AddGift/>
    </>
);

