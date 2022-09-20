import React from "react";

const CardContext = React.createContext({
    items: [],
    totalAmout: 0,
    addItem: (item) => {},
    removeItem: (id) => {},


});

export default CardContext;