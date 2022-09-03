import styled from 'styled-components'

type ContainerProps = {
    done: boolean
}

export const Container = styled.div(({ done }: ContainerProps) => (
    `
    display: flex;
    background-color:#20212c;
    padding:10px;
    border-radius:10px;
    margin-bottom:10px;
    align-items: center;

    input {
        width: 25px;
        height: 25px;
        margin-right: 5px;
    }

    .inputText {
        border: 0px;
        background: transparent;
        outline: 0;
        color: #FFF;
        font-size: 15px;
        flex: 1;
    }

    label {
        color: #ccc;
        cursor:pointer;
    }

    .checkbox{
        cursor:pointer;
    }

    .star {
        visibility:hidden;
        font-size:30px;
        cursor:pointer;
        align: right;
    }
    .star:before {
       content: "\u2606";
       visibility:visible;
    }
    .star:checked:before {
       content: "\u2605";
    }
    `
));