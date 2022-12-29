import React, {MouseEvent} from 'react';
import {ChildEntity, GiftEntity} from "types";
import {ChildGiftSelect} from "../ChildGiftSelect";
import '../../index.css'



interface Props {
    child: ChildEntity;
    giftsList: GiftEntity[];
    onGiftsChange: () => void;
}

export const ChildrenTableRow = (props: Props) => {

    const deleteChild = async (e: MouseEvent) => {
        e.preventDefault();
        if (!window.confirm(`Are you sure you want to remove ${props.child.name}?`)) {
            return;
        }
        const res = await fetch(`http://localhost:3001/child/${props.child.id}`, {
            method: 'DELETE',
        });
        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Error has occurred: ${error.message}`);
            return;
        }
        props.onGiftsChange();
    };

    return (
        <tr>
            <th>{props.child.name}</th>
            <td>
                <ChildGiftSelect
                giftsList={props.giftsList}
                selectedId={props.child.giftId}
                childId={props.child.id as string}
                />
            </td>
            <td>
                <a href="#" onClick={deleteChild}>🗑</a>
            </td>
        </tr>
    );
};

