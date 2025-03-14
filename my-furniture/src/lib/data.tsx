export const ITEMS_PER_PAGE = 12;
export const domain = "http://localhost:3000"

export const itemsData = [
    {
        id: 1,
        itemName: "Cool lamp 1",
        price: 40,
        itemPicture: "/furniture1.webp",
        amountOfColors: 3,
    },
    {
        id: 2,
        name: "Cool lamp 2",
        price: 40,
        imgSrc: "/furniture2.png",
        amountOfColors: 4,
    },
    {
        id: 3,
        name: "Cool lamp 3",
        price: 40,
        imgSrc: "/furniture3.png",
        amountOfColors: 5,
    },
    {
        id: 4,
        name: "Cool lamp 4",
        price: 40,
        imgSrc: "/furniture4.png",
        amountOfColors: 6,
    },
    {
        id: 5,
        name: "Cool lamp 5",
        price: 40,
        imgSrc: "/furniture5.png",
        amountOfColors: 7,
    },
    {
        id: 6,
        name: "Cool lamp 6",
        price: 40,
        imgSrc: "/furniture6.png",
        amountOfColors: 4,
    }
]

export const reviews = [
    {
        username: "Bob",
        rating: 5,
        review: "The buying process was seamless, and the furniture arrived on time. The craftsmanship is excellent, and every piece feels sturdy and well-made. I especially love the finish on the dining table—it's both elegant and durable!"
    },
    {
        username: "Josh",
        rating: 5,
        review: "I'm so happy with my purchase! The sofa I ordered is not only stylish but incredibly comfortable. It complements my living room perfectly, and I've already received so many compliments on it. Definetely coming back!"
    },
    {
        username: "Alice",
        rating: 5,
        review: "Great experience overall! The customer service team was helpful in answering my questions, and the delivery was quick. The quality of the materials used in the bed frame is top-notch—I know it's built to last."
    }, {
        username: "Mike",
        rating: 5,
        review: "This is my second time buying from here, and once again, I'm impressed. The furniture is beautiful, and the attention to detail is evident. The chairs I got are both sturdy and lightweight, perfect for everyday use."
    },
]

export const sortingOptionsMaterials = [
    {
        value: "wood",
        label: "Wood",
    },
    {
        value: "metal",
        label: "Metal",
    },
    {
        value: "mixed",
        label: "Mixed",
    },
]

export const sortingOptionsType = [
    {
        value: "sofa",
        label: "Sofa",
    },
    {
        value: "chair",
        label: "Chair",
    },
    {
        value: "table",
        label: "Table",
    },
]

export const sortingOptionsColor = [
    {
        value: "black",
        label: "Black",
    },
    {
        value: "white",
        label: "White",
    },
    {
        value: "green",
        label: "Green",
    },
    {
        value: "brown",
        label: "Brown",
    },
]

export const sortingOptionsPrice = [
    {
        value: "0-70",
        label: "$0 - $70",
    },
    {
        value: "70-150",
        label: "$70 - $150",
    },
    {
        value: "150+",
        label: "> $150",
    },
]