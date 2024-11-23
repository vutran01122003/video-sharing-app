export const replaceSpecificElement = ({ list, element }) => {
    const newList = [...list];

    for (let i = 0; i < newList.length; i++) {
        if (newList[i]._id === element._id) {
            newList[i] = element;
            break;
        }
    }

    return newList;
};
