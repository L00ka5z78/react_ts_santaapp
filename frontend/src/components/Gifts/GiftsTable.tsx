import React from 'react';
import {GiftsTableRow} from "./GiftTableRow";
import {GiftEntity} from 'types'
// import '../../index.css'

interface Props {
    gifts: GiftEntity[];
    onGiftsChange: () => void;
}

export const GiftsTable = (props: Props) => (
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Count</th>
            <th>Action</th>
            <th>Description</th>

        </tr>
        </thead>
        <tbody>
        {
            props.gifts.map(gift => (
                <GiftsTableRow gift={gift}
                key={gift.id}
                onGiftsChange={props.onGiftsChange}
                />
            ))
        }
        </tbody>
    </table>
);

