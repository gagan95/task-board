export const strLimit = (str, limit) => {
    if (str === null) return;

    if (str.length > limit) {
        return str.substr(0, limit) + "...";
    } else {
        return str;
    }
};

export const getListsByBoardId = (boards, boardID) => {
    const board = boards[boardID];
    const lists = board.lists;
    return lists;
};