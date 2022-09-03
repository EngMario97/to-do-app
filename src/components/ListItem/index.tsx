import * as C from "./styles";
import { Item } from '../../types/item';
import { useEffect, useRef, useState } from "react";

type Props = {
    item: Item
    onChange: (id: string, description: string, completed: boolean, favorited: boolean) => void
}

export const ListItem = ({ item, onChange }: Props) => {

    const [isMounted, setMounted] = useState(false);

    const [inputId] = useState(item._id);
    const [inputDescription, setDescription] = useState(item.description);
    const [inputCompleted, setCompleted] = useState(item.completed);
    const [inputFavorited, setFavorited] = useState(item.favorited);

    const [inputDescriptionMiddle, setDescriptionMiddle] = useState(item.description);

    const handleKeyUp = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            setDescription(inputDescriptionMiddle)
        }
    }

    function refreshPage() {
        window.location.reload();
    }

    useEffect(() => {
        if (isMounted) {
            onChange(inputId, inputDescription, inputCompleted, inputFavorited);
        } else {
            setMounted(true);
        }

    }, [inputCompleted, inputDescription, inputFavorited]);

    return (
        <C.Container done={inputCompleted}>
            <input
                className="checkbox"
                type="checkbox"
                checked={inputCompleted}
                onChange={e => setCompleted(e.target.checked)}
                onClick={refreshPage}
            />
            <input
                className="inputText"
                type="text"
                value={inputDescriptionMiddle}
                onChange={e => setDescriptionMiddle(e.target.value)}
                onKeyUp={handleKeyUp}
            />
            <input
                className="star"
                type="checkbox"
                checked={inputFavorited}
                onChange={e => setFavorited(e.target.checked)}
            />

        </C.Container>
    );
}


